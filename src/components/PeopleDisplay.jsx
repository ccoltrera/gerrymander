var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;

function percent(dividend, divisor) {
  return ((dividend / divisor) * 100).toFixed(2) + '%';
}

var PeopleDisplay = React.createClass({

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

    if (this.state) {

      var districtListEl;
      var stateListEl;

      if (this.state.district) {

        var district = this.state.district;

        console.log(district);

        var totalPopulation = district.total_pop.Total.estimate;
        var landArea = this.props.district.ALAND * 3.86102e-7;
        var popPerSqMile = (totalPopulation / landArea).toFixed(2);
        var mixedRace = district.race['Two races excluding Some other race, and three or more races'].estimate + district.race['Two races including Some other race'].estimate + district.race['Two or more races:'].estimate;

        var raceTotal = district.race['Total:'].estimate;

        districtListEl = (
          <ul>
            <h4>this district</h4>
            <li>{'Total population : ' + totalPopulation}</li>
            <li>{'Population density : ' + popPerSqMile + ' people per square mile'}</li>
            <ul>
              <h5>Race</h5>
              <li>{'American Indian and Alaska Native : ' + percent(district.race['American Indian and Alaska Native alone'].estimate, raceTotal)}</li>
              <li>{'Asian : ' + percent(district.race['Asian alone'].estimate, raceTotal)}</li>
              <li>{'Black or African American : ' + percent(district.race['Black or African American alone'].estimate, raceTotal)}</li>
              <li>{'Native Hawaiian and Other Pacific Islander : ' + percent(district.race['Native Hawaiian and Other Pacific Islander alone'].estimate, raceTotal)}</li>
              <li>{'White : ' + percent(district.race['White alone'].estimate, raceTotal)}</li>
              <li>{'Some other race : ' + percent(district.race['Some other race alone'].estimate, raceTotal)}</li>
              <li>{'Mixed race : ' + percent(mixedRace, raceTotal)}</li>
            </ul>
          </ul>
        );
      } else districtListEl = <ul></ul>;

      if (this.state.state) {

        var state = this.state.state;
        var totalPopulation = state.total_pop.Total.estimate;
        var landArea;
        var mixedRace = state.race['Two races excluding Some other race, and three or more races'].estimate + state.race['Two races including Some other race'].estimate + state.race['Two or more races:'].estimate;

        var raceTotal = state.race['Total:'].estimate;

        stateListEl = (
          <ul>
            <h4>state as a whole</h4>
            <li>{'Total population : ' + totalPopulation}</li>
            <li>{'Population density (not built yet)'}</li>
            <ul>
              <h5>Race</h5>
              <li>{'American Indian and Alaska Native : ' + percent(state.race['American Indian and Alaska Native alone'].estimate, raceTotal)}</li>
              <li>{'Asian : ' + percent(state.race['Asian alone'].estimate, raceTotal)}</li>
              <li>{'Black or African American : ' + percent(state.race['Black or African American alone'].estimate, raceTotal)}</li>
              <li>{'Native Hawaiian and Other Pacific Islander : ' + percent(state.race['Native Hawaiian and Other Pacific Islander alone'].estimate, raceTotal)}</li>
              <li>{'White : ' + percent(state.race['White alone'].estimate, raceTotal)}</li>
              <li>{'Some other race : ' + percent(state.race['Some other race alone'].estimate, raceTotal)}</li>
              <li>{'Mixed race : ' + percent(mixedRace, raceTotal)}</li>
            </ul>
          </ul>
        );
      } else stateListEl = <ul></ul>;

      displayElement = [districtListEl, stateListEl];

    } else displayElement = <p>loading data...</p>;

    return (
      <div>
        <h3>PEOPLE</h3>
        {displayElement}
      </div>
    );
  }
});

module.exports = PeopleDisplay;
