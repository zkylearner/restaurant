(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{151:function(e,t,a){e.exports=a(290)},172:function(e,t,a){},248:function(e,t){},290:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(31),o=a.n(c),l=a(68),i=a.n(l);window.axios=i.a,window.baseURL="http://zkylearner.top:8080/",window.frontURL="http://zkylearner.top:5000/";a(172);var u=a(33),s=a(5),m=a(98),d=i.a.create({baseURL:window.baseURL,withCredentials:!0}),f=function(e){var t={};return{clearCache:function(){t={}},read:function(){for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];var c=n.join("|");if(c in t)return t[c];throw e.apply(void 0,n).then((function(e){t[c]=e}))}}},p=f((function(e){return d.get("/deskinfo/"+e).catch((function(e){console.log(e)}))}));function h(e){var t=e.did,a=p.read(t).data;return r.a.createElement("div",null,r.a.createElement("span",null,a.title),"-",r.a.createElement("span",null,a.name))}var E=Object(u.f)((function(e){var t=e.match.params,a=t.rid,c=t.did,o=Object(n.useState)(0),l=Object(s.a)(o,2),i=l[0],u=l[1];return r.a.createElement("div",{className:"LandingPage"},r.a.createElement("div",{className:"LandingPageBox"},r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"\u6b63\u5728\u52a0\u8f7d\u684c\u9762\u4fe1\u606f...")},r.a.createElement(h,{did:c})),r.a.createElement("h2",null,"\u8bf7\u9009\u62e9\u70b9\u9910\u4eba\u6570"),r.a.createElement("ul",{className:"custom-count"},[1,2,3,4,5,6,7,8].map((function(e){return r.a.createElement("li",{key:e,className:i===e?"active":null,onClick:function(){return u(e)}},e)}))),r.a.createElement(m.a,{onClick:function(){e.history.push("/r/".concat(a,"/d/").concat(c,"/c/").concat(i))}},"\u5f00\u59cb\u70b9\u9910")))})),g=a(148),b=a(52),O=a(53),v=a(55),y=a(54),j=a(56),k=a(13),w=a(16),C=Object(w.b)(),P=a(24),x=a(69),S=a.n(x);function D(e){var t=e.food,a=e.onUpdate,n=e.amount;function c(e,t){-1===t&&0===n||a(e,n+t)}return r.a.createElement("div",{className:"foodMBox"},r.a.createElement("img",{src:window.baseURL+"upload/"+t.img,alt:t.name}),r.a.createElement("h3",null,t.name),r.a.createElement("p",null,t.desc),r.a.createElement("footer",null,r.a.createElement("span",null,"\uffe5",t.price),r.a.createElement("span",{className:"counter"},n>0&&r.a.createElement(k.a,{type:"minus-circle",theme:"twoTone",onClick:function(){return c(t,-1)}}),n>0&&r.a.createElement("span",null,n),r.a.createElement(k.a,{type:"plus-circle",theme:"twoTone",onClick:function(){return c(t,1)}}))))}function N(e){return e.cart.map((function(e){var t=e.food,a=t.id,n=t.name,c=t.price;return r.a.createElement("tr",{key:a},r.a.createElement("td",null,n),r.a.createElement("td",null,e.amount),r.a.createElement("td",null,c))}))}function R(e){var t=e.categoryMap;return Object.entries(t).map((function(e){return r.a.createElement("p",{key:e[1],onClick:function(){return function(e){if(e){var t=document.getElementById(e);t&&t.scrollIntoView()}}(e[1])}},e[0])}))}function L(e){return e.reduce((function(e,t){return e+t.food.price*t.amount}),0)}function U(e){var t=e.cart,a=e.order,c=e.clearCart,o=Object(n.useState)(!1),l=Object(s.a)(o,2),i=l[0],u=l[1];return r.a.createElement("div",{className:"ShoppingCart"},i&&(t.length>0?r.a.createElement("div",{className:"shoppingList"},r.a.createElement("span",{className:"clearCart",onClick:function(){c(),u(!i)}},r.a.createElement(k.a,{type:"delete",theme:"twoTone"}),"\u6e05\u7a7a"),r.a.createElement("h3",null,"\u5df2\u9009\u5546\u54c1"),r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"\u540d\u79f0"),r.a.createElement("th",null,"\u6570\u91cf"),r.a.createElement("th",null,"\u5355\u4ef7")),r.a.createElement(N,{cart:t})))):r.a.createElement("p",null,"\u6682\u65e0\u5546\u54c1")),r.a.createElement("footer",null,r.a.createElement(m.a,{onClick:function(){u(!i)}},i?"\u6536\u8d77":"\u5c55\u5f00"),r.a.createElement("span",null,"\uffe5",L(t)),r.a.createElement(m.a,{className:"submit",onClick:function(){return a()}},"\u4e0b\u5355")))}function B(e){var t=e.menu,a=e.cart,n=e.cartChange;return Object.entries(t).map((function(e){var t=e[1][0].category,c=e[1].map((function(e){var t=0,c=a.find((function(t){return t.food.id===e.id}));return c&&(t=c.amount),r.a.createElement(D,{key:e.id,food:e,amount:t,onUpdate:n})}));return c.unshift(r.a.createElement("h3",{key:e[0],id:e[0]},t)),c}))}var M=Object(n.createRef)(),I=Object(n.createRef)(),z=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(v.a)(this,Object(y.a)(t).call(this,e))).cartChange=function(e,t){a.socket.emit("new food",{desk:"desk:"+a.did,food:e,amount:t})},a.foodChange=function(e,t){var n=Object(P.a)(a.state.cart,(function(a){var n=a.findIndex((function(t){return t.food.id===e.id}));n>=0?0===t?a.splice(n,1):a[n].amount=t:a.push({food:e,amount:t})}));a.setState({cart:n})},a.order=function(){var e={deskName:a.state.deskInfo.name,totalPrice:L(a.state.cart),customCount:a.customerCount,foods:a.state.cart};d.post("/restaurant/".concat(a.rid,"/desk/").concat(a.did,"/order"),e).then((function(e){C.push({pathname:"/r/".concat(a.rid,"/d/").concat(a.did,"/order-success"),state:e.data})}))},a.clearCart=function(){a.setState({cart:[]}),a.socket.emit("clear cart",{desk:"desk:"+a.did})},a.state={cart:[],menu:{},deskInfo:{},categoryMap:{}},a.rid=e.match.params.rid,a.did=e.match.params.did,a.customerCount=e.match.params.count,a}return Object(j.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.title="\u70b9\u9910\u9875\u9762",d.get("/deskinfo/"+this.did).then((function(t){e.setState({deskInfo:t.data})})),d.get("/restaurant/".concat(this.rid,"/food")).then((function(t){var a={},n={},r=t.data,c=0;r.forEach((function(e){var t=e.category;n[t]||(n[t]="category"+ ++c,a[n[t]]=[]),a[n[t]].push(e)})),e.setState({menu:a,categoryMap:n})}));var t="ws"+window.baseURL.split("http")[1];this.socket=S()(t),this.socket.on("connect",(function(){e.socket.emit("join desk","desk:"+e.did)})),this.socket.on("cart food",(function(t){e.setState(Object(P.a)((function(e){var a;(a=e.cart).push.apply(a,Object(g.a)(t))})))})),this.socket.on("new food",(function(t){e.foodChange(t.food,t.amount)})),this.socket.on("clear cart",(function(t){e.setState({cart:[]})})),this.socket.on("placeorder success",(function(t){C.push({pathname:"/r/".concat(e.rid,"/d/").concat(e.did,"/order-success"),state:t})}))}},{key:"componentWillUnmount",value:function(){this.socket.close()}},{key:"render",value:function(){return r.a.createElement("div",{className:"foodWindow",ref:I},r.a.createElement("aside",null,r.a.createElement(R,{categoryMap:this.state.categoryMap})),r.a.createElement("main",{ref:M},r.a.createElement(B,{menu:this.state.menu,cart:this.state.cart,cartChange:this.cartChange})),r.a.createElement(U,{cart:this.state.cart,order:this.order,clearCart:this.clearCart}))}}]),t}(n.Component),F=a(20),W=a.n(F),Q=a(40),T=a(14),q=a(12),J=a(291);function A(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var H={margin:"10px",width:"320px"};function V(e){var t=e.order,a=e.onDelete,c=Object(n.useState)(t),o=Object(s.a)(c,2),l=o[0],i=o[1],u=["pending","confirmed","completed"];function f(e){d.put("/restaurant/1/order/".concat(t.id,"/status"),{status:e}).then((function(){i(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?A(a,!0).forEach((function(t){Object(q.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):A(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},l,{status:e}))}))}return r.a.createElement("div",{style:H},r.a.createElement(J.a,{title:l.deskName},r.a.createElement("p",null,"\u603b\u4ef7\u683c\uff1a\uffe5",l.totalPrice),r.a.createElement("p",null,"\u4eba\u6570\uff1a",l.customCount),r.a.createElement("p",null,"\u8ba2\u5355\u72b6\u6001\uff1a",l.status),r.a.createElement("div",null,r.a.createElement(m.a,null,"\u6253\u5370"),r.a.createElement(m.a,{onClick:function(){return f(u[1])}},"\u786e\u8ba4"),r.a.createElement(m.a,{onClick:function(){return f(u[2])}},"\u5b8c\u6210"),r.a.createElement(m.a,{onClick:function(){d.delete("/restaurant/1/order/".concat(t.id)).then((function(){a(t)})).catch((function(e){return console.log(e)}))}},"\u5220\u9664"))))}var $=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(v.a)(this,Object(y.a)(t).call(this,e))).onDelete=function(e){var t=a.state.orders.findIndex((function(t){return t.id===e.id}));a.setState(Object(P.a)((function(e){e.orders.splice(t,1)})))},a.state={orders:[]},a}return Object(j.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this,t="ws"+window.baseURL.split("http")[1];this.socket=S()(t),this.socket.on("new order",(function(t){e.setState(Object(P.a)((function(e){e.orders.unshift(t)})))})),d.get("/restaurant/1/order").then((function(t){e.setState(Object(P.a)((function(e){e.orders=t.data})))}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},this.state.orders.length>0?this.state.orders.map((function(t){return r.a.createElement(V,{onDelete:e.onDelete,key:t.id,order:t})})):r.a.createElement("div",null))}}]),t}(n.Component),G=a(292);function K(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function X(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?K(a,!0).forEach((function(t){Object(q.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):K(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function Y(e){var t=e.food,a=e.obj,c=a.foods,o=a.setFoods,l=Object(n.useState)(!1),i=Object(s.a)(l,2),u=i[0],f=i[1],p=Object(n.useState)(t),h=Object(s.a)(p,2),E=h[0],g=h[1];function b(){return O.apply(this,arguments)}function O(){return(O=Object(Q.a)(W.a.mark((function e(){var a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.delete("/restaurant/".concat(t.rid,"/food/").concat(t.id)).catch((function(e){return console.log(e)}));case 2:a=c.filter((function(e){return e.id!==t.id})),o(a);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e){g(X({},E,Object(q.a)({},e.target.name,e.target.value)))}function y(e){var t=e.target.files[0];g(X({},E,{img:t||E.img}))}return r.a.createElement("div",{className:"foodMBox"},u?r.a.createElement("div",{className:"changeFoodPage"},r.a.createElement("ul",null,r.a.createElement("li",null,"\u540d\u79f0\uff1a",r.a.createElement(G.a,{type:"text",value:E.name,onChange:v,name:"name"})),r.a.createElement("li",null,"\u4ef7\u683c\uff1a",r.a.createElement(G.a,{type:"text",value:E.price,onChange:v,name:"price"})),r.a.createElement("li",null,"\u5206\u7c7b\uff1a",r.a.createElement(G.a,{type:"text",value:E.category,onChange:v,name:"category"})),r.a.createElement("li",null,"\u63cf\u8ff0\uff1a",r.a.createElement(G.a,{type:"text",value:E.desc,onChange:v,name:"desc"})),r.a.createElement("li",null,"\u56fe\u7247\uff1a",r.a.createElement("input",{type:"file",onChange:y,name:"img"}))),r.a.createElement(m.a,{size:"small",onClick:function(){return g(X({},E,{status:!E.status}))}},E.status?"\u4e0b\u67b6":"\u4e0a\u67b6"),r.a.createElement(m.a,{size:"small",onClick:function(){return f(!u)}},"\u8fd4\u56de"),r.a.createElement(m.a,{size:"small",onClick:function(){return function(){var e=new FormData;for(var a in E){var n=E[a];n&&e.append(a,n)}d.put("/restaurant/".concat(t.rid,"/food/").concat(t.id),e).then((function(e){var t=e.data;g(t);var a=c.map((function(e){return e.id===t.id?t:e}));o(a)})).catch((function(e){return console.log("\u83dc\u54c1\u6570\u636e\u66f4\u65b0\u9519\u8bef: "+e)})),f(!1)}()}},"\u4fdd\u5b58")):r.a.createElement("div",null,r.a.createElement("img",{src:window.baseURL+"upload/"+t.img,alt:t.name}),r.a.createElement("h5",null,t.name+(t.status?"":"[\u4ee5\u4e0b\u67b6]")),r.a.createElement("ul",null,r.a.createElement("li",null,"\u4ef7\u683c\uff1a",t.price),r.a.createElement("li",null,"\u63cf\u8ff0\uff1a",t.desc),r.a.createElement("li",null,"\u5206\u7c7b\uff1a",t.category),r.a.createElement("li",null,r.a.createElement(m.a,{size:"small",onClick:function(){return f(!u)}},"\u4fee\u6539"),r.a.createElement(m.a,{size:"small",onClick:b},"\u5220\u9664")))))}var Z=Object(u.f)((function(e){var t=Object(n.useState)([]),a=Object(s.a)(t,2),c=a[0],o=a[1],l=e.match.params.rid;return Object(n.useEffect)((function(){d.get("/restaurant/".concat(l,"/food")).then((function(e){o(e.data)}))}),[l]),r.a.createElement("div",{className:"foodManage"},r.a.createElement(m.a,null,r.a.createElement(T.a,{to:"/restaurant/".concat(l,"/manage/add-food")},"\u6dfb\u52a0\u83dc\u54c1")),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},c.map((function(e){return r.a.createElement(Y,{key:e.id,food:e,obj:{foods:c,setFoods:o}})}))))}));function _(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ee(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?_(a,!0).forEach((function(t){Object(q.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):_(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var te=a(269);var ae={border:"2px #e8e8e8 solid",width:"280px",padding:"5px",margin:"10px 5px"};function ne(e){var t=e.desk,a=e.onDelete,c=Object(n.useState)(!1),o=Object(s.a)(c,2),l=o[0],i=o[1],u=Object(n.useState)(t),f=Object(s.a)(u,2),p=f[0],h=f[1],E=Object(n.useState)(ee({},t)),g=Object(s.a)(E,2),b=g[0],O=g[1];function v(){d.delete("/restaurant/".concat(p.rid,"/desk/").concat(p.id)).then((function(){a(p)})).catch((function(e){return console.log(e)}))}function y(e){O(ee({},b,Object(q.a)({},e.target.name,e.target.value)))}function j(){d.put("/restaurant/".concat(p.rid,"/desk/").concat(p.id),b).then((function(e){i(!1),h(e.data)})).catch((function(e){return console.log(e)}))}return l?r.a.createElement("div",{style:ae},r.a.createElement("ul",null,r.a.createElement("li",null,"\u684c\u9762\u540d\u79f0\uff1a",r.a.createElement(G.a,{type:"text",name:"name",value:b.name,onChange:y})," "),r.a.createElement("li",null,"\u5bb9\u7eb3\u4eba\u6570\uff1a",r.a.createElement(G.a,{type:"number",name:"capacity",value:b.capacity,onChange:y})," ")),r.a.createElement(m.a,{onClick:function(){i(!1)}},"\u8fd4\u56de"),r.a.createElement(m.a,{onClick:j},"\u63d0\u4ea4")):r.a.createElement(J.a,{title:p.name,style:{margin:"10px 5px",width:"280px"}},r.a.createElement("p",null,"\u5bb9\u7eb3\u4eba\u6570\uff1a",p.capacity),r.a.createElement("div",null,r.a.createElement(m.a,{onClick:function(){var e,t;e="".concat(window.frontURL,"#/landing/r/").concat(p.rid,"/d/").concat(p.id),t=document.querySelector("#QRcode"),te.toDataURL(e,(function(e,a){t.src=a})),document.querySelector(".QRcodeBox").classList.remove("hidden")}},"\u4e8c\u7ef4\u7801"),r.a.createElement(m.a,{onClick:function(){i(!0)}},"\u4fee\u6539"),r.a.createElement(m.a,{onClick:v},"\u5220\u9664")))}var re=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(v.a)(this,Object(y.a)(t).call(this,e))).onDelete=function(e){var t=a.state.desk.findIndex((function(t){return t.id===e.id}));a.setState(Object(P.a)((function(e){e.desk.splice(t,1)})))},a.state={desk:[]},a.rid=e.match.params.rid,a}return Object(j.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.get("/restaurant/".concat(this.rid,"/desk")).then((function(t){e.setState(Object(P.a)((function(e){e.desk=t.data})))}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{margin:"10px"}},r.a.createElement(m.a,null,r.a.createElement(T.a,{to:"/restaurant/".concat(this.rid,"/manage/add-desk")},"\u6dfb\u52a0\u684c\u9762")),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},this.state.desk.length>0?this.state.desk.map((function(t){return r.a.createElement(ne,{onDelete:e.onDelete,key:t.id,desk:t})})):r.a.createElement("div",null)),r.a.createElement("div",{className:"QRcodeBox hidden"},r.a.createElement("img",{id:"QRcode",alt:"QRcode"}),r.a.createElement(m.a,{onClick:function(){document.querySelector(".QRcodeBox").classList.add("hidden")}},"\u786e\u8ba4")))}}]),t}(n.Component);function ce(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function oe(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ce(a,!0).forEach((function(t){Object(q.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ce(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var le=Object(u.f)((function(e){var t=e.match.params.rid,a=Object(n.useState)({rid:t,name:"",price:0,status:"1",desc:"",category:"",img:"default.jpg"}),c=Object(s.a)(a,2),o=c[0],l=c[1];function i(e){l(oe({},o,Object(q.a)({},e.target.name,e.target.value)))}return r.a.createElement("div",{className:"addFoodCard"},r.a.createElement("h3",null,"\u6dfb\u52a0\u83dc\u54c1"),r.a.createElement("ul",null,r.a.createElement("li",null,"\u540d\u79f0\uff1a",r.a.createElement(G.a,{type:"text",onChange:i,name:"name"})),r.a.createElement("li",null,"\u4ef7\u683c\uff1a",r.a.createElement(G.a,{type:"text",onChange:i,name:"price"})),r.a.createElement("li",null,"\u5206\u7c7b\uff1a",r.a.createElement(G.a,{type:"text",onChange:i,name:"category"})),r.a.createElement("li",null,"\u63cf\u8ff0\uff1a",r.a.createElement(G.a,{type:"text",onChange:i,name:"desc"})),r.a.createElement("li",null,"\u56fe\u7247\uff1a",r.a.createElement("input",{type:"file",onChange:function(e){var t=e.target.files[0];l(oe({},o,{img:t||o.img}))},name:"img"}))),r.a.createElement(m.a,{onClick:function(){C.push("/restaurant/".concat(t,"/manage/food"))}},"\u8fd4\u56de"),r.a.createElement(m.a,{onClick:function(e){var a=new FormData;for(var n in o){var r=o[n];r&&a.append(n,r)}d.post("/restaurant/".concat(t,"/food"),a).then((function(e){C.goBack()})).catch((function(e){return console.log(e)}))}},"\u63d0\u4ea4"))}));function ie(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var ue=Object(u.f)((function(e){var t=e.match.params.rid,a=Object(n.useState)({rid:t,name:"",capacity:0}),c=Object(s.a)(a,2),o=c[0],l=c[1];function i(e){l(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ie(a,!0).forEach((function(t){Object(q.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ie(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},o,Object(q.a)({},e.target.name,e.target.value)))}return r.a.createElement("div",{className:"addFoodCard"},r.a.createElement("h3",null,"\u6dfb\u52a0\u684c\u9762"),r.a.createElement("ul",null,r.a.createElement("li",null,"\u684c\u9762\u540d\u79f0\uff1a",r.a.createElement(G.a,{type:"text",onChange:i,name:"name"})),r.a.createElement("li",null,"\u5bb9\u7eb3\u4eba\u6570\uff1a",r.a.createElement(G.a,{type:"number",onChange:i,name:"capacity"}))),r.a.createElement(m.a,{onClick:function(){C.goBack()}},"\u8fd4\u56de"),r.a.createElement(m.a,{onClick:function(e){var a={};for(var n in o){var r=o[n];r&&(a[n]=r)}d.post("/restaurant/".concat(t,"/desk"),a).then((function(e){C.goBack()})).catch((function(e){return console.log(e)}))}},"\u63d0\u4ea4"))})),se=f(Object(Q.a)(W.a.mark((function e(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",d.get("/userinfo").catch((function(e){console.log(e),C.push("/")})));case 1:case"end":return e.stop()}}),e)}))));function me(){var e=se.read().data;return r.a.createElement("div",{className:"drName"},r.a.createElement("span",{title:"dining room name"},e&&e.title))}var de=Object(u.f)((function(e){function t(){return(t=Object(Q.a)(W.a.mark((function t(){return W.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.get("/logout");case 2:se.clearCache(),e.history.push("/");case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement("div",{className:"show-area"},r.a.createElement("div",{className:"show-area-title"},r.a.createElement("p",null,"\u540e\u53f0\u7ba1\u7406\u7cfb\u7edf"),r.a.createElement(m.a,{className:"logout",onClick:function(){return t.apply(this,arguments)}},"\u9000\u51fa")),r.a.createElement("div",{className:"show-area-content"},r.a.createElement("aside",null,r.a.createElement("ul",{mode:"inline",className:"system-menu"},r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",{className:"drName"},"loading...")},r.a.createElement(me,null)),r.a.createElement("li",null,r.a.createElement(T.a,{to:"order"},"\u8ba2\u5355\u7ba1\u7406")),r.a.createElement("li",null,r.a.createElement(T.a,{to:"food"},"\u83dc\u54c1\u7ba1\u7406")),r.a.createElement("li",null,r.a.createElement(T.a,{to:"desk"},"\u684c\u9762\u7ba1\u7406")))),r.a.createElement("main",null,r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/restaurant/:rid/manage/order",component:$}),r.a.createElement(u.a,{path:"/restaurant/:rid/manage/food",component:Z}),r.a.createElement(u.a,{path:"/restaurant/:rid/manage/desk",component:re}),r.a.createElement(u.a,{path:"/restaurant/:rid/manage/add-food",component:le}),r.a.createElement(u.a,{path:"/restaurant/:rid/manage/add-desk",component:ue})))))})),fe=Object(u.f)((function(e){var t=Object(n.useState)(),a=Object(s.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)(),i=Object(s.a)(l,2),u=i[0],f=i[1];function p(){return(p=Object(Q.a)(W.a.mark((function t(a){var n;return W.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.post("/login",{name:c,password:u});case 3:n=t.sent,e.history.push("/restaurant/".concat(n.data.id,"/manage/order")),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.dir(t.t0),alert(t.t0.response.data.msg);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}return r.a.createElement("div",{className:"login"},r.a.createElement("h2",null,"\u9910\u5385\u540e\u53f0\u7ba1\u7406"),r.a.createElement(G.a,{name:"name",placeholder:"\u7528\u6237\u540d",onChange:function(e){return o(e.target.value)}}),r.a.createElement(G.a.Password,{name:"password",placeholder:"\u5bc6\u7801",onChange:function(e){return f(e.target.value)}}),r.a.createElement(m.a,{type:"primary",onClick:function(e){return function(e){return p.apply(this,arguments)}(e)}},"\u767b\u9646"),r.a.createElement(T.a,{to:"/forget",className:"forgetLink"},"\u5fd8\u8bb0\u5bc6\u7801"),r.a.createElement(T.a,{to:"/register",className:"registerLink"},"\u6ce8\u518c"))})),pe=function(){var e=Object(n.useState)({}),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useRef)();return r.a.createElement("div",{className:"forgetPage"},r.a.createElement("h3",null,"\u90ae\u7bb1\u9a8c\u8bc1"),r.a.createElement(G.a,{type:"text",name:"email",placeholder:"\u8bf7\u8f93\u5165\u60a8\u7684\u90ae\u7bb1",onChange:function(e){return c({email:e.target.value})}}),r.a.createElement(m.a,{onClick:function(){d.post("/forget",a).then((function(e){o.current.innerHTML=e.data}))}},"\u786e\u8ba4"),r.a.createElement(m.a,{onClick:function(){C.push("/")}},"\u8fd4\u56de"),r.a.createElement("p",{ref:o}))};function he(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var Ee=function(){var e=Object(n.useState)({}),t=Object(s.a)(e,2),a=t[0],c=t[1];function o(e){c(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?he(a,!0).forEach((function(t){Object(q.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):he(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a,Object(q.a)({},e.target.name,e.target.value)))}return r.a.createElement("div",{className:"register"},r.a.createElement("h1",null,"\u7ba1\u7406\u5458\u6ce8\u518c"),r.a.createElement("form",{action:"/register",method:"post"},r.a.createElement(G.a,{type:"text",placeholder:"\u7528\u6237\u540d",name:"name",value:a.name,onChange:o}),r.a.createElement(G.a,{type:"text",placeholder:"\u90ae\u7bb1",name:"email",value:a.email,onChange:o}),r.a.createElement(G.a,{type:"password",placeholder:"\u5bc6\u7801",name:"password",value:a.password,onChange:o}),r.a.createElement(G.a,{type:"text",placeholder:"\u9910\u9986\u540d\u79f0",name:"title",value:a.title,onChange:o}),r.a.createElement(m.a,{onClick:function(){console.log(a),d.post("/register",a).then((function(e){C.push("/")}))}},"\u6ce8\u518c"),r.a.createElement(m.a,{onClick:function(){C.push("/")}},"\u8fd4\u56de\u4e3b\u9875")))},ge=function(e){return console.log(e),r.a.createElement("div",null,r.a.createElement("h2",null,"\u4e0b\u5355\u6210\u529f"),r.a.createElement("p",null,"\u603b\u4ef7\uff1a",e.location.state&&e.location.state.totalPrice))};var be=function(){return r.a.createElement(u.b,{history:C},r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/",exact:!0,component:fe}),r.a.createElement(u.a,{path:"/landing/r/:rid/d/:did",component:E}),r.a.createElement(u.a,{path:"/r/:rid/d/:did/c/:count",component:z}),r.a.createElement(u.a,{path:"/r/:rid/d/:did/order-success",component:ge}),r.a.createElement(u.a,{path:"/restaurant/:rid/manage",component:de}),r.a.createElement(u.a,{path:"/forget",component:pe}),r.a.createElement(u.a,{path:"/register",component:Ee})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(be,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[151,1,2]]]);
//# sourceMappingURL=main.97109535.chunk.js.map