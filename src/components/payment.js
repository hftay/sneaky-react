import React from 'react';

class Payment extends React.Component {
	render(){
		return (
			<div>
				<h1>Stripe Payment API</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores ea deserunt, minima voluptatem quasi repellat vitae illo, eaque neque impedit, fugit pariatur, obcaecati harum illum. Sunt, nesciunt dolores velit.
				</p>
				<form action="/your-server-side-code" method="POST">
					<script
					  src="https://checkout.stripe.com/checkout.js" className="stripe-button"
					  data-key="pk_test_oN5PrweDu8VpLHbb5rUD5x16"
					  data-amount="2000"
					  data-name="Demo Site"
					  data-description="2 widgets"
					  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
					  data-locale="auto"
					  data-zip-code="true"
					  data-currency="aud">
					</script>
				</form>
			</div>
		)
	}
}

export default Payment;