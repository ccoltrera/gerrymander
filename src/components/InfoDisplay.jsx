var React = require('react');
var FIPS = require('../data/FIPS');
var getGerryNumber = require('../util/gerry-number');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;

var InfoDisplay = React.createClass({

  queryDataAndSetStateAsync: function(props) {
    var fields = ['total_pop'];
    getCDReport.call(this, this.props.district.properties.GEOID, fields);
  },

  componentDidMount: function() {
    this.queryDataAndSetStateAsync(this.props);
  },

  componentWillReceiveProps: function(newprops) {
    this.queryDataAndSetStateAsync(newprops);
  },

  render: function() {

    var rep = this.props.repdata[FIPS[this.props.district.properties.STATEFP] + this.props.district.properties.CD113FP];
    if (!rep) {
      rep = {
        person: {
          name: 'currently none',
          link: ''
        }
      };
    }
    var whenDrawn = '2010 or so, I guess';
    var whoDrew = 'some jerkfaces';

    var gerryNumber = getGerryNumber( this.props.district );

    var populationEl;

    if (this.state && this.state.district) {

      var totalPopulation = this.state.district.total_pop.Total.estimate;
      var landArea = this.props.district.properties.ALAND * 3.86102e-7;
      var popPerSqMile = (totalPopulation / landArea).toFixed(2);

      populationEl = (
        <ul>
          <h5>Population</h5>
          <li>{'Total : ' + totalPopulation}</li>
          <li>{'Density : ' + popPerSqMile + ' per sq. mile'}</li>
        </ul>
      );
    } else populationEl = <ul></ul>;

    return (
      <div>
        <h3>INFO</h3>
        <ul>
          <ul>
            <h5>Current Representative</h5>
            <li>{rep.person.name}</li>
            <li><a href={rep.person.link}>More info</a></li>
          </ul>
          <ul>
            <h5>District created</h5>
            <li>{whenDrawn}</li>
            <li>{whoDrew}</li>
          </ul>
          {populationEl}
        </ul>
      </div>
    );
  }
});

module.exports = InfoDisplay;
