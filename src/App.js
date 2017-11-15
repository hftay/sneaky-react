import React, { Component } from 'react';
import {Route, NavLink, HashRouter } from 'react-router-dom';
import Login from './components/login';
import Payment from './components/payment';
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
      allOffers: [], // hack to make search functionality work
      selectedOffer: null,
      search: ''
    };
  }

  componentDidMount(){ // react built-in function
    console.log("I'm mounted here!");
    const url = "/api/offers" // added localhost proxy in package.json
    // const url = "https://raw.githubusercontent.com/hftay/sneaky-rails/master/offers.json"

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
  // is the same as writing the below + this.selectOffer = this.selectOffer.bind(this) in constuctor()
  // selectOffer(offer){
  //   console.log(offer);
  //   this.setState({ selectedOffer: offer })
  // }

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
      <HashRouter> 
       
        <div className="app">

          <div className="header">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/cart">Cart</NavLink>
          </div>
          <div className="content">
            <Route path="/login" component={Login}/>
            <Route path="/cart" component={Payment}/>
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
        </div>

      </HashRouter> 
    );
  }
}

export default App;
