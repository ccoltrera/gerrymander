"use strict";

var React = require('react');
// var Map = require('./Map.jsx');

// var MapContainer = React.createClass({

//   getInitialState: function() {
//     return {
//       center: {
//         lat: 0,
//         lng: 0
//       },
//       zoom: 0
//     }
//   },
//   render: function() {
//     return (
//       <Map {...this.state}/>
//     );
//   }
// });

// React.render(<MapContainer/>, document.body);

var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyDGaEYHC5Zu03udg2F_vYLvvL75H3zout8';

var Map = React.createClass({
  google: null,
  map: null,
  loadGoogleMapsAPI: function() {
    GoogleMapsLoader.load(function(google) {
      console.log('load callback')
      this.google = google;
      this.setState({
        googleLoaded: true
      });
      this.loadMap();
    }.bind(this));
  },
  loadMap: function() {
    var self = this;
    var el = React.findDOMNode(this.refs.map);
    this.map = new this.google.maps.Map(el, {
      center: {lat: -34.397, lng: 150.644}, zoom: 8
    });
    this.setState({
      mapLoaded: true
    });
  },
  getInitialState: function() {
    return {
      googleLoaded: false,
      mapLoaded: false
    };
  },
  componentWillMount: function() {
    this.loadGoogleMapsAPI();
  },
  render: function() {
    var html = <div ref="map"></div>;
    // return this.googleLoaded ? html : <p>Loading map...</p>;
    return html;
  }
});

React.render(<Map/>, document.body);
