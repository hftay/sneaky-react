import React from "react";
import "./offer.css";

class Offer extends React.Component {
	
	handleClick = () => {
		// call the parent method selectOffer which is passed in
		this.props.selectOffer(this.props.offer);
	}

// var handleClick = function(){
//   return something
// }
// function handleClick(){	
//   return something
// }

	render(){
		const title = "$" + Number(this.props.offer.offer_price) 
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