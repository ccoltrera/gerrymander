var React = require('react');
var RightSideInfoContainer = require('./RightSideInfoContainer.jsx');
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

  loadMap: function() {

    var el = React.findDOMNode(this.refs.map);
    var map = new this.props.google.maps.Map(el, this.props.mapDefaults);
    map.setOptions({styles: styles});
    map.data.loadGeoJson('cd113.json');
    map.data.setStyle(function(feature) {
      var color, fillOpacity;
      var repdata = this.props.repdata;
      var rep = repdata[ FIPS[feature.G.STATEFP] + feature.G.CD113FP];
      color = (rep) ? (
        (rep.party === 'Republican') ? 'red' : 'blue'
      ) : 'gray' ;

      if (feature.getProperty('selected')) {
        color = 'white';
        fillOpacity = 0.75;
      }

      return ({
        fillOpacity: fillOpacity,
        fillColor: color,
        strokeColor: 'white',
        strokeWeight: 0.5
      });
    }.bind(this));
    map.data.addListener('click', function(event) {
      if (this.state.selected) this.state.selected.setProperty('selected', false);
      event.feature.setProperty('selected', true);
      this.setState({
        selected: event.feature
      });
      console.log("District: " + event.feature.G.CD113FP);
      console.log("State: " + FIPS[event.feature.G.STATEFP]);
    }.bind(this));
    map.data.addListener('mouseover', function(event) {
      map.data.revertStyle();
      map.data.overrideStyle(event.feature, {strokeWeight: 2});
    });
    map.data.addListener('mouseout', function(event) {
      map.data.revertStyle();
    });
    this.setState({
      map: map
    });
  },
  getInitialState: function() {
    return {
      map: null,
    };
  },
  componentDidMount: function() {
    this.loadMap();
  },
  render: function() {
    return (
      <main>
        <div id="map" ref="map"></div>
        <RightSideInfoContainer />
      </main>
    );
  }
});

module.exports = Map;
