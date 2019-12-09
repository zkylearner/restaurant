import React,{useState} from 'react';
import { Button, Input } from 'antd';
import api from './api'
import {withRouter, Link} from 'react-router-dom'

export default withRouter(function(props){
  let [name,setName] = useState()
  let [password,setPassword] = useState()

  async function login(e){
    try{
      let res = await api.post('/login', {name, password})
      props.history.push(`/restaurant/${res.data.id}/manage/order`)
    }catch(e){
      console.dir(e)
      alert(e.response.data.msg)
    }
  }

  return (
    <div className='login'>
      <h2>餐厅后台管理</h2>
      <Input name='name' placeholder='用户名' onChange={(e) => setName(e.target.value)}/>
      <Input.Password name='password' placeholder='密码' onChange={(e) => setPassword(e.target.value)} />
      <Button type="primary" onClick={(e)=>login(e)}>登陆</Button>
      <Link to='/forget' className='forgetLink' >忘记密码</Link>
      <Link to='/register' className='registerLink' >注册</Link>
    </div>
  )
})