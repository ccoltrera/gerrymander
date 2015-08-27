var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;

function percent(dividend, divisor) {
  return ((dividend / divisor) * 100).toFixed(2) + '%';
}

function buildListElement(heading, container, subfield) {
  var list = [];
  Object.keys(container).forEach(function(key) {
    var val = container[key][subfield];
    list.push(<li>{key + ' : ' + val}</li>);
  });
  return (
    <ul>
      <h5>{heading}</h5>
      {list}
    </ul>
  );
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

    if (this.state) {

      var districtListEl;
      var stateListEl;

      if (this.state.district) {

        // console.log(this.state.district);

        var district = this.state.district;
        var lessThanNinth = district.ed_attain['Less than 9th grade'].estimate;
        var ninthToTwelfth = district.ed_attain['9th to 12th grade, no diploma'].estimate;
        var highSchoolGrad = district.ed_attain['High school graduate (includes equivalency)'].estimate;
        var someCollege = district.ed_attain['Some college, no degree'].estimate;
        var associates = district.ed_attain['Associate\'s degree'].estimate;
        var bachelors = district.ed_attain['Bachelor\'s degree'].estimate;
        var gradDegree = district.ed_attain['Graduate or professional degree'].estimate;

        var edTotal = lessThanNinth + ninthToTwelfth + highSchoolGrad + someCollege + associates + bachelors + gradDegree;
        districtListEl = (
          <ul>
            <h4>this district</h4>
            <ul>
              <h5>Educational Attainment (Adults)</h5>
              <li>{'Less than 9th grade : ' + percent(lessThanNinth, edTotal)}
              </li>
              <li>{'9th to 12th grade, no diploma : ' + percent(ninthToTwelfth, edTotal)}
              </li>
              <li>{'High school graduate (includes equivalency) : ' + percent(highSchoolGrad, edTotal)}
              </li>
              <li>{'Some college, no degree : ' + percent(someCollege, edTotal)}
              </li>
              <li>{'Associate\'s degree : ' + percent(associates, edTotal)}
              </li>
              <li>{'Bachelor\'s degree : ' + percent(bachelors, edTotal)}
              </li>
              <li>{'Graduate or professional degree : ' + percent(gradDegree, edTotal)}
              </li>
            </ul>
            <ul>
              <h5>English Proficiency</h5>
              <li>{'Speak English "very well": ' + percent(edTotal, district.lang_spoken['Speak English "very well"'].estimate)}</li>
              <li>{'Speak English less than "very well": ' + percent(edTotal, district.lang_spoken['Speak English less than "very well"'].estimate)}</li>
              <li>{'Speak only English: ' + percent(edTotal, district.lang_spoken['Speak only English'].estimate)}</li>
            </ul>
          </ul>
        );
      } else districtListEl = <ul></ul>;

      if (this.state.state) {

        var state = this.state.state;
        stateListEl = (
          <ul>
            <h4>state as a whole</h4>
            <ul>
              <h5>Educational Attainment (Adults)</h5>
              <li>{'Less than 9th grade : ' + state.ed_attain['Less than 9th grade'].estimate}</li>
              <li>{'9th to 12th grade, no diploma : ' + state.ed_attain['9th to 12th grade, no diploma'].estimate}</li>
              <li>{'High school graduate (includes equivalency) : ' + state.ed_attain['High school graduate (includes equivalency)'].estimate}</li>
              <li>{'Some college, no degree : ' + state.ed_attain['Some college, no degree'].estimate}</li>
              <li>{'Associate\'s degree : ' + state.ed_attain['Associate\'s degree'].estimate}</li>
              <li>{'Bachelor\'s degree : ' + state.ed_attain['Bachelor\'s degree'].estimate}</li>
              <li>{'Graduate or professional degree : ' + state.ed_attain['Graduate or professional degree'].estimate}</li>
            </ul>
            <ul>
              <h5>English Proficiency</h5>
              <li>{'Speak English "very well": ' + state.lang_spoken['Speak English "very well"'].estimate}</li>
              <li>{'Speak English less than "very well": ' + state.lang_spoken['Speak English less than "very well"'].estimate}</li>
              <li>{'Speak only English: ' + state.lang_spoken['Speak only English'].estimate}</li>
            </ul>
          </ul>
        );
      } else stateListEl = <ul></ul>;

      displayElement = [districtListEl, stateListEl];

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
