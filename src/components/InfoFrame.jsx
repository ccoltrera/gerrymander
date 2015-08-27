'use strict';
var React = require('react');
var data = ['INFO', 'MONEY', 'EDUCATION', 'PEOPLE', 'ELECTIONS'];
var statesByFIPS = require('../data/statesByFIPS');
var InfoDisplay = require('./InfoDisplay.jsx');
var MoneyDisplay = require('./MoneyDisplay.jsx');
var EducationDisplay = require('./EducationDisplay.jsx');
var RaceDisplay = require('./RaceDisplay.jsx');
var ElectionsDisplay = require('./ElectionsDisplay.jsx');
var superagent = require('superagent');

var InfoFrame = React.createClass({
  componentWillMount: function() {
    superagent
      .get('results_2012.json')
      .end(function(err, res) {
        this.setState({
          elections: res.body
        });
      }.bind(this))
  },
  render: function() {
    if (!this.props.district && !this.props.infoType) {
      return <section id="info-frame"></section>;
    } else if (!this.props.district || !this.props.infoType) {
      return (
        <section className="active" id="info-frame">
          <p>Learn to use this app!</p>
        </section>
      );
    }
    var displayElement;
    var state = statesByFIPS[this.props.district.feature.properties.STATEFP];
    var districtName = this.props.district.feature.properties.NAMELSAD;

    switch (this.props.infoType) {
      case 'INFO':
        displayElement = <InfoDisplay district={this.props.district.feature} repdata={this.props.repdata}/>;
        break;
      case 'MONEY':
        displayElement = <MoneyDisplay district={this.props.district.feature.properties}/>;
        break;
      case 'EDUCATION':
        displayElement = <EducationDisplay district={this.props.district.feature.properties}/>;
        break;
      case 'RACE':
        displayElement = <RaceDisplay district={this.props.district.feature.properties}/>;
        break;
      case 'ELECTIONS':
        displayElement = <ElectionsDisplay district={this.props.district.feature.properties} elections={this.state.elections}/>;
        break;
      default:
        displayElement = <p>Error loading component</p>;
    }

    return (
      <section className="active" id="info-frame">
        <h2>{state + " " + districtName}</h2>
        {displayElement}
      </section>
    );
  }
});

module.exports = InfoFrame;
