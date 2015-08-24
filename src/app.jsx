"use strict";

var React = require('react');
var Map = require('./Map.jsx');

var MapContainer = React.createClass({
  getInitialState: function() {
    return {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 0
    }
  },
  render: function() {
    return (
      <Map {...this.state}/>
    );
  }
});

React.render(<MapContainer/>, document.body);
