var React = require('react');
var FIPS = require('../data/FIPS');

var InfoDisplay = React.createClass({

  render: function() {

    var rep = this.props.repdata[FIPS[this.props.district.STATEFP] + this.props.district.CD113FP];
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

    return (
      <div>
        <h3>INFO</h3>
        <ul>
          <ul>{'Current Representative:'}
            <li>{rep.person.name}</li>
            <li><a href={rep.person.link}>More info</a></li>
          </ul>
          <ul>{'District created:'}
            <li>{whenDrawn}</li>
            <li>{whoDrew}</li>
          </ul>
        </ul>
      </div>
    );
  }
});

module.exports = InfoDisplay;
