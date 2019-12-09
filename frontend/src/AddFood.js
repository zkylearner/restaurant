import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import api from './api'
import history from './history'

export default withRouter(function AddFood(props){
  let rid = props.match.params.rid

  let [foodData, setFoodData] = useState({
    rid,
    name: '',
    price: 0,
    status: '1',
    desc: '',
    category: '',
    img: 'default.jpg',
  })

  function change(e) {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value
    })
  }

  function imgChange(e) {
    let file = e.target.files[0]
    setFoodData({
      ...foodData,
      img: file ? file : foodData.img,
    })
  }

  function submit(e) {
    var fd = new FormData()
    for(var key in foodData) {
      var val = foodData[key]
      if(val)fd.append(key, val)
    }

    api.post(`/restaurant/${rid}/food`, fd)
      .then(res => {
        history.goBack()
      }).catch(e=> console.log(e))
  }

  return(
    <div className='addFoodCard'>
      <h3>添加菜品</h3>
      <ul>
        <li>名称：<input type='text' onChange={change} name="name" /></li>
        <li>价格：<input type='text' onChange={change} name="price" /></li>
        <li>分类：<input type='text' onChange={change} name="category" /></li>
        <li>描述：<input type='text' onChange={change} name="desc" /></li>
        <li>图片：<input type='file' onChange={imgChange} name="img" /></li>
      </ul>
      <button onClick={() => {history.push(`/restaurant/${rid}/manage/food` ) }}>返回</button>
      <button onClick={submit}>提交</button>
    </div>
  )
})
