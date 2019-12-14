const express = require('express')
const multer = require('multer')
const path = require('path')

// websocket
var deskCartMap = new Map()
ioServer.on('connection', socket => {
  // console.log(socket.request.url)
  // console.log(socket.handshake.url)

  socket.on('join restaurant', restaurant => {
    socket.join(restaurant)
  })

  socket.on('join desk', desk => {
    // console.log('join desk', desk)
    socket.join(desk)

    var cartFood = deskCartMap.get(desk)
    if (!cartFood) {
      deskCartMap.set(desk, [])
    }

    socket.emit('cart food', cartFood || [])
  })

  socket.on('new food', info => {
    var foodAry = deskCartMap.get(info.desk)
    var idx = foodAry.findIndex(it => it.food.id === info.food.id)

    if (idx >= 0) {
      if (info.amount === 0) {
        foodAry.splice(idx, 1)
      } else {
        foodAry[idx].amount = info.amount
      }
    } else {
      foodAry.push({
        food: info.food,
        amount: info.amount,
      })
    }

    ioServer.in(info.desk).emit('new food', info)
  })

  socket.on('clear cart', info => {
    deskCartMap.set(info.desk, [])
    ioServer.in(info.desk).emit('clear cart')
  })
})


let db
(async function(){
  db = await require('./db')
}())

// 上传图片相关设置
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    let name = file.originalname.split('.')[0] + Date.now()
    cb(null, name + path.extname(file.originalname))
  }
})
const uploader = multer({storage: storage})

const app = express.Router()
// 获取桌面信息 landing展示
// /deskinfo/1
app.get('/deskinfo/:did', async (req, res, next) =>{
  let {did} = req.params
  var desk = await db.get(`
    SELECT 
      desks.id as did,
      users.id as uid,
      desks.name,
      users.title
    FROM desks JOIN users ON desks.rid = users.id
    WHERE desks.id=?
  `, did)

  res.json(desk)
})

//用户下单
app.post('/restaurant/:rid/desk/:did/order', async(req, res, next) =>{
  let {rid, did} = req.params
  let {deskName, totalPrice, customCount} = req.body 
  let details = JSON.stringify(req.body.foods)

  let status = 'pending'// confirmed/completed
  let timestamp = new Date().toISOString()

  await db.run(`
    INSERT INTO orders (rid, did, deskName, totalPrice, customCount, details, status, timestamp)
      VALUES (?,?,?,?,?,?,?,?)
  `, rid, did, deskName, totalPrice, customCount, details, status, timestamp)

  let order = await db.get('SELECT * FROM orders ORDER BY id DESC LIMIT 1')
  order.details = JSON.parse(order.details)
  res.json(order)

  var desk = 'desk:' + did
  deskCartMap.set(desk, [])
  ioServer.emit('new order', order)
  ioServer.in(desk).emit('placeorder success', order)
})

//订单管理
app.route('/restaurant/:rid/order')
  .get(async (req, res, next) => {
    var orders = await db.all('SELECT * FROM orders WHERE rid = ?', req.cookies.id)
    orders.forEach(order => {
      order.details = JSON.parse(order.details)
    })
    res.json(orders)
  })

app.route('/restaurant/:rid/order/:oid')
  .get(async (req, res, next) => {
    let {rid, oid} = req.params
    var order = await db.all('SELECT * FROM orders WHERE rid = ? and id=?', req.cookies.id, oid)
    res.json(order)
  })
  .delete(async (req, res, next) => {
    let {rid, oid} = req.params
    let order = await db.get(`select * from orders where rid=? and id=?`, rid, oid)
    if(order){
      await db.run(`delete from orders where rid=? and id=?`, rid, oid)
      res.end()
    }else{
      res.status(401).json({
        code:-1,
        msg:'订单不存在或订单删除失败'
      })
    }
  })

