import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import FoodCart from './FoodCart-class';
import RestaurantManage from './RestaurantManage';
import Login from './Login';
import forget from './forget';
import register from './register';
import OrderSuccess from './OrderSuccess'
import history from './history'

function App() {
  return (
    <Router history={history}>
        <Switch>
          {/* <Route path="/" exact component={HomePage} /> */}
          <Route path="/" exact component={Login} />
          <Route path="/landing/r/:rid/d/:did" component={LandingPage} />
          <Route path="/r/:rid/d/:did/c/:count" component={FoodCart} />
          <Route path="/r/:rid/d/:did/order-success" component={OrderSuccess} />
          
          <Route path="/restaurant/:rid/manage" component={RestaurantManage} />
          <Route path="/forget" component={forget} />
          <Route path="/register" component={register} />
        </Switch>
    </Router>
  );
}

export default App;
