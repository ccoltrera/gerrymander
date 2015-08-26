var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;

var MoneyDisplay = React.createClass({

  getInitialState: function() {
    return;
    // {
      // district: {
      //   hh_income: null,
      //   median_hh_income: null,
      //   pc_income: null,
      //   pub_assist: null
      // },
      // state: {
      //   hh_income: null,
      //   median_hh_income: null,
      //   pc_income: null,
      //   pub_assist: null
      // }
    // };
  },

  componentDidMount: function() {
    var fields = ['hh_income', 'median_hh_income', 'pc_income', 'pub_assist'];
    this.getCDReport(fields).bind(this, this.props.district.GEOID);
    this.getStateReport(fields).bind(this, this.props.district.STATEFP);
  },

  render: function() {

    console.log(this.state);
    console.log('district:', this.state.district);
    console.log('state:', this.state.state);

    return <p></p>;

    // return (
    //   <div>
    //     <h3>MONEY</h3>
    //     <ul>District
    //       <li>{'Household income (mean): ' + byDistrict.incomeByHouseholdMean}</li>
    //       <li>{'Household income (median): ' + byDistrict.incomeByHouseholdMedian}</li>
    //       <li>{'Per capita income: ' + byDistrict.incomePerCapita}</li>
    //       <li>{'Number on public assistance programs: ' + byDistrict.publicAssistance}</li>
    //     </ul>
    //     <ul>State
    //       <li>{'Household income (mean): ' + byState.incomeByHouseholdMean}</li>
    //       <li>{'Household income (median): ' + byState.incomeByHouseholdMedian}</li>
    //       <li>{'Per capita income: ' + byState.incomePerCapita}</li>
    //       <li>{'Number on public assistance programs: ' + byState.publicAssistance}</li>
    //     </ul>
    //   </div>
    // );
  }
});

module.exports = MoneyDisplay;
