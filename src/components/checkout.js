import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends React.Component {

  onToken = (token) => {
    var params = new FormData() // FormData to pass params to Rails
    params.append('source', token.id)
    params.append('amount', 100) // hardcoding for now
    params.append('currency', 'aud') // hardcoding for now
    // params.append('description', "a very good deal...")     

    // const url = "http://localhost:3001/charges" 
    const url = "https://sneaky-rails.herokuapp.com/charges"
    
    return fetch(url,{
      method: 'POST',
      body: params
    }).then(res => res.json())
      .then(data => console.log(data))
  }

  render(){
    return (
      <div>
        <h1>Payment</h1>
        <StripeCheckout
          token={this.onToken}
          stripeKey='pk_test_oN5PrweDu8VpLHbb5rUD5x16'
        />
      </div>
    )
  }
}

export default Checkout;