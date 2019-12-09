import React, { Suspense } from 'react'
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import OrderManage from './OrderManage'
import FoodManage from './FoodManage'
import DeskManage from './DeskManage'
import AddFood from './AddFood'
import AddDesk from './AddDesk'
import api from './api'
import createFetcher from './create-fetcher'
import history from './history'
import { Menu } from 'antd';

const userInfoFetcher = createFetcher(async () => {
  return api.get('/userinfo')
  .catch((e) => {
    console.log(e)
    // window.history.hash = '/'
    history.push('/')
  })
})

function RestaurantInfo(){
  var info = userInfoFetcher.read().data
  return(
    <div className='show-area-title'>
      <h3>{info && info.title}</h3>
    </div>
  )
}

export default withRouter(function(props){
  async function logout() {
    await api.get('/logout')
    userInfoFetcher.clearCache()
    props.history.push('/')
  }

  return (
    <div className='show-area'>
      <Suspense fallback={<div>loading...</div>}>
        <RestaurantInfo />
      </Suspense>
      <div className='show-area-content'>
        <aside>
          <Menu mode="inline" style={{height:'100%', width:'150px'}}>
            <Menu.Item key="order">
              <Link to='order'>订单管理</Link>
            </Menu.Item>
            <Menu.Item key="food">
              <Link to='food'>菜品管理</Link>
            </Menu.Item>
            <Menu.Item key="desk">
              <Link to='desk'>桌面管理</Link>
            </Menu.Item>
            <Menu.Item key="exit">
              <span onClick={()=>logout()}>退出</span>
            </Menu.Item>
          </Menu>
        </aside>
        <main>
          <Switch>
            <Route path="/restaurant/:rid/manage/order" component={OrderManage}/>
            <Route path="/restaurant/:rid/manage/food" component={FoodManage}/>
            <Route path="/restaurant/:rid/manage/desk" component={DeskManage}/>
            <Route path="/restaurant/:rid/manage/add-food" component={AddFood}/>
            <Route path="/restaurant/:rid/manage/add-desk" component={AddDesk}/>
          </Switch>
        </main>
      </div>
    </div>
  )
})