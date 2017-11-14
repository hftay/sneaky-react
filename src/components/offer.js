import React from "react";
import "./offer.css"; //webpack will import

class Offer extends React.Component {
	
	handleClick = () => {
		// call the parent method selectOffer
		// the Offer Component does not know about the click event because the Offer component does not know about the external wall, pass a proxy
		this.props.selectOffer(this.props.offer);
	}

// var handleClick = function(){
//   return something
// }
// function handleClick(){	
//   return something
// }

	render(){
		const title = "$" + this.props.offer.offer_price 
		+ "	"
		+ this.props.offer.name 

		const style = {    // template literals in ES6: ` ${} `
			backgroundImage: `url('${this.props.offer.image_url}')`
		};

		return(
				<div className="offer" onClick={this.handleClick}>
					<div className="offer-picture"
						style={style}>
					</div>
					<div className="offer-title">
						{title}
					</div>
				</div>	
			);
	}
}

export default Offer;