var React = require('react');
var FIPS = require('../data/FIPS')

var ElectionsDisplay = React.createClass({
  render: function() {
    var electionKey = (this.props && this.props.district) ? (
      '2012_' + FIPS[this.props.district.STATEFP] + '_' + this.props.district.CD113FP
    ) : null;
    var electionResults = (this.props.elections && electionKey) ? this.props.elections[electionKey] : null;
    var candidateArr = [];
    var totalVotes = 0;
    for (var candidate in electionResults) {
      if (electionResults.hasOwnProperty(candidate)) {
        candidateArr.push(electionResults[candidate])
        totalVotes += electionResults[candidate].votes;
      };
    }

    var electionResultsDisplay = candidateArr ? (
      candidateArr.map(function(candidate) {
        return (
          <tr key={candidate.name + candidate.parties[0]}>
            <td>
              {candidate.name}
            </td>
            <td>
              {candidate.parties[0]}
            </td>
            <td>
              { ((candidate.votes / totalVotes) * 100).toFixed(2) }%
            </td>
          </tr>
        );
      })
    ) : null;

    return electionResultsDisplay ? (
      <table>
        <thead>
          <tr>
            <th colSpan="3">
              2012 Election Results
            </th>
          </tr>
          <tr>
            <th>Candidate</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {electionResultsDisplay}
        </tbody>
      </table>
    ) : ( <p>Loading 2012 Election Results...</p> )
  }
});

module.exports = ElectionsDisplay;
