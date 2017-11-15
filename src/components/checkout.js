import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

// import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'EUR';

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

// const url = "/charges/new" // added localhost proxy in package.json
const url = "http://localhost:3001/charges" // added localhost proxy in package.json
// const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' ? 'herokuapp' : 'http://localhost:3001';

// const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' ? 'pk_live_MY_PUBLISHABLE_KEY' : process.env.STRIPE_TEST_PUBLISHABLE_KEY ;
// const STRIPE_PUBLISHABLE = process.env.STRIPE_TEST_PUBLISHABLE_KEY ;
// debugger

const onToken = (amount, description) => token =>
{
	var data = new FormData()
	data.append('source', token.id)
	data.append('amount', 50000)

  return fetch(url,{
  	method: 'POST',
    body: data
    // amount: fromEuroToCent(5000)  	
  })
  	.then(res => res.json())
  	.then(data => console.log(data))
}
  // .then(successPayment)
    // .catch(errorPayment);

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
  	amount={50000}
    token={onToken(amount, description)}
    stripeKey='pk_test_oN5PrweDu8VpLHbb5rUD5x16'
  />

    // name={name}
    // description={description}
    // amount={fromEuroToCent(amount)}
    // currency={CURRENCY}

// class Checkout extends React.Component {
// 	render(){
// 		return (
// 			<div>
// 				<h1>Stripe Payment API</h1>
// 				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores ea deserunt, minima voluptatem quasi repellat vitae illo, eaque neque impedit, fugit pariatur, obcaecati harum illum. Sunt, nesciunt dolores velit.
// 				</p>
// 				<form action="/your-server-side-code" method="POST">
// 					<script
// 					  src="https://checkout.stripe.com/checkout.js" className="stripe-button"
// 					  data-key="pk_test_oN5PrweDu8VpLHbb5rUD5x16"
// 					  data-amount="2000"
// 					  data-name="Demo Site"
// 					  data-description="2 widgets"
// 					  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
// 					  data-locale="auto"
// 					  data-zip-code="true"
// 					  data-currency="aud">
// 					</script>
// 				</form>
// 			</div>
// 		)
// 	}
// }

export default Checkout;