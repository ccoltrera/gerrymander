"use strict";

var React = require('react');
var HeaderContainer = require('./HeaderContainer.jsx');
var Map = require('./Map.jsx');
var FooterContainer = require('./FooterContainer.jsx');

var MapContainer = React.createClass({
  getInitialState: function() {
    return {
      zoom: 5,
      center: {lat: 40, lng: -95}
    }
  },
  render: function() {
    return (
      <div className="wrapper">
        <HeaderContainer />
        <Map {...this.state} />
        <FooterContainer />
      </div>
    );
  }
});

React.render(<MapContainer/>, document.body);
