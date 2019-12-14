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
  let [show, setShow] = useState(false)
  let status = ['pending', 'confirmed', 'completed']

  function OrderDetails(){
    return(
      <div className='order-details'>
        <ul>
          <li>
            <span>菜品</span>
            <span>价格</span>
            <span>数量</span>
          </li>
          {
            Object.values(orderInfo.details).map(it => {
              return (
                <li key={it.food.id}>
                  <span>{it.food.name}</span>
                  <span>{it.food.price}</span>
                  <span>{it.amount}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  function changeStatus(statu){
    api.put(`/restaurant/${order.rid}/order/${order.id}/status`, {
      status: statu
    }).then(() => {
      setOrder({
        ...orderInfo,
        status: statu
      })
    })
  }

  function deleteOrder() {
    api.delete(`/restaurant/${order.rid}/order/${order.id}`).then(() => {
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
          <Button onClick={() => {setShow(!show)}}>详情</Button>
          <Button onClick={() => changeStatus(status[1])}>确认</Button>
          <Button onClick={() => changeStatus(status[2])}>完成</Button>
          <Button onClick={deleteOrder}>删除</Button>
        </div>
        {show ? <OrderDetails /> : ''}
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
    
    api.get(`/restaurant/1/order`).then(res => {
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
        {
          this.state.orders.map(order => {
            return <OrderItem onDelete={this.onDelete} key={order.id} order={order} />
          })
        }
      </div>
    )
  }
}