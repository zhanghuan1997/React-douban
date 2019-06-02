import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Logo from './logo/logo'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Detail from './detail/detail';
import Denglu from './denglu/denglu';
import Zhuce from './zhuce/zhuce';
import Shop from './shop/shop';



ReactDOM.render(
	<BrowserRouter>
	    <Switch>
	      <Route path="/main" component={Logo} />
	      <Route path="/detail/:id" component={Detail} />
	      <Route path="/denglu" component={Denglu} />
	      <Route path="/zhuce" component={Zhuce} />
	      <Route path="/shop" component={Shop} />
	      <Redirect to="/main" />
	    </Switch>
    </BrowserRouter>,
  document.getElementById('app')
);
