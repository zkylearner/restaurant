const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const http = require('http')
const io = require('socket.io')

const app = express()
const server = http.createServer(app)
const ioServer = io(server)
global.ioServer = ioServer

const port = 8080
const userAccountMiddleware = require('./user-account')
const restaurantAPIMiddleware = require('./restaurant')

// cookie 签名
// app.use(session({secret:'secret'}))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(cookieParser('my secret')) //cookie设置

app.use((req, res, next) => {
  // console.log(req.cookies, req.signedCookies)
  // console.log(req.url, req.signedCookies)
  next()
})

app.use(express.static(__dirname + '/static/'))//处理静态文件请求的中间件
app.use('/upload', express.static(__dirname + '/upload/'))//处理静态文件请求的中间件

app.use(express.urlencoded({extended: true}))//用来解析扩展url编码的请求体
app.use(express.json())//用来解析json请求体

//配置跨域设置
app.use(cors({
  origin: true,
  maxAge: 86400,
  credentials: true,
}))
// app.use(cors())

app.use('', userAccountMiddleware)
app.use('', restaurantAPIMiddleware)

server.listen(port, () => {
  console.log('正在监听端口：' + port)
})