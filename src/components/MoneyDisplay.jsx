var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;

var MoneyDisplay = React.createClass({

  componentDidMount: function() {
    var fields = ['median_hh_income', 'pc_income', 'pub_assist'];
    getCDReport.call(this, this.props.district.GEOID, fields);
    getStateReport.call(this, this.props.district.STATEFP, fields);
  },

  render: function() {

    var displayElement;

    if (this.state && this.state.district) {
      var district = this.state.district;
      var state = this.state.state;
      displayElement = [
        <ul>
          <h4>this district</h4>
          <li>{'Median household income: ' + district.median_hh_income['Median household income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate}</li>
          <li>{'Per capita income: ' + district.pc_income['Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate}</li>
          <li>{'Number on public assistance programs or Food Stamps/SNAP: ' + district.pub_assist['With cash public assistance or Food Stamps/SNAP'].estimate}</li>
        </ul>
        ,
        <ul>
          <h4>state as a whole</h4>
          <li>{'Median household income: ' + state.median_hh_income['Median household income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate}</li>
          <li>{'Per capita income: ' + state.pc_income['Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate}</li>
          <li>{'Number on public assistance programs or Food Stamps/SNAP: ' + state.pub_assist['With cash public assistance or Food Stamps/SNAP'].estimate}</li>
        </ul>
      ];
    }
    else displayElement = <p>loading data...</p>;

    return (
      <div>
        <h3>MONEY</h3>
        {displayElement}
      </div>
    );
  }
});

module.exports = MoneyDisplay;
