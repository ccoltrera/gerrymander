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
          <h2>Gerrymander |ˈʤɛriˌmændər|</h2>
          <p>(n.) manipulate the boundaries of an electoral constituency so as to favor one party or class.</p>
          <br />
          <hr />
          <br />
          <p>
            Gerrymandering is a big problem in the U.S. electoral system, but it can be difficult to explain and even more difficult to explore. That's why we made this tool.
          </p>
          <p>
            Explore the issue by clicking on districts
          </p>
          <h1>↲</h1>
          <p>
            And information tabs
          </p>
          <h1>↓</h1>
          <br />
          <hr />
          <h3>Questions to Explore</h3>
          <br />
          <ul>
            <li>Who benefits from the shape of a district?</li>
            <li>What groups of people are concentrated in one district, or another?</li>
            <li>Who tends to vote for what parties?</li>
            <li>Who draws the districts in each state?</li>
          </ul>
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
