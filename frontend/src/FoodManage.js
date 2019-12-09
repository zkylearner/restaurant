import React,{useEffect, useState} from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Input } from 'antd'
import api from './api'

function FoodItem({food, obj:{foods,setFoods}}){
  let [change, setChange] = useState(false)
  let [fd, setFoodData] = useState(food)

  function updateData(){
    var data = new FormData()
    for(var key in fd) {
      var val = fd[key]
      if(val)data.append(key, val)
    }
    api.put(`/restaurant/${food.rid}/food/${food.id}`, data)
    .then(res=>{
      let newFood = res.data
      setFoodData(newFood)
      let newFoods = foods.map(it=>{
        if(it.id === newFood.id){
          return newFood
        }else{
          return it
        }
      })
      setFoods(newFoods)
    })
    .catch(e=>console.log('菜品数据更新错误: ' + e))
    setChange(false)
  }

  async function removeItem(){
    await api.delete(`/restaurant/${food.rid}/food/${food.id}`)
      .catch(e => console.log(e))
    let newFoods = foods.filter(it=> it.id !== food.id)
    setFoods(newFoods)
  }

  function changeFd(e) {
    setFoodData({
      ...fd,
      [e.target.name]: e.target.value
    })
  }

  function imgChange(e) {
    let file = e.target.files[0]
    setFoodData({
      ...fd,
      img: file ? file : fd.img,
    })
  }

  function getContent(){
    if(change){
      // 修改页面
      return(
        <div className='changeFoodPage'>
          <ul>
            <li>名称：<Input type='text' value={fd.name} onChange={changeFd} name='name' /></li>
            <li>价格：<Input type='text' value={fd.price} onChange={changeFd} name='price' /></li>
            <li>分类：<Input type='text' value={fd.category} onChange={changeFd} name='category' /></li>
            <li>描述：<Input type='text' value={fd.desc} onChange={changeFd} name='desc' /></li>
            <li>图片：<input type='file' onChange={imgChange} name='img' /></li>
          </ul>
          <Button size='small' onClick={()=>setFoodData({...fd, status:!fd.status})}>{fd.status ? '下架' : '上架'}</Button>
          <Button size='small' onClick={()=>setChange(!change)}>返回</Button>
          <Button size='small' onClick={()=>updateData()}>保存</Button>
        </div>
      )
    }else{
      // 展示页面
      return(
        <div>
          <img src={window.baseURL + 'upload/' + food.img} alt={food.name}></img>
          <h5>{food.name + (food.status ? '' : "[以下架]")}</h5>
          <ul>
            <li>价格：{food.price}</li>
            <li>描述：{food.desc}</li>
            <li>分类：{food.category}</li>
            <li>
              <Button size='small' onClick={() => setChange(!change)}>修改</Button>
              <Button size='small' onClick={ removeItem }>删除</Button>
            </li>
          </ul>
        </div>
      )
    }
  }

  return (
    <div className='foodMBox'>
      { getContent() }
    </div>
  )
}

export default withRouter(function(props){
  let [foods, setFoods] = useState([])
  let rid = props.match.params.rid

  useEffect(() => {
    // console.log('effect')
    api.get(`/restaurant/${rid}/food`).then(res => {
      setFoods(res.data)
    })
  },[rid])

  return (
    <div className='foodManage'>
      <Button>
        <Link to={`/restaurant/${rid}/manage/add-food`}>添加菜品</Link>
      </Button>
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {foods.map(food => <FoodItem key={food.id} food={food} obj={ {foods,setFoods} } ></FoodItem> )}
      </div>
    </div>
  )
})