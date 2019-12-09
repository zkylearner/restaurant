import React,{ Suspense, useState } from 'react';
import { Button } from 'antd'
import {withRouter} from 'react-router-dom'
import api from "./api"
import createFetcher from './create-fetcher'
import './LandingPage.css'

var fetcher = createFetcher((did) => {
  return api.get('/deskinfo/' + did)
  .catch(function (error) {
    console.log(error);
  })
})

function DeskInfo({did}) {
  var info = fetcher.read(did).data
  
  return (
    <div>
      <span>{info.title}</span>
      -
      <span>{info.name}</span>
    </div>
  )
}

export default withRouter(function(props){
  let {rid, did} = props.match.params
  let [count, useCount] = useState(0)

  function startOrder() {
    // 路由跳转页面
    props.history.push(`/r/${rid}/d/${did}/c/${count}`)
  }

  return (
    <div className="LandingPage">
      <div className="LandingPageBox">
        <Suspense fallback={<div>正在加载桌面信息...</div>}>
          <DeskInfo did={did} />
        </Suspense>
        <h2>请选择点餐人数</h2>
        <ul className="custom-count">
          {
            [1,2,3,4,5,6,7,8].map(val => {
              return <li key={val} className={count === val ? 'active': null} onClick={()=>useCount(val)}>{val}</li>
            })
          }
        </ul>
        <Button onClick={startOrder}>开始点餐</Button>
      </div>
    </div>
  )
})