var React = require('react');

var PeopleDisplay = React.createClass({
  render: function() {
    return <p>PeopleDisplay</p>;
  }
});

// PEOPLE: {
//     district: {
//       populationTotal: getCDReport('total_pop'),
//       populationDensity: {total/area},
//       ethnicity: getCDReport('race')
//     },
//     state: {
//       populationTotal: getCDReport('total_pop'),
//       populationDensity: {total/area},
//       ethnicity: getCDReport('race')
//     }
//   },

module.exports = PeopleDisplay;
