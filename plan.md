商家：
(rid 对应商家id, did 桌面id)
注册
订单管理:
订单信息:
  id rid did 人数 菜品详情

菜品管理：
CREATE TABLE foods(
  id integer primary key,
  rid integer not null,
  name string not null,
  price integer not null,
  img string,
  status string,
  desc string,
  category string
);
增删改查
菜品信息：
  id 名称 描述 价格 图片url rid 状态 菜品分类

桌面管理:
CREATE TABLE foods(
  id integer primary key,
  rid integer not null,
  name string not null,
  price integer not null,
  img string,
  status string,
  desc string,
  category string
);
增删改查
桌面信息
  id 名称 rid 容纳人数（预留）

餐厅商家登陆页面
用户名
密码
bt 登陆 忘记密码

商家登入后展示页面
- 菜单的创建及管理


用户：
二维码页面
/landing-page
餐厅名称 桌号 人数选择 开始点餐按钮

点餐页面
/餐厅ID/ /餐桌ID
/restaurant/25/desk/8?customs=3
显示菜单 购物车 实时同步
获取菜单: 
  api/menus?rid=25

  websocket:
    存储当前桌面已点的菜品
    实时同步桌面的点菜信息

提交当前桌面的点餐信息 下单
  post /api/placeorder
  {
    deskId,rId
    customs,
    [{foodId:1, amount:1}, ...]
  }
