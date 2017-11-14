import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import logo from './logo.svg';
import './App.css';
import Flat from './components/flat';
import Marker from './components/marker';

class App extends Component {
  constructor(props){
    super(props);
    this.selectFlat = this.selectFlat.bind(this)
    this.state = {
      flats: [],
      allFlats: [], // hack to make search functionality work: to avoid losing flats when doing regex, allows you to have two copies of flats in your app
      selectedFlat: null,
      search: ''
    };
  }

  componentDidMount(){ // this is a react built-in function, checks if...
    console.log("I'm mounted here!");
    const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json" 
    fetch(url) // AJAX
      .then(response => response.json()) // function to return "response"(raw string) to json format
      .then((data)=>{ // the callback
        console.log(data);
        this.setState({ 
          flats: data,
          allFlats: data
        }) // update state
      })
  }

  // selectFlat = (flat) => {
  //   console.log(flat);
  //   this.setState({
  //     selectedFlat: flat
  //   })
  // }
  // is the same as writing the below + this.selectFlat = this.selectFlat.bind(this) in constuctor()
  selectFlat(flat){
    console.log(flat);
    this.setState({ selectedFlat: flat })
  }

  handleSearch = (event) => {
    console.log(event.target.value);
    this.setState({ 
      search: event.target.value,
      flats: this.state.allFlats.filter((flat)=>new RegExp(event.target.value,"i").exec(flat.name))
    });
  }

  render() {
    let center = {
      lat: 48.8566,
      lng: 2.3522
    }

    if (this.state.selectedFlat){
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
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
          <div className="flats">
            {this.state.flats.map((flat, index)=>{
              return <Flat 
                key={index} 
                flat={flat}
                selectFlat={this.selectFlat} />
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            center={center}
            zoom={12}>
            {this.state.flats.map((flat, index)=>{
              return <Marker 
              key={index} 
              lat={flat.lat}
              lng={flat.lng}
              text={flat.price}
              selected={flat === this.state.selectedFlat} />
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
