import React,{ useState, createRef, Component} from 'react'
import { Button, Icon } from 'antd'
import api from './api'
import history from './history'
import { produce } from 'immer'
import io from 'socket.io-client'

function MenuItem({food, onUpdate, amount}){
  function updateCount(food, num){
    if(num === -1 && amount === 0)return
    onUpdate(food, amount + num)
  }

  return (
    <div className='foodMBox'>
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

function go(anchorName){
  // console.log(anchorName)
  if (anchorName) {
    let anchorElement = document.getElementById(anchorName);
    if(anchorElement) { anchorElement.scrollIntoView() }
  }
}

function Category({categoryMap}){
  return Object.entries(categoryMap).map(ary =>
    <p key={ary[1]} onClick={() => go(ary[1])} >{ary[0]}</p>
  )
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

function MenuInfo({menu, cart, cartChange}){
  return Object.entries(menu).map(ary =>{
    let key = ary[1][0].category
    let res = ary[1].map(food =>{
      var currentAmount = 0
      var currFoodCartItem = cart.find(cartItem => cartItem.food.id === food.id)
      if (currFoodCartItem) {
        currentAmount = currFoodCartItem.amount
      }
      return <MenuItem key={food.id} food={food} amount={currentAmount}
        onUpdate={cartChange} />
    })
    res.unshift(<h3 key={ary[0]} id={ary[0]} >{key}</h3>)
    // console.log(res)
    return res
  })
}

const ref = createRef()
const foodWindowRef = createRef()

export default class FoodCart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      menu: {},
      deskInfo: {},
      categoryMap: {},
    }
    this.rid = props.match.params.rid
    this.did = props.match.params.did
    this.customerCount = props.match.params.count
  }

  componentDidMount() {
    document.title = '点餐页面'
    api.get('/deskinfo/' + this.did).then(val => {
      this.setState({
        deskInfo: val.data,
      })
    })

    api.get(`/restaurant/${this.rid}/food`).then(res => {
      // 菜单分类处理
      let menuObj = {}
      let categoryMapObj = {}
      let menuData = res.data
      let count = 0
      menuData.forEach(food => {
        let key = food.category
        if(!categoryMapObj[key]){
          categoryMapObj[key] = 'category' + ++count
          menuObj[categoryMapObj[key]] = []
        }
        menuObj[categoryMapObj[key]].push(food)
      })
      // console.log(menuObj, categoryMapObj)
      this.setState({
        menu: menuObj,
        categoryMap: categoryMapObj,
      })
    })

    let ioUrl = 'ws' + window.baseURL.split('http')[1]
    this.socket = io(ioUrl)

    this.socket.on('connect', () => {
      this.socket.emit('join desk', 'desk:' + this.did)
    })

    // 后端发回此桌面已点菜单
    this.socket.on('cart food', info => {
      // console.log('cart init', info)
      this.setState(produce(state => {
        state.cart.push(...info)
      }))
    })

    // 来自同桌其它用户新增的菜单
    this.socket.on('new food', info => {
      // console.log(info)
      this.foodChange(info.food, info.amount)
    })

    this.socket.on('clear cart', info => {
      this.setState({cart: []})
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
    // console.log('下单')
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
    this.socket.emit('clear cart', {desk: 'desk:' + this.did})
  }

  render() {
    return (
      <div className='foodWindow' ref={foodWindowRef}>
        <aside>
          <Category categoryMap={this.state.categoryMap} />
        </aside>
        <main ref={ref}>
          <MenuInfo menu={this.state.menu} cart={this.state.cart} cartChange={this.cartChange}></MenuInfo>
        </main>
        <ShoppingCart cart={this.state.cart} order={this.order} clearCart={this.clearCart} />
      </div>
    )
  }
}