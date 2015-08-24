var React = require('react');
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyDGaEYHC5Zu03udg2F_vYLvvL75H3zout8';

var Map = React.createClass({
  google: null,
  map: null,
  loadGoogleMapsAPI: function() {
    GoogleMapsLoader.load(function(google) {
      this.google = google;
      this.loadMap();
    }.bind(this));
  },
  loadMap: function() {
    var el = React.findDOMNode(this.refs.map);
    var map = new this.google.maps.Map(el, this.props);
    this.setState({
      map: map
    });
  },
  getInitialState: function() {
    return {
      map: null
    };
  },
  componentWillMount: function() {
    this.loadGoogleMapsAPI();
  },
  render: function() {
    return <div ref="map"></div>;
  }
});

module.exports = Map;
