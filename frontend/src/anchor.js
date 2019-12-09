import React,{useEffect, useState} from 'react';
import api from './api'

// 页面内跳转测试
export default function(){
  const [menu, setMenu] = useState({})
  const [categoryMap, setCategoryMap] = useState({})

  //category
  useEffect(() => {
    api.get('/restaurant/1/food').then(res => {
      console.log(res.data)
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
      });
      console.log(menuObj, categoryMapObj)
      setMenu(menuObj)
      setCategoryMap(categoryMapObj)
    })
  },[])

  function go(anchorName){
    console.log(anchorName)
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }

  return(
    <div style={{heigth:'100px',overflow:'scroll'}}>
      {/* <button onClick={() => {go('id15')}}>scrollToAnchor</button> */}
      {
        Object.entries(categoryMap).map(ary =>
          <p key={ary[1]} onClick={() => go(ary[1])} >{ary[0]}</p>
        )
        // Array(20).fill(0).map((val, idx) => {
        //   return <p style={{margin:'5em 5px'}} id={'id' + idx} key={idx} >{idx}</p>
        // })
      }
      {
        Object.entries(menu).map(ary =>{
          let key = ary[1][0].category
          let res = ary[1].map(food => <p key={food.id} >{food.name}</p>)
          res.unshift(<h3 key={ary[0]} id={ary[0]} >{key}</h3>)
          console.log(res)
          return res
        })
      }
    </div>
  )
}

