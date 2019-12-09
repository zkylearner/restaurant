import React, { Component, useState } from 'react'
import io from 'socket.io-client'
import api from './api'
import { Button, Card } from 'antd'
import { produce } from 'immer'

var orderItemStyle = {
  margin: '10px',
  width: '320px'
}

function OrderItem({order, onDelete}) {
  let [orderInfo, setOrder] = useState(order)
  let status = ['pending', 'confirmed', 'completed']

  function changeStatus(statu){
    api.put(`/restaurant/1/order/${order.id}/status`, {
      status: statu
    }).then(() => {
      setOrder({
        ...orderInfo,
        status: statu
      })
    })
  }

  function deleteOrder() {
    api.delete(`/restaurant/1/order/${order.id}`).then(() => {
      onDelete(order)
    }).catch(e => console.log(e))
  }

  return (
    <div style={orderItemStyle}>
      <Card title={orderInfo.deskName} >
        <p>总价格：￥{orderInfo.totalPrice}</p>
        <p>人数：{orderInfo.customCount}</p>
        <p>订单状态：{orderInfo.status}</p>
        <div>
          <Button>打印</Button>
          <Button onClick={() => changeStatus(status[1])}>确认</Button>
          <Button onClick={() => changeStatus(status[2])}>完成</Button>
          <Button onClick={deleteOrder}>删除</Button>
        </div>
      </Card>
    </div>
  )
}

export default class OrderManage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: []
    }
  }

  componentDidMount(){
    let ioUrl = 'ws' + window.baseURL.split('http')[1]
    this.socket = io(ioUrl)

    this.socket.on('new order', order => {
      this.setState(produce(state => {
        state.orders.unshift(order)
      }))
    })
    
    api.get('/restaurant/1/order').then(res => {
      this.setState(produce(state => {
        state.orders = res.data
      }))
    })
  }

  onDelete = (order) => {
    var idx = this.state.orders.findIndex(it => it.id === order.id)

    this.setState(produce(state => {
      state.orders.splice(idx, 1)
    }))
  }

  render() {
    return(
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {this.state.orders.length > 0 ?
          this.state.orders.map(order => {
            return <OrderItem onDelete={this.onDelete} key={order.id} order={order} />
          })
          :
          <div>暂无订单</div>
        }
      </div>
    )
  }
}