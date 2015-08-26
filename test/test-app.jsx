"use strict";

var React = require('react');
var HeaderContainer = require('../src/HeaderContainer.jsx');
var MapComponent = require('./test-MapComponent.jsx');
var superagent = require('superagent');

var MapContainer = React.createClass({
  loadDistricts: function() {
    superagent
      .get('cd113.json')
      .end(function(err, res) {
        this.setState({
          districts: res.body
        });
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
  getInitialState: function() {
    return {
      districts: null,
      repdata: null,
      mapDefaults: {
        zoom: 5,
        center: {lat: 40, lng: -95}
      }
    }
  },
  componentDidMount: function() {
    this.loadDistricts();
    this.loadRepData();
  },
  render: function() {
    var mapComponent = <MapComponent {...this.state}/>;
    var loadingDisplay = <p>loading map...</p>;
    return (
      <div className="wrapper">
        <HeaderContainer />
        {this.state.districts && this.state.repdata ? mapComponent : loadingDisplay}
      </div>
    );

  }
});

React.render(<MapContainer/>, document.body);

