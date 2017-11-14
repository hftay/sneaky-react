import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import logo from './logo.svg';
import './App.css';
import Offer from './components/offer';
import Marker from './components/marker';

class App extends Component {
  constructor(props){
    super(props);
    this.selectOffer = this.selectOffer.bind(this)
    this.state = {
      offers: [],
      allOffers: [], // hack to make search functionality work: to avoid losing offers when doing regex, allows you to have two copies of offers in your app
      selectedOffer: null,
      search: ''
    };
  }

  componentDidMount(){ // this is a react built-in function, checks if...
    console.log("I'm mounted here!");
    // const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json"
    // const url = "http://localhost:3001/api/offers" 
    // const url = "/api/offers" // added in package.json... "proxy": "http://localhost:3001"
    const url = "https://raw.githubusercontent.com/hftay/sneaky-rails/master/offers.json"

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

  // selectOffer = (offer) => {
  //   console.log(offer);
  //   this.setState({
  //     selectedOffer: offer
  //   })
  // }
  // is the same as writing the below + this.selectOffer = this.selectOffer.bind(this) in constuctor()
  selectOffer(offer){
    console.log(offer);
    this.setState({ selectedOffer: offer })
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
      lat: 48.8566,
      lng: 2.3522
    }

    if (this.state.selectedOffer){
      center = {
        lat: this.state.selectedOffer.latitude,
        lng: this.state.selectedOffer.longitude
      }
    }

    // passing in heaps of props to the component
    return (
      <div className="app">
        <div className="main">
          <div className="search">
            <input 
              type="text"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch}/>
          </div>
          <div className="offers">
            {this.state.offers.map((offer, index)=>{
              return <Offer 
                key={index} 
                offer={offer}
                selectOffer={this.selectOffer} />
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            center={center}
            zoom={12}>
            {this.state.offers.map((offer, index)=>{
              return <Marker 
              key={index} 
              lat={offer.latitude}
              lng={offer.longitude}
              text={offer.offer_price}
              selected={offer === this.state.selectedOffer} />
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
