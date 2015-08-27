var React = require('react');
var FIPS = require('../data/FIPS')

var ElectionsDisplay = React.createClass({
  render: function() {
    var electionKey = (this.props && this.props.district) ? (
      '2012_' + FIPS[this.props.district.STATEFP] + '_' + this.props.district.CD113FP
    ) : null;
    var electionResults = (this.props.elections && electionKey) ? this.props.elections[electionKey] : null;
    console.log(electionResults)

    var electionResultsDisplay = electionResults ? (
      electionResults.map(function(candidate) {

      })
    ) : null;

    return electionResultsDisplay ? (
      electionResultsDisplay
    ) : ( <p>Loading 2012 Election Results...</p> )
  }
});

// ELECTIONS: {
//     2012 votes
//   }

module.exports = ElectionsDisplay;
