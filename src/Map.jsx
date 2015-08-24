var React = require('react');
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyDGaEYHC5Zu03udg2F_vYLvvL75H3zout8';

var Map = React.createClass({
  google: null,
  map: null,
  loadGoogleMapsAPI: function() {
    GoogleMapsLoader.load(function(google) {
      this.google = google;
      this.setState({
        googleLoaded: true
      });
      this.loadMap();
    }.bind(this));
  },
  loadMap: function() {
    var self = this;
    this.map = new this.google.maps.Map(this.refs.map.getDOMNode(), {
      center: {lat: -34.397, lng: 150.644}, zoom: 8
    });
  },
  getInitialState: function() {
    return {
      googleLoaded: false
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

module.exports = Map;
