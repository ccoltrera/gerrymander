var React = require('react');

var EducationDisplay = React.createClass({
  render: function() {
    return <p>EducationDisplay</p>;
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
