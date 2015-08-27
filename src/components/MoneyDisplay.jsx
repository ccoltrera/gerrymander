var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;
var formatTable = require('../util/formatTable.jsx');

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

    if (this.state && this.state.district && this.state.state) {

      var district = this.state.district;
      var state = this.state.state;

      displayElement = formatTable([
        ['', 'DISTRICT', 'STATE'],
        [
          'Median household income',
          '$' + district.median_hh_income['Median household income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate.toLocaleString(),
          '$' + state.median_hh_income['Median household income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate.toLocaleString()
        ],
        [
          'Per capita income',
          '$' + district.pc_income['Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate.toLocaleString(),
          '$' + state.pc_income['Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)'].estimate.toLocaleString()
        ],
        [
          'Public assistance or Food Stamps/SNAP',
          ((district.pub_assist['With cash public assistance or Food Stamps/SNAP'].estimate / district.pub_assist['Total:'].estimate) * 100).toFixed(2) + '%',
          ((state.pub_assist['With cash public assistance or Food Stamps/SNAP'].estimate / district.pub_assist['Total:'].estimate) * 100).toFixed(2) + '%'
        ]
      ]);

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
