import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Signup from './signup';

class Login extends React.Component {

	  constructor(props) {
  	super(props)
		this.state = {
			username: '',
			email: '',			
			password: ''
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		
		var params = new FormData() // FormData to pass params to Rails
    params.append('email', this.state.email)    
    // params.append('password_digest', this.state.password)
    
    // clear input fields
		this.setState({ email: '', password: '' })

    // const url = "http://localhost:3001/users" 
		const url = "https://sneaky-rails.herokuapp.com/users"

		return fetch(url,{
			method: 'POST',
			body: params
		})
		// .then(alert('signup was a great success!'))
		// .catch(error => console.log(error.message));
		.then(res => res.json())
    .then(data => console.log('signup attempted: ' + data.msg))
	}

	emailChange = (event) => {
		this.setState({ email: event.target.value })
		console.log( this.state.email )
	}
	passwordChange = (event) => {
		this.setState({ password: event.target.value })
		console.log( this.state.password )
	}	

	render(){
		return (
			<HashRouter><div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text"
	          onChange={this.emailChange}
						value={this.state.email} 
						required="required" 						
						placeholder="email"/>
						<br /><br />
					<input 
						type="password"
	          onChange={this.passwordChange}
						value={this.state.password} 
						required="required"							          						
						placeholder="password"/>
						<br /><br />
					<button>Login</button>
				</form>
				<br /><br />

        <NavLink to="/signup">Sign Up</NavLink>
        <Route path="/signup" component={Signup}/>

			</div></HashRouter>
		)
	}
}

export default Login;