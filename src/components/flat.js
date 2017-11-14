import React from "react";
import "./flat.css"; //webpack will import

class Flat extends React.Component {
	
	handleClick = () => {
		// call the parent method selectFlat
		// the Flat Component does not know about the click event because the Flat component does not know about the external wall, pass a proxy
		this.props.selectFlat(this.props.flat);
	}

// var handleClick = function(){
//   return something
// }
// function handleClick(){	
//   return something
// }

	render(){
		const title = this.props.flat.price 
		+ this.props.flat.priceCurrency
		+ "-"
		+ this.props.flat.name 

		const style = {    // template literals in ES6: ` ${} `
			backgroundImage: `url('${this.props.flat.imageUrl}')`
		};

		return(
				<div className="flat" onClick={this.handleClick}>
					<div className="flat-picture"
						style={style}>
					</div>
					<div className="flat-title">
						{title}
					</div>
				</div>	
			);
	}
}

export default Flat;