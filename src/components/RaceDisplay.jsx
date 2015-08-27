var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;
var formatTable = require('../util/formatTable.jsx');

function percent(dividend, divisor) {
  return ((dividend / divisor) * 100).toFixed(2) + '%';
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
        ['', 'DISTRICT', 'STATE'],
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
