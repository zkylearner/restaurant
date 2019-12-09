import React,{useState} from 'react'
import { Input, Button } from 'antd'
import history from './history'
import api from './api'

export default function(){
  let [data, setData] = useState({

  })

  function back(){
    history.push('/')
  }

  function register(){
    console.log(data)
    api.post('/register', data)
      .then(res => {
        history.push('/')
      })
  }

  function change(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='register'>
      <h1>管理员注册</h1>
      <form action = "/register" method = "post">
        <Input type="text" placeholder='用户名' name="name" value={data.name} onChange={change} />
        <Input type="text" placeholder='邮箱' name="email" value={data.email} onChange={change} />
        <Input type="password" placeholder='密码' name="password" value={data.password} onChange={change} />
        <Input type="text" placeholder='餐馆名称' name="title" value={data.title} onChange={change} />
        <Button onClick={register} >注册</Button><Button onClick={back}>返回主页</Button>
      </form>
    </div>
  )
}