// 更改订单状态
// PUT {status: 'pending/confirmed/completed'}
app.route('/restaurant/:rid/order/:oid/status')
.put(async (req, res, next) => {
  await db.run(`
    UPDATE orders SET status = ?
      WHERE id = ? AND rid = ?
  `, req.body.status, req.params.oid, req.cookies.id)

  res.json(await db.get(`SELECT * FROM orders WHERE id = ?`, req.params.oid))
})

//菜品管理
app.route("/restaurant/:rid/food")
// 获取所有菜品信息用于展示
.get(async (req, res, next) =>{
  let menu = await db.all(`
  select * from foods where rid=?
  `, req.params.rid)

  res.json(menu)
})
// 增加一个菜品
.post(uploader.single('img'), async (req, res, next) =>{
  await db.run(`
    INSERT INTO foods
     (rid, name, price, img, status, desc, category)
    VALUES (?,?,?,?,?,?,?)
  `,
  req.cookies.id,
  req.body.name,
  req.body.price,
  req.file ? req.file.filename : req.body.img,
  req.body.status,
  req.body.desc,
  req.body.category)

  let food = await db.get('SELECT * FROM foods ORDER BY id DESC LIMIT 1')
  res.json(food)
})

app.route("/restaurant/:rid/food/:fid")
.delete(async (req, res, next) =>{
  let {rid, fid} = req.params
  let food = await db.get(`select * from foods where rid=? and id=?`, rid, fid)
  if(food){
    await db.run(`DELETE FROM foods WHERE rid=? and id=?;`, rid, fid)
    res.json(food)
  }else{
    res.status(401).json({
      code:-1,
      msg:'菜品不存在或菜品删除失败'
    })
  }
})
.put(uploader.single('img'), async (req, res, next) =>{
  // console.log(req.body, req.file)
  let {rid, fid} = req.params
  let food = await db.get(`select * from foods where rid=? and id=?`, rid, fid)
  if(food){
    await db.run(
      `update foods set name=?, price=?, img=?, status=?, desc=?, category=? where rid=? and id=?`, 
      req.body.name, 
      req.body.price, 
      req.body.img ? req.body.img : req.file.filename, 
      req.body.status, 
      req.body.desc, 
      req.body.category, 
      rid, 
      fid
    )
    food = await db.get(`select * from foods where rid=? and id=?`, rid, fid)
    res.json(food)
  }else{
    res.status(401).json({
      code:-1,
      msg:'菜品不存在或菜品更新失败'
    })
  }
})

// 桌面管理
app.route("/restaurant/:rid/desk")
.get(async (req, res, next) =>{
  var info = await db.all(`
  select * from desks where rid=?
  `, req.params.rid)

  res.json(info)
})
// 增加一个桌面
.post(async (req, res, next) =>{
  await db.run(`
    INSERT INTO desks
     (rid, name, capacity)
    VALUES (?,?,?)
  `, req.cookies.id, req.body.name, req.body.capacity)

  let desk = await db.get('SELECT * FROM foods ORDER BY id DESC LIMIT 1')
  res.json(desk)
})

app.route("/restaurant/:rid/desk/:did")
.delete(async (req, res, next) =>{
  let {rid, did} = req.params
  let desk = await db.get(`select * from desks where rid=? and id=?`, rid, did)
  if(desk){
    await db.run(`DELETE FROM desks WHERE rid=? and id=?;`, rid, did)
    res.json(desk)
  }else{
    res.status(401).json({
      code:-1,
      msg:'桌面不存在或桌面删除失败'
    })
  }
})
.put(async (req, res, next) =>{
  let {rid, did} = req.params
  let desk = await db.get(`select * from desks where rid=? and id=?`, rid, did)

  if(desk){
    await db.run(
      `update desks set name=?, capacity=? where rid=? and id=?`, 
      req.body.name, req.body.capacity, rid, did
    )
    
    desk = await db.get(`select * from desks where rid=? and id=?`, rid, did)
    res.json(desk)
  }else{
    res.status(401).json({
      code:-1,
      msg:'桌面不存在或桌面更新失败'
    })
  }
})

module.exports = app