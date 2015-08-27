'use strict';
var React = require('react');
var censusData = require('../util/cen-rep-rep');
var data = ['INFO', 'MONEY', 'EDUCATION', 'PEOPLE', 'ELECTIONS'];
var statesByFIPS = require('../data/statesByFIPS');
var InfoDisplay = require('./InfoDisplay.jsx');
var MoneyDisplay = require('./MoneyDisplay.jsx');
var EducationDisplay = require('./EducationDisplay.jsx');
var PeopleDisplay = require('./PeopleDisplay.jsx');
var ElectionsDisplay = require('./ElectionsDisplay.jsx');

var InfoFrame = React.createClass({

  render: function() {
    if (!this.props.district || !this.props.infoType) {
      return <section id="info-frame"></section>;
    }
    var displayElement;
    var state = statesByFIPS[this.props.district.feature.properties.STATEFP];
    var districtName = this.props.district.feature.properties.NAMELSAD;

    switch (this.props.infoType) {
      case 'INFO':
        displayElement = <InfoDisplay district={this.props.district.feature.properties}/>;
        break;
      case 'MONEY':
        displayElement = <MoneyDisplay district={this.props.district.feature.properties}/>;
        break;
      case 'EDUCATION':
        displayElement = <EducationDisplay district={this.props.district.feature.properties}/>;
        break;
      case 'PEOPLE':
        displayElement = <PeopleDisplay district={this.props.district.feature.properties}/>;
        break;
      case 'ELECTIONS':
        displayElement = <ElectionsDisplay district={this.props.district.feature.properties}/>;
        break;
      default:
        displayElement = <p>Error loading component</p>;
    }

    return (
      <section id="info-frame">
        <h2>{state + " " + districtName}</h2>
        {displayElement}
      </section>
    );
  }
});

module.exports = InfoFrame;
