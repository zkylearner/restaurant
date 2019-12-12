import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import api from './api'
import history from './history'
import { Button, Input } from 'antd'

export default withRouter(function AddFood(props){
  let rid = props.match.params.rid

  let [deskData, setDeskData] = useState({
    rid,
    name: '',
    capacity: 0,
  })

  function change(e) {
    setDeskData({
      ...deskData,
      [e.target.name]: e.target.value
    })
  }

  function submit(e) {
    var dd = {}
    for(var key in deskData) {
      var val = deskData[key]
      if(val)dd[key] = val
    }

    api.post(`/restaurant/${rid}/desk`, dd)
      .then(res => {
        history.goBack()
      }).catch(e=> console.log(e))
  }

  return(
    <div className='addFoodCard'>
      <h3>添加桌面</h3>
      <ul>
        <li>桌面名称：<Input type='text' onChange={change} name="name" /></li>
        <li>容纳人数：<Input type='number' onChange={change} name="capacity" /></li>
      </ul>
      <Button onClick={() => {history.goBack()}}>返回</Button>
      <Button onClick={submit}>提交</Button>
    </div>
  )
})
