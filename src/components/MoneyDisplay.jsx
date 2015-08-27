var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;

var MoneyDisplay = React.createClass({

  queryDataAndSetStateAsync: function(props) {
    var fields = ['median_hh_income', 'pc_income', 'pub_assist'];
    getCDReport.call(this, props.district.GEOID, fields);
    getStateReport.call(this, props.district.STATEFP, fields);
  },

  componentDidMount: function() {
    this.queryDataAndSetStateAsync(this.props);
  },

  componentWillReceiveProps: function(newprops) {
    this.queryDataAndSetStateAsync(newprops);
  },

  render: function() {

    var displayElement;

    if (this.state) {

      var districtListEl;
      var stateListEl;

      if (this.state.district) {

        var district = this.state.district;

        districtListEl = (
          <ul>
            <h4>this district</h4>
            <li>{'Median household income: $' + district.median_hh_income['Median household income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate.toLocaleString()}</li>
            <li>{'Per capita income: $' + district.pc_income['Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate.toLocaleString()}</li>
            <li>{'With cash public assistance or Food Stamps/SNAP: ' + ((district.pub_assist['With cash public assistance or Food Stamps/SNAP'].estimate / district.pub_assist['Total:'].estimate) * 100).toFixed(2) + '%'}</li>
          </ul>
        );
      } else districtListEl = <ul></ul>;

      if (this.state.state) {

        var state = this.state.state;
        stateListEl = (
          <ul>
            <h4>state as a whole</h4>
            <li>{'Median household income: $' + state.median_hh_income['Median household income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate.toLocaleString()}</li>
            <li>{'Per capita income: $' + state.pc_income['Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate.toLocaleString()}</li>
            <li>{'With cash public assistance or Food Stamps/SNAP: ' + ((state.pub_assist['With cash public assistance or Food Stamps/SNAP'].estimate / state.pub_assist['Total:'].estimate) * 100).toFixed(2) + '%'}</li>
          </ul>
        );

      } else stateListEl = <ul></ul>;

      displayElement = [districtListEl, stateListEl];

    } else displayElement = <p>loading data...</p>;

    return (
      <div>
        <h3>MONEY</h3>
        {displayElement}
      </div>
    );
  }
});

module.exports = MoneyDisplay;
