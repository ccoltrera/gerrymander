'use strict';
var React = require('react');
var censusData = require('../util/cen-rep-rep');

var data = ['INFO', 'MONEY', 'EDUCATION', 'PEOPLE', 'ELECTIONS'];
var statesByFIPS = require('../data/statesByFIPS');

/*
{
  INFO: {
    state: statesByFIPS[this.props.district.G.STATEFP],
    districtNum: this.props.district.G.NAMELSAD,
    currentRep: 'your mom',
    whenDrawn: '2010 or so, I guess',
    whoDrew: 'some jerkfaces'
  },
  MONEY: {
    district: {
      incomeByHousehold: getCDReport('hh_income'),
      incomePerCapita: getCDReport('pc_income'),
      incomeByHouseholdMedian: getCDReport('median_hh_income'),
      publicAssistance: getCDReport('pub_assist')
    },
    state: {
      incomeByHousehold: getStateReport('hh_income'),
      incomePerCapita: getStateReport('pc_income'),
      incomeByHouseholdMedian: getStateReport('median_hh_income'),
      publicAssistance: getStateReport('pub_assist')
    }
  },
  EDUCATION: {
    district: {
      attainments: getCDReport('ed_attain'),
      languages: getCDReport('lang_spoken')
    },
    state: {
      attainments: getStateReport('ed_attain'),
      languages: getStateReport('lang_spoken')
    }
  },
  PEOPLE: {
    district: {
      populationTotal: getCDReport('total_pop'),
      populationDensity: {total/area},
      ethnicity: getCDReport('race')
    },
    state: {
      populationTotal: getCDReport('total_pop'),
      populationDensity: {total/area},
      ethnicity: getCDReport('race')
    }
  },
  ELECTIONS: {
    2012 votes
  }
}

*/

var InfoFrame = React.createClass({
  getInitialState: function() {
    return {
      data: null
    }
  },
  render: function() {
    console.log(this.props.district);
    return (
      <aside className="right-side-info">
        <p></p>
      </aside>
    );
  }
});

module.exports = InfoFrame;
