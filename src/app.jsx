"use strict";

var React = require('react');
var Map = require('./Map.jsx');

var MapContainer = React.createClass({
  getInitialState: function() {
    return {
      zoom: 4,
      center: {lat: 40, lng: -95}
    }
  },
  render: function() {
    return (
      <Map {...this.state}/>
    );
  }
});

React.render(<MapContainer/>, document.body);
