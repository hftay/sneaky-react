import React from "react";
import "./offer.css";

class Offer extends React.Component {
	
	handleClick = () => {
		// Offer receives the selectOffer function (defined in App.js) as a prop // it also receives the 'offer' as a prop
		this.props.selectOffer(this.props.offer);
	}
	addToCart = () => {

		var params = new FormData() // FormData to pass params to Rails
    params.append('user_id', 1) // hardcoded
    params.append('offer_id', this.props.offer.id)
    
    const url = "http://localhost:3001/api/carts" 

		return fetch(url,{
			method: 'POST',
			body: params
		})
	}

	render(){
		const title = this.props.offer.name 
		const price = "$" + Number(this.props.offer.offer_price)

		const style = {    // template literals in ES6: ` ${} `
			backgroundImage: `url('${this.props.offer.image_url}')`
		};

		return(
				<div className="offer" >
					<div className="offer-picture"
						onClick={this.handleClick}
						style={style}>
					</div>
					<div className="offer-title">
						{price}
						<br />
						{title} 
					</div>
					<button
					onClick={this.addToCart}
					>add to cart</button>
				</div>	
			);
	}
}

export default Offer;