var React = require('react');
var FIPS = require('../data/FIPS');
var whoDraws = require('../data/who-draws')
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
    var whoDrew = whoDraws[this.props.district.properties.STATEFP];
    var gerryNumber = getGerryNumber( this.props.district );

    var populationEl;

    if (this.state && this.state.district) {

      var totalPopulation = this.state.district.total_pop.Total.estimate;
      var landArea = this.props.district.properties.ALAND * 3.86102e-7;
      var popPerSqMile = (totalPopulation / landArea).toFixed(2);

      populationEl = (
        <ul>
          <h3>Population</h3>
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
            <h3>Current Representative</h3>
            <li>{rep.person.name}</li>
            <li><a href={rep.person.link}>More info</a></li>
          </ul>
          <ul>
            <h3>District Drawn By: </h3>
            <p>{whoDrew}</p>
          </ul>
          {populationEl}
        </ul>
        <br />
        <hr />
        <br />
        <h3>Gerry Number: {getGerryNumber(this.props.district).polyToCircleRatio.toFixed(2)}</h3>
        <br />
        <p>Gerrymandering is difficult to quantify. One way to do it is to look at how irregular a district is shaped, by comparing a district's area to the area of a circle with the same perimeter. The further below 0.50 that the Gerry Number is, the more irregular the shape is.</p>
        <br>
        <p>Wyoming's single, rectangular district is 0.49</p>
        <p>Florida District 5 (the long skinny one) is 0.07</p>
      </div>
    );
  }
});

module.exports = InfoDisplay;
