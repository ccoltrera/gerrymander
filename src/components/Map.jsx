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

var InfoFrame = require('./InfoFrame.jsx');
var NavFrame = require('./NavFrame.jsx');

var MapComponent = React.createClass({
  closeFrame: function() {
    var oldDistrict = this.state.district;
      if (oldDistrict) oldDistrict.setStyle({
        fillColor: this.getColor(oldDistrict.feature.properties.STATEFP, oldDistrict.feature.properties.CD113FP)
    });
    this.setState({
      district: null,
      infoType: ""
    });
  },
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
    function targetToCenter(target) {
      if (target.feature.properties.STATEFP === '02') {
        return new leaflet.LatLng(64 , -149)
      } else {
        var bounds = target.getBounds();
        var nelat = bounds._northEast.lat,
        swlat = bounds._southWest.lat,
        nelng = bounds._northEast.lng,
        swlng = bounds._southWest.lng;

        var nelatrad = nelat * Math.PI / 180,
        swlatrad = swlat * Math.PI / 180,
        nelngrad = nelng * Math.PI / 180,
        swlngrad = swlng * Math.PI / 180;

        var Bx = Math.cos(nelatrad) * Math.cos(swlngrad-nelngrad);
        var By = Math.cos(nelatrad) * Math.sin(swlngrad-nelngrad);
        var cntlatrad = Math.atan2(Math.sin(swlatrad) + Math.sin(nelatrad), Math.sqrt((Math.cos(swlatrad)+Bx)*(Math.cos(swlatrad)+Bx) + By*By ));
        var cntlngrad = nelngrad + Math.atan2(By, Math.cos(swlatrad) + Bx);

        return new leaflet.LatLng(cntlatrad / Math.PI * 180 , cntlngrad / Math.PI * 180);
      }
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
              var mapSize = leafletMap.getSize();
              var sidebarWidth = (this.state.infoType || this.state.district) ? mapSize.x * 0.30 : 0;
              var sidebarHeight = (this.state.infoType || this.state.district) ? 185 : 0;
              var adjPoint = mapSize.x > 600 ? (
                  leafletMap.project( targetToCenter(e.target) , leafletMap.getZoom() ).add([sidebarWidth / 2, 0])
                ) : (
                  leafletMap.project( targetToCenter(e.target) , leafletMap.getZoom() ).add([0, sidebarWidth / 2])
                );
              var adjLatLng = leafletMap.unproject(adjPoint);
              leafletMap.setView( adjLatLng );
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
    var infoFrame = this.state.district && this.state.infoType
    var map = (
      <main id="main-container">
        <Map id="map" ref="map" center={this.props.mapDefaults.center} zoom={this.props.mapDefaults.zoom}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {gJ}
        </Map>
        <InfoFrame district={this.state.district} infoType={this.state.infoType} closeFrame={this.closeFrame} repdata={this.props.repdata}/>
        <NavFrame selectInfoType={this.selectInfoType} infoType={this.state.infoType}/>
      </main>
    );

    return  map;
  }
});

module.exports = MapComponent;
