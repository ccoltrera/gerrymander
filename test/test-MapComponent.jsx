'use strict';
var React = require('react');
var leaflet = require('leaflet');
var rL = require('react-leaflet');
var Map = rL.Map;
var Marker = rL.Marker;
var Popup = rL.Popup;
var TileLayer = rL.TileLayer;
var GeoJson = rL.GeoJson;

var superagent = require('superagent');
var FIPS = require('../data/FIPS');

var InfoDisplay = require('../src/InfoDisplay.jsx');
var NavFrame = require('../src/NavFrame.jsx');

var MapComponent = React.createClass({
  selectInfoType: function(infoType) {
    this.setState({
      infoType: infoType
    });
  },
  getColor: function(STATEFP, CD113FP) {
    var color;
    var repdata = this.props.repdata;
    var rep = repdata[ FIPS[STATEFP] + CD113FP];
    color = (rep) ? (
      (rep.party === 'Republican') ? 'red' : 'blue'
    ) : 'gray' ;
    return color;
  },
  getStyle: function(feature) {
    return {
      fillColor: this.getColor(feature.properties.STATEFP, feature.properties.CD113FP),
      fillOpacity: 0.5,
      color: 'white',
      weight: 1.5
    };
  },
  getInitialState: function() {
    return ({
      district: null,
      infoType: ""
    })
  },
  render: function() {
    var selectDistrict = function(district) {
      var oldDistrict = this.state.district;
      if (oldDistrict) oldDistrict.setStyle({
        fillColor: this.getColor(oldDistrict.feature.properties.STATEFP, oldDistrict.feature.properties.CD113FP)
      });
      district.setStyle({
        fillColor: 'white'
      });
      this.setState({
        district: district
      })
    }.bind(this);
    function boundsToCenter(bounds) {
      var lat = (bounds._northEast.lat + bounds._southWest.lat) / 2;
      var lng = (bounds._northEast.lng + bounds._southWest.lng) / 2;
      return new leaflet.LatLng(lat, lng);
    }
    var gJ = this.props.districts ? (
      <GeoJson
        ref="GeoJson"
        repdata={this.props.repdata}
        data={this.props.districts}
        style={this.getStyle}
        onEachFeature={
          function(feature, layer) {
            layer.on('click', function(e) {
              selectDistrict(e.target);
              var leafletMap = this.refs.map.leafletElement;
              // leafletMap.fitBounds(e.target.getBounds());
              leafletMap.panTo( boundsToCenter(e.target.getBounds()) );
            }.bind(this));
            layer.on('mouseover', function(e) {
              e.target.setStyle({
                weight: 3
              });
            });
            layer.on('mouseout', function(e) {
              e.target.setStyle({
                weight: 1.5
              });
            });
          }.bind(this)
        }
      />
    ) : null;
    var leafletGJ = gJ ? gJ.leafletElement : null;
    var map = (
      <main>
        <Map id="map" ref="map" center={this.props.mapDefaults.center} zoom={this.props.mapDefaults.zoom}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {gJ}
        </Map>
        <InfoDisplay district={this.state.district} infoType={this.state.infoType}/>
        <NavFrame selectInfoType={this.selectInfoType}/>
      </main>
    );

    return  map;
  }
});

module.exports = MapComponent;
