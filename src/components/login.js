import React from 'react';

class Login extends React.Component {
	render(){
		return (
			<div>
				<h1>Login</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores ea deserunt, minima voluptatem quasi repellat vitae illo, eaque neque impedit, fugit pariatur, obcaecati harum illum. Sunt, nesciunt dolores velit.</p>
				<input type="text" placeholder="username"/>
				<input type="password" placeholder="password"/>
				<button>Login</button>
    		<a href="">Sign Up</a>
			</div>
		)
	}
}

export default Login;