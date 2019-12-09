const express = require('express')

let db
const dbPromise = require('./db')
dbPromise.then(dbObject => {
  db = dbObject
})
let port = 8080

const app = express.Router()

app.get('/userinfo', async (req, res, next) => {
  // console.log(req.cookies)
  let id = req.cookies.id
  let user = await db.get(`select title from users where id=?`, id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      code: -1,
      msg: '餐厅信息请求错误'
    })
  }
})

// 初始页面
app.get("/", (req, res, next) => {
  // 已签名的cookies
  // console.log(req.signedCookies)

  if (req.signedCookies.id) {
    res.send(`
        <div>
            <span>${req.signedCookies.id}</span>
            <a href="/create.html">添加菜品</a>
            查看菜单
            <a href="/logout">登出</a>
        </div>
        `)
  } else {
    res.send(`
        <div>
            <a href="/register">注册</a>
            <a href="/login">登陆</a>
        </div>
        `)
  }
})

// 登陆页面
app.route('/login')
  .post(async (req, res, next) => {
    // console.log(req.body)
    let userInfo = req.body
    let user = await db.get("select id from users where name=? and password=?", userInfo.name, userInfo.password)

    if (user) {
      // 需要添加cookies
      // res.cookie('id', user.id, {
      //   signed: true
      // })
      res.cookie('id', user.id)
      
      res.json(user)
    } else {
      res.status(403).json({
        code: 403,
        msg: "用户名或密码错误",
      })
    }
  })

// 注册页面
app.route('/register')
  .get((req, res, next) => {
    res.send(`
    <form action = "/register" method = "post">
    用户名:<input type="text" name="name"/>
    邮箱:<input type="text" name="email"/>
    密码:<input type="password" name="password"/>
    餐馆名称:<input type="text" name="title"/>
    <button>注册</button>
    </from>
    `)
  })
  .post(async (req, res, next) => {
    // console.log(req.body)
    let userInfo = req.body
    let userName = await db.get("select * from users where name=?", userInfo.name)
    let userEmail = await db.get("select * from users where email=?", userInfo.email)
    if (userName) {
      res.send("用户名已使用")
    } else if (userEmail) {
      res.send("邮箱已使用")
    } else {
      db.run('insert into users (name, email, password, title) values(?,?,?,?);', userInfo.name, userInfo.email, userInfo.password, userInfo.title)
      // res.send(`注册成功<br><a href = "\\">返回登陆页面</a>`)
      res.json({msg:'注册成功', code: 200})
    }
  })

let changePasswordTokenMap = {}

// 忘记密码
app.route("/forget")
  .get((req, res, next) => {
    res.end(`
    <form action="/forget" method="post">
        请输入您的邮箱：<input type="text" name="email">
        <button>确认</button>
    </form>
    `)
  })
  .post(async (req, res, next) => {
    let email = req.body.email
    let userEmail = await db.get("select * from users where email=?", email)

    if (userEmail) {
      let token = Math.random().toString().slice(2)
      changePasswordTokenMap[token] = email

      // 20分钟后删除
      setTimeout(() => {
        delete changePasswordTokenMap[token]
      }, 20 * 60 * 1000);

      // let link = `http://localhost:${port}/change-password/${token}`
      let link = `http://zkylearner.top:${port}/change-password/${token}`
      res.end(`<a href = ${link}>修改密码链接</a>`)
      //发送链接
    } else {
      res.end('请求的邮箱错误')
    }
  })

// 修改密码页面
app.route('/change-password/:token')
  .get((req, res, next) => {
    let token = req.params.token
    let email = changePasswordTokenMap[token]

    res.set('Content-Type', 'text/html; charset=UTF-8')
    if (email) {
      res.end(`
        <form action="http://localhost:${port}/change-password/${token}" method="post">
        请输入新密码：<input type="password" name="password">
        <button>确认提交</button>
        </form>
        `)
    } else {
      res.end('此链接已过期，请重新请求')
    }
  })
  .post(async (req, res, next) => {
    let token = req.params.token
    let email = changePasswordTokenMap[token]
    let password = req.body.password
    let userEmail = await db.get("select * from users where email=?", email)
    res.set('Content-Type', 'text/html; charset=UTF-8')
    
    if (email && userEmail) {
      await db.run('update users set password=? where email=?', password, email)
      res.end(`密码修改成功<br><a href = "\\">返回登陆页面</a>`)
    } else {
      res.end('此链接已过期，请重新请求')
    }
  })

// 登出页面 清除cookie 跳转到初始页面
app.get('/logout', (req, res, next) => {
  res.clearCookie('id')
  res.json({
    code: 0,
    msg: '登出成功'
  })
})

module.exports = app