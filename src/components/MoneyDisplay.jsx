var React = require('react');

var MoneyDisplay = React.createClass({
  render: function() {
    return <p>MoneyDisplay</p>;
  }
});

// MONEY: {
//     district: {
//       incomeByHousehold: getCDReport('hh_income'),
//       incomePerCapita: getCDReport('pc_income'),
//       incomeByHouseholdMedian: getCDReport('median_hh_income'),
//       publicAssistance: getCDReport('pub_assist')
//     },
// state: {
//       incomeByHousehold: getStateReport('hh_income'),
//       incomePerCapita: getStateReport('pc_income'),
//       incomeByHouseholdMedian: getStateReport('median_hh_income'),
//       publicAssistance: getStateReport('pub_assist')
//     }

module.exports = MoneyDisplay;
