"use strict";

var React = require('react');
var HeaderContainer = require('./components/HeaderContainer.jsx');
var Map = require('./components/Map.jsx');
var superagent = require('superagent');
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyDGaEYHC5Zu03udg2F_vYLvvL75H3zout8';

var MapContainer = React.createClass({
  loadGoogleMapsAPI: function() {
    GoogleMapsLoader.load(function(google) {
      this.setState({
        google: google
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
      google: null,
      repdata: null,
      mapDefaults: {
        zoom: 5,
        center: {lat: 40, lng: -95}
      }
    }
  },
  componentDidMount: function() {
    this.loadGoogleMapsAPI();
    this.loadRepData();
  },
  render: function() {
    var mapComponent = <Map {...this.state}/>;
    var loadingDisplay = <p>loading map...</p>;
    return (
      <div className="wrapper">
        <HeaderContainer />
        {this.state.google && this.state.repdata ? mapComponent : loadingDisplay}
      </div>
    );

  }
});

React.render(<MapContainer/>, document.body);
