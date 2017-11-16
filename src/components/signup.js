import React from 'react';

class Signup extends React.Component {
	
  constructor(props) {
  	super(props)
		this.state = {
			username: '',
			email: '',			
			password: '',
			message: ''
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		
		var params = new FormData() // FormData to pass params to Rails
    params.append('username', this.state.username)
    params.append('email', this.state.email)    
    // params.append('password_digest', this.state.password)
    
    const url = "https://sneaky-rails.herokuapp.com/users" 
    // const url = "http://localhost:3001/users" 

		return fetch(url,{
			method: 'POST',
			body: params
		})
		// .catch(error => console.log(error.message));
		.then(res => res.json())
    // .then(data => console.log('signup attempted: ' + data.msg))
    .then(data => {
    	console.log('signup attempted: ' + data.msg);
    	this.setState({
    		message: `${data.msg}, ${this.state.username}!`,
    		username: '', // clear input fields 
    		email: '', 
    		password: ''
    	})
    })
	}

	usernameChange = (event) => {
		this.setState({ username: event.target.value })
		console.log( this.state.username )
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
			<div>
				<h1>Signup</h1>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text"
	          onChange={this.usernameChange}
						value={this.state.username} 
						required="required" 						
						placeholder="username"/>
					<br /><br />
					<input 
						type="email"
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
					<button>Signup</button>
					<br /><br />
					<div>
						{this.state.message}
					</div>
				</form>
			</div>
		)
	}
}

export default Signup;