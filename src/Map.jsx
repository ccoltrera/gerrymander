var React = require('react');
var superagent = require('superagent');
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyDGaEYHC5Zu03udg2F_vYLvvL75H3zout8';
var FIPS = require('../data/FIPS');

var styles = [
  {
    stylers: [
      { visibility: "simplified" },
      { saturation: -20 }
    ]
  },{
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { color: "#999999" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "landscape",
    stylers: [
      { visibility: "off" }
    ]
  }
];

var Map = React.createClass({
  google: null,
  loadGoogleMapsAPI: function() {
    GoogleMapsLoader.load(function(google) {
      this.google = google;
      this.loadMap();
    }.bind(this));
  },
  loadRepData: function() {
    superagent
      .get('https://www.govtrack.us/api/v2/role?current=true&role_type=representative&limit=500')
      .end(function(err, res) {
        var output = {};
        for (var i=0; i<res.body.objects.length; i++) {
          if (String(res.body.objects[i].district).length == 1) {
            output[res.body.objects[i].state + '0' + res.body.objects[i].district] = res.body.objects[i];
          } else {
            output[res.body.objects[i].state + res.body.objects[i].district] = res.body.objects[i];
          }
        }
        this.setState({
          repdata: output
        });
      }.bind(this));
  },
  loadMap: function() {
    var el = React.findDOMNode(this.refs.map);
    var map = new this.google.maps.Map(el, this.props);
    map.setOptions({styles: styles});
    map.data.loadGeoJson('cd113.json');
    map.data.setStyle(function(feature) {
      var color;
      var repdata = this.state.repdata;
      (repdata && repdata[ FIPS[feature.G.STATEFP] + feature.G.CD113FP]) ? (
        color = (repdata[ FIPS[feature.G.STATEFP] + feature.G.CD113FP].party === 'Republican') ? 'red' : 'blue'
      ) : (
        color = 'gray'
      );

      return ({
        fillColor: color,
        strokeColor: 'white',
        strokeWeight: 0.5
      });
    }.bind(this));
    map.data.addListener('click', function(event) {
      console.log("District: " + event.feature.G.CD113FP);
      console.log("State: " + FIPS[event.feature.G.STATEFP]);
    });
    this.setState({
      map: map
    });
  },
  getInitialState: function() {
    return {
      map: null,
      repdata: {}
    };
  },
  componentWillMount: function() {
    this.loadGoogleMapsAPI();
    this.loadRepData();
  },
  render: function() {
    return <div id="map" ref="map"></div>;
  }
});

module.exports = Map;
