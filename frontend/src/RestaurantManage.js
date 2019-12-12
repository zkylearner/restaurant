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
import { Button } from 'antd';

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
    <div className='drName'>
      <span title='dining room name'>{info && info.title}</span>
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
      <div className='show-area-title'>
        <p>后台管理系统</p>
        <Button className='logout' onClick={logout}>退出</Button>
      </div>
      <div className='show-area-content'>
        <aside>
          <ul mode="inline" className='system-menu'>
            <Suspense fallback={<div className='drName'>loading...</div>}>
              <RestaurantInfo />
            </Suspense>
            <li>
              <Link to='order'>订单管理</Link>
            </li>
            <li>
              <Link to='food'>菜品管理</Link>
            </li>
            <li>
              <Link to='desk'>桌面管理</Link>
            </li>
          </ul>
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