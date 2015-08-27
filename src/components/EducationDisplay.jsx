var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;
var formatTable = require('../util/formatTable.jsx');

function percent(dividend, divisor) {
  return ((dividend / divisor) * 100).toFixed(2) + '%';
}

var EducationDisplay = React.createClass({

  queryDataAndSetStateAsync: function(props) {
    var fields = ['ed_attain', 'lang_spoken'];
    getCDReport.call(this, this.props.district.GEOID, fields);
    getStateReport.call(this, this.props.district.STATEFP, fields);
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
          'Less than 9th grade',
          district.ed_attain['Less than 9th grade'].estimate.toLocaleString(),
          state.ed_attain['Less than 9th grade'].estimate.toLocaleString()
        ],
        [
          '9th to 12th grade, no diploma',
          district.ed_attain['9th to 12th grade, no diploma'].estimate.toLocaleString(),
          state.ed_attain['9th to 12th grade, no diploma'].estimate.toLocaleString(),
        ],
        [
          'High school grad (or equivalency)',
          district.ed_attain['High school graduate (includes equivalency)'].estimate.toLocaleString(),
          state.ed_attain['High school graduate (includes equivalency)'].estimate.toLocaleString(),
        ],
        [
          'Some college',
          district.ed_attain['Some college, no degree'].estimate.toLocaleString(),
          state.ed_attain['Some college, no degree'].estimate.toLocaleString()
        ],
        [
          'Associate\'s degree',
          district.ed_attain['Associate\'s degree'].estimate.toLocaleString(),
          state.ed_attain['Associate\'s degree'].estimate.toLocaleString()
        ],
        [
          'Bachelor\'s degree',
          district.ed_attain['Bachelor\'s degree'].estimate.toLocaleString(),
          state.ed_attain['Bachelor\'s degree'].estimate.toLocaleString()
        ],
        [
          'Graduate or professional degree',
          district.ed_attain['Graduate or professional degree'].estimate.toLocaleString(),
          state.ed_attain['Graduate or professional degree'].estimate.toLocaleString()
        ]
      ]);

      //       <ul>
      //         <h5>English Proficiency</h5>
      //         <li>{'Speak English "very well": ' + percent(edTotal, district.lang_spoken['Speak English "very well"'].estimate)}</li>
      //         <li>{'Speak English less than "very well": ' + percent(edTotal, district.lang_spoken['Speak English less than "very well"'].estimate)}</li>
      //         <li>{'Speak only English: ' + percent(edTotal, district.lang_spoken['Speak only English'].estimate)}</li>
      //       </ul>

    } else displayElement = <p>loading data...</p>;

    return (
      <div>
        <h3>EDUCATION</h3>
        {displayElement}
      </div>
    );
  }
});

module.exports = EducationDisplay;
