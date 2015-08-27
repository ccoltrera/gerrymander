var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;

function percent(dividend, divisor) {
  return ((dividend / divisor) * 100).toFixed(2) + '%';
}

function formatTable(array) {
  var html = [];
  var headRow = array.shift();
  html.push(
    <thead>
      <th>{headRow[0]}</th>
      <th>{headRow[1]}</th>
      <th>{headRow[2]}</th>
    </thead>
  );
  array.forEach(function(row) {
    var output;
    if (row.length === 3) {
      output = (
        <tr>
          <td>{row[0]}</td>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
        </tr>
      );
    } else if (row.length === 1) {
      output = (
        <tr>
          <th colspan='3'>{row[0]}</th>
        </tr>
      );
    }
    html.push(output);
  });
  return html;
}

var RaceDisplay = React.createClass({

  queryDataAndSetStateAsync: function(props) {
    var fields = ['total_pop', 'race'];
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

      var mixedRaceDistrict = district.race['Two races excluding Some other race, and three or more races'].estimate + district.race['Two races including Some other race'].estimate + district.race['Two or more races:'].estimate;
      var mixedRaceState = state.race['Two races excluding Some other race, and three or more races'].estimate + state.race['Two races including Some other race'].estimate + state.race['Two or more races:'].estimate;
      var raceTotalDistrict = district.race['Total:'].estimate;
      var raceTotalState = state.race['Total:'].estimate;

      displayElement = formatTable([
        ['', 'district', 'state'],
        [
          'American Indian and Alaska Native',
          percent(district.race['American Indian and Alaska Native alone'].estimate, raceTotalDistrict),
          percent(state.race['American Indian and Alaska Native alone'].estimate, raceTotalState)
        ],
        [
          'Asian',
          percent(district.race['Asian alone'].estimate, raceTotalDistrict),
          percent(state.race['Asian alone'].estimate, raceTotalState)
        ],
        [
          'Black or African American',
          percent(district.race['Black or African American alone'].estimate, raceTotalDistrict),
          percent(state.race['Black or African American alone'].estimate, raceTotalState)
        ],
        [
          'Native Hawaiian and Other Pacific Islander',
          percent(district.race['Native Hawaiian and Other Pacific Islander alone'].estimate, raceTotalDistrict),
          percent(state.race['Native Hawaiian and Other Pacific Islander alone'].estimate, raceTotalState)
        ],
        [
          'White',
          percent(district.race['White alone'].estimate, raceTotalDistrict),
          percent(state.race['White alone'].estimate, raceTotalState)
        ],
        [
          'Some other race',
          percent(district.race['Some other race alone'].estimate, raceTotalDistrict),
          percent(state.race['Some other race alone'].estimate, raceTotalState)
        ],
        [
          'Mixed race',
          percent(mixedRaceDistrict, raceTotalDistrict),
          percent(mixedRaceState, raceTotalState)
        ]
      ]);

    } else displayElement = <p>loading data...</p>;

    return (
      <div>
        <h3>RACE</h3>
        {displayElement}
      </div>
    );
  }
});

module.exports = RaceDisplay;
