import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Login from './login';
import Checkout from './checkout';
import App from './../App';

import './navbar.css';

class Navbar extends React.Component {
	render(){
		return (
			<HashRouter> 
				<div className="nav">
       
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>          
            <li><NavLink to="/login">Login</NavLink></li>
          	<li><NavLink to="/cart">Cart</NavLink></li>
          </ul>

          <div className="content">
            <Route path="/login" component={Login}/>
          	<Route path="/cart" component={Checkout}/>
          </div>

				</div>
			</HashRouter> 

		)
	}
}

export default Navbar;