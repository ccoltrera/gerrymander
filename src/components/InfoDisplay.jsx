var React = require('react');

var InfoDisplay = React.createClass({
  render: function() {
    return <p>InfoDisplay</p>;
  }
});

// INFO: {
//     state: statesByFIPS[this.props.district.G.STATEFP],
//     districtNum: this.props.district.G.NAMELSAD,
//     currentRep: 'your mom',
//     whenDrawn: '2010 or so, I guess',
//     whoDrew: 'some jerkfaces'
//   },

module.exports = InfoDisplay;
