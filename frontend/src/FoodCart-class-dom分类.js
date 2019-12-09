import React,{ useState, createRef, Component} from 'react'
import { Button, Icon } from 'antd'
import api from './api'
import history from './history'
import { produce } from 'immer'
import io from 'socket.io-client'

function MenuItem({food, list, onUpdate, amount}){
  function updateCount(food, num){
    if(num === -1 && amount === 0)return
    onUpdate(food, amount + num)
  }

  return (
    <div className={['foodMBox', 'category' + list.indexOf(food.category)].join(' ')}>
      <img src={window.baseURL + 'upload/' + food.img} alt={food.name}></img>
      <h3>{food.name}</h3>
      <p>{food.desc}</p>
      <footer>
        <span>￥{food.price}</span>
        <span className='counter'>
          {amount > 0 && <Icon type="minus-circle" theme="twoTone" onClick={()=>updateCount(food, -1) } />}
          {amount > 0 && <span>{amount}</span>}
          <Icon type="plus-circle" theme="twoTone" onClick={()=>updateCount(food, 1)} />
        </span>
      </footer>
    </div>
  )
}

function CartItem({cart}){
  return (
    cart.map(obj => {
      let {id, name, price} = obj.food
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{obj.amount}</td>
          <td>{price}</td>
        </tr>
      )
    })
  )
}

function Category({list}){
  let res = list.map(it => <p className={'category' + list.indexOf(it) } key={it} >{it}</p>)
      res.unshift(<p className='all' key={'all'}>全部分类</p>)
  return res
}

function getTotalPrice(cart){
  return cart.reduce((total, obj) => {
    return total + obj.food.price * obj.amount
  }, 0)
}

function ShoppingCart({cart, order, clearCart}){
  let [show, setShow] = useState(false)

  function updateShow(){
    setShow(!show)
    // if(show){
    //   foodWindowRef.current.classList.remove('gray')
    // }else{
    //   foodWindowRef.current.classList.add('gray')
    // }
  }

  return(
    <div className='ShoppingCart' >
      {show && (cart.length > 0 ? 
        <div className='shoppingList' >
          <span className='clearCart' onClick={() => {clearCart();setShow(!show)}} ><Icon type="delete" theme="twoTone"/>清空</span>
          <h3>已选商品</h3>
          <table>
            <tbody>
              <tr>
                <th>名称</th>
                <th>数量</th>
                <th>单价</th>
              </tr>
              <CartItem cart={cart} />
            </tbody>
          </table>
        </div>
        :<p>暂无商品</p>)
      }
      <footer>
        <Button onClick={updateShow} >{show ? '收起' : '展开'}</Button>
        <span>￥{getTotalPrice(cart)}</span>
        <Button className='submit' onClick={() => order()} >下单</Button>
      </footer>
    </div>
  )
}

const ref = createRef()
const foodWindowRef = createRef()

export default class FoodCart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      menu: [],
      deskInfo: {},
    }
    this.rid = props.match.params.rid
    this.did = props.match.params.did
    this.customerCount = props.match.params.count

    // let set = new Set()
    // this.state.menu.forEach(food => {
    //   set.add(food.category)
    // })
    // this.list = [...set]
  }

  componentDidMount() {
    api.get('/deskinfo/' + this.did).then(val => {
      this.setState({
        deskInfo: val.data,
      })
    })

    api.get(`/restaurant/${this.rid}/food`).then(res => {
      this.setState({
        menu: res.data,
      })
    })

    this.socket = io('ws://localhost:8080')

    this.socket.on('connect', () => {
      this.socket.emit('join desk', 'desk:' + this.did)
    })

    // 后端发回此桌面已点菜单
    this.socket.on('cart food', info => {
      console.log('cart init', info)
      this.setState(produce(state => {
        state.cart.push(...info)
      }))
    })

    // 来自同桌其它用户新增的菜单
    this.socket.on('new food', info => {
      // console.log(info)
      this.foodChange(info.food, info.amount)
    })

    this.socket.on('placeorder success', order => {
      history.push({
        pathname: `/r/${this.rid}/d/${this.did}/order-success`,
        state: order,
      })
    })
  }

  componentWillUnmount() {
    this.socket.close()
  }

  cartChange = (food, amount) => {
    this.socket.emit('new food', {desk: 'desk:' + this.did, food, amount})
  }

  showFoodcart(e){
    // console.log(ref.current, e.target)
    let target = e.target
    if(target.nodeName === 'P'){
      let MenuNode = ref.current
      MenuNode.childNodes.forEach(it => {
        if(it.classList.contains(target.className)){
          it.classList.remove('hidden')
        }else{
          it.classList.add('hidden')
        }
      })
    }

    if(target.classList.contains('all')){
      let MenuNode = ref.current
      MenuNode.childNodes.forEach(it => {
        it.classList.remove('hidden')
      })
    }
  }

  foodChange = (food, amount) => {
    var updated = produce(this.state.cart, cart => {
      var idx = cart.findIndex(it => it.food.id === food.id)

      if (idx >= 0) {
        if (amount === 0) {
          cart.splice(idx, 1)
        } else {
          cart[idx].amount = amount
        }
      } else {
        cart.push({
          food,
          amount,
        })
      }
    })
    this.setState({cart: updated})
  }

  order = () => {
    console.log('下单')
    let from = {
      deskName: this.state.deskInfo.name,
      totalPrice: getTotalPrice(this.state.cart),
      customCount: this.customerCount,
      foods: this.state.cart,
    }
  
    api.post(`/restaurant/${this.rid}/desk/${this.did}/order`, from)
    .then(res => {
      history.push({
        pathname: `/r/${this.rid}/d/${this.did}/order-success`,
        state: res.data,
      })
    })
  }

  clearCart = () => {
    this.setState({cart: []})
  }

  render() {
    let set = new Set()
    this.state.menu.forEach(food => {
      set.add(food.category)
    })
    this.list = [...set]

    return (
      <div className='foodWindow' ref={foodWindowRef}>
        <aside onClick={this.showFoodcart}>
          <Category list={this.list} />
        </aside>
        <main ref={ref}>
          {
            this.state.menu.map(food => {
              var currentAmount = 0
              var currFoodCartItem = this.state.cart.find(cartItem => cartItem.food.id === food.id)
              if (currFoodCartItem) {
                currentAmount = currFoodCartItem.amount
              }
              return <MenuItem key={food.id} food={food} amount={currentAmount}
              list={this.list} onUpdate={this.cartChange} />
            })
          }
        </main>
        <ShoppingCart cart={this.state.cart} order={this.order} clearCart={this.clearCart} />
      </div>
    )
  }
}