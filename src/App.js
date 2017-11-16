import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
// import logo from './logo.svg';
import './App.css';
import Offer from './components/offer';
import Marker from './components/marker';
import Navbar from './components/navbar';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      offers: [],
      allOffers: [], // hack to make search functionality work
      selectedOffer: null,
      search: ''
    };
  }

  componentDidMount(){ // react built-in function
    // console.log("I'm mounted here!");
    const url = "https://sneaky-rails.herokuapp.com/api/offers"
    // const url = "http://localhost:3001/api/offers" 
    // added localhost proxy in package.json

    fetch(url) // AJAX
      .then(response => response.json()) // converts raw string to json format
      .then((data)=>{ // the callback
        console.log(data);
        this.setState({ 
          offers: data,
          allOffers: data
        }) // update state
      })
  }

  selectOffer = (offer) => {
    console.log(offer);
    this.setState({
      selectedOffer: offer
    })
  }

  handleSearch = (event) => {
    console.log(event.target.value);
    this.setState({ 
      search: event.target.value,
      offers: this.state.allOffers.filter((offer)=>new RegExp(event.target.value,"i").exec(offer.name))
    });
  }

  render() {
    let center = {
      lat: -37.815,
      lng: 144.946
    }

    if (this.state.selectedOffer){
      center = {
        lat: this.state.selectedOffer.latitude,
        lng: this.state.selectedOffer.longitude
      }
    }


    return (
      <div className="app">

        <Navbar />

        <div className="map">
          <GoogleMapReact
            center={center}
            zoom={12}>
            {this.state.offers.map((offer, index)=>{
              // const discount = Number( (offer.offer_price/offer.normal_price) *100).toFixed(2)
              return <Marker 
              key={index}
              bootstrapURLKeys={{
                    key: 'AIzaSyAijWFPCoiUPmD1AcQEeuJa5QZvy8s72Sc'
                }} 
              lat={offer.latitude}
              lng={offer.longitude}
              text={`$${Number(offer.offer_price)}`}
              selected={offer === this.state.selectedOffer} />
            })}
          </GoogleMapReact>
        </div>

        <div className="main">
          <div className="search">
            <input 
              type="text"
              placeholder="Search"
              value={this.state.search}
              onChange={this.handleSearch} />
          </div>
          <div className="offers">
            {this.state.offers.map((offer, index)=>{
              return <Offer key={offer.id} 
                offer={offer}
                selectOffer={this.selectOffer} />
            })}
          </div>
        </div>

      </div>

    );
  }
}

export default App;
