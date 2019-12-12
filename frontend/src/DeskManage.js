import React, { Component, useState } from 'react'
import api from './api'
import { Link } from 'react-router-dom'
import { Button, Input, Card } from 'antd'
import { produce } from 'immer'
const QRCode = require('qrcode')

// 传入文本，img，转换后的base64直接设置在img标签上
function getQR(text, img){
  QRCode.toDataURL(text, function (err, url) {
    // console.log(text, url)
    img.src = url
  })
}

var deskItemStyle = {
  border: '2px #e8e8e8 solid',
  width: '280px',
  padding: '5px',
  margin:'10px 5px'
}

function DeskItem({desk, onDelete}) {

  let [change, setChange] = useState(false)
  let [deskInfo, setDeskInfo] = useState(desk)
  let [value, setValue] = useState({...desk})

  function deleteDesk() {
    api.delete(`/restaurant/${deskInfo.rid}/desk/${deskInfo.id}`).then(() => {
      onDelete(deskInfo)
    }).catch(e => console.log(e))
  }

  function update(e) {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  function submit(){
    api.put(`/restaurant/${deskInfo.rid}/desk/${deskInfo.id}`, value)
      .then(res=> {
        setChange(false)
        setDeskInfo(res.data)
      })
      .catch(e => console.log(e))
  }

  function getContent(){

    function showQRbox(){
      getQR(`${window.frontURL}#/landing/r/${deskInfo.rid}/d/${deskInfo.id}`, document.querySelector('#QRcode'))
      document.querySelector('.QRcodeBox').classList.remove('hidden')
    }

    if(change){
      return (
        <div style={deskItemStyle}>
          <ul>
            <li>桌面名称：<Input type='text' name='name' value={value.name} onChange={update}/> </li>
            <li>容纳人数：<Input type='number' name='capacity' value={value.capacity} onChange={update} /> </li>
          </ul>
          <Button onClick={() => {setChange(false)}}>返回</Button>
          <Button onClick={submit}>提交</Button>
        </div>
      )
    }else{
      return (
        <Card title={deskInfo.name} style={{margin:'10px 5px', width:'280px'}}>
          <p>容纳人数：{deskInfo.capacity}</p>
          <div>
            <Button onClick={showQRbox}>二维码</Button>
            <Button onClick={() => {setChange(true)}}>修改</Button>
            <Button onClick={deleteDesk}>删除</Button>
          </div>
        </Card>
      )
    }
  }

  return getContent()
}

export default class DeskManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      desk: []
    }

    this.rid = props.match.params.rid
  }

  componentDidMount(){
    api.get(`/restaurant/${this.rid}/desk`).then(res => {
      this.setState(produce(state => {
        state.desk = res.data
      }))
    })
  }

  onDelete = (desk) => {
    var idx = this.state.desk.findIndex(it => it.id === desk.id)
    this.setState(produce(state => {
      state.desk.splice(idx, 1)
    }))
  }

  render() {
    return(
      <div style={{margin:'10px'}}>
        <Button>
          <Link to={`/restaurant/${this.rid}/manage/add-desk`}>添加桌面</Link>
        </Button>
        <div style={{display:'flex', flexWrap:'wrap'}}>
          {this.state.desk.length > 0 ?
            this.state.desk.map(desk => {
              return <DeskItem onDelete={this.onDelete} key={desk.id} desk={desk} />
            })
            :
            <div></div>
          }
        </div>
        <div className='QRcodeBox hidden'>
          <img id='QRcode' alt='QRcode' />
          <Button onClick={()=>{document.querySelector('.QRcodeBox').classList.add('hidden')}}>确认</Button>
        </div>
      </div>
    )
  }
}