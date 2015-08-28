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
    var districtArrow = window.innerWidth >= 600 ? "↲" : "↑";
    if (!this.props.district && !this.props.infoType) {
      var className = "close";
      return (
        <section className={className} id="info-frame">
          <span id="close" onClick={this.props.closeFrame}><i className="fa fa-times-circle"></i></span>
        </section>
      )
    }
    if (!this.props.district || !this.props.infoType) {
      var className = "active";
      return (
        <section className={className} id="info-frame">
          <div>
            <span id="close" onClick={this.props.closeFrame}><i className="fa fa-times-circle"></i></span>
            <h2>Gerrymander |ˈʤɛriˌmændər|</h2>
            <p>(v.) manipulate the boundaries of an electoral constituency so as to favor one party or class.</p>
            <br />
            <h2>Gerrymender |ˈʤɛriˌmɛndər|</h2>
            <p>(n.) an app to help people explore, and mend, the 'mandering.</p>
            <br />
            <hr />
            <br />
            <p>
              Gerrymandering is a big problem in the U.S. electoral system, but it can be difficult to explain and even more difficult to explore. That's why we made this tool.
            </p>
            <p>
              Explore the issue by clicking on districts:
            </p>
            <h1>{districtArrow}</h1>
            <p>
              And information tabs:
            </p>
            <h1>↓</h1>
            <br />
            <hr />
            <br />
            <h3>Questions to Explore: </h3>
            <br />
            <ul>
              <li>Who benefits from the shape of a district?</li>
              <li>What groups of people are concentrated in one district, or another?</li>
              <li>Who tends to vote for what parties?</li>
              <li>Who draws the districts in each state?</li>
            </ul>
            </div>
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
        <span id="close" onClick={this.props.closeFrame}><i className="fa fa-times-circle"></i></span> <span id="back" onClick={this.props.backFrame}><i className="fa fa-question-circle"></i></span>
        <h2>{state + " " + districtName}</h2>
        {displayElement}
      </section>
    );
  }
});

module.exports = InfoFrame;
