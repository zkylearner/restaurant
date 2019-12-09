import React,{useState, useRef} from 'react'
import { Button, Input } from 'antd'
import api from './api'
import history from './history'

export default function(){
  let [email, setEmail] = useState({})
  const ref = useRef()

  function submit(){
    // console.log(email)
    api.post('/forget', email)
      .then(res => {
        // console.log(res)
        ref.current.innerHTML = res.data
      })
  }

  return (
    <div className='forgetPage'>
      <h3>邮箱验证</h3>
      <Input
        type="text" name="email"
        placeholder='请输入您的邮箱' 
        onChange={(e) => setEmail({email: e.target.value})}
      />
      <Button onClick={submit} >确认</Button>
      <Button onClick={() => {history.push('/')}} >返回</Button>
      <p ref={ref}></p>
    </div>
  )
}