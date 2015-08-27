var React = require('react');
var censusData = require('../util/cen-rep-rep');
var getCDReport = censusData.getCDReport;
var getStateReport = censusData.getStateReport;

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

      var district = this.state.district;
      var districtListEl = district ? (
        <ul>
          <h4>this district</h4>
          {buildListElement('Education', district.ed_attain, 'estimate')}
          <ul>
            <h5>English Proficiency</h5>
            <li>{'Speak English "very well": ' + district.lang_spoken['Speak English "very well"'].estimate}</li>
            <li>{'Speak English less than "very well": ' + district.lang_spoken['Speak English less than "very well"'].estimate}</li>
            <li>{'Speak only English: ' + district.lang_spoken['Speak only English'].estimate}</li>
          </ul>
        </ul>
      ) : <ul></ul>;

      var state = this.state.state;
      var stateListEl = state ? (
        <ul>
          <h4>state as a whole</h4>
          {buildListElement('Education', state.ed_attain, 'estimate')}
          <ul>
            <h5>English Proficiency</h5>
            <li>{'Speak English "very well": ' + state.lang_spoken['Speak English "very well"'].estimate}</li>
            <li>{'Speak English less than "very well": ' + state.lang_spoken['Speak English less than "very well"'].estimate}</li>
            <li>{'Speak only English: ' + state.lang_spoken['Speak only English'].estimate}</li>
          </ul>
        </ul>
      ) : <ul></ul>;

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

// EDUCATION: {
//     district: {
//       attainments: getCDReport('ed_attain'),
//       languages: getCDReport('lang_spoken')
//     },
//     state: {
//       attainments: getStateReport('ed_attain'),
//       languages: getStateReport('lang_spoken')
//     }
//   },

module.exports = EducationDisplay;
