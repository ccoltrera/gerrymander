'use strict';

var superagent = require('superagent');

var t_ids = {
  total_pop: 'B01003',
  race: 'B02001',
  // household income
  hh_income: 'B19001',
  // per capita income
  pc_income: 'B19301',
  // median household
  median_hh_income: 'B19013',
  // public assistance / foodstamp in past 12 months
  pub_assist: 'B19058',
  // educational attainment includes respondant breakdown by sex / age
  ed_attain: 'B15001',
  // lang_spoken includes respondant ability in English, and language spoken at home
  lang_spoken: 'B16001'
};

t_ids.getKeyByValue = function( value ) {
  for(var key in this) {
    if(this.hasOwnProperty(key)) {
      if(this[key] === value) return key;
    }
  }
};

// takes a Census Reporter generated JSON and the geo info, returns an object that's more human readable
function cenRepJSONParser (cenRepJSON, geoID) {
  var parsedJSON = {};
  for (var table in cenRepJSON.tables) {
    var thisTable = cenRepJSON.tables[table];
    var parsedTable = {};
    var tableId = thisTable.denominator_column_id.substring(0,6);
    var tableStr = t_ids.getKeyByValue(tableId);
    parsedJSON[tableStr] = parsedTable;
    for (var column in thisTable.columns) {
      var thisColumn = thisTable.columns[column];
      var parsedColumn = {};
      parsedColumn.estimate = cenRepJSON.data[geoID][table].estimate[column];
      parsedColumn.error = cenRepJSON.data[geoID][table].error[column];
      parsedTable[thisColumn.name] = parsedColumn;
    }
  }
  return parsedJSON;
}

// takes 4 digit congressional district geoID, ACS table id number
function getCDReport(cd_geoID, req_str_arr) {
  var t_id = req_str_arr.map(function(req_str) {
    return t_ids[req_str];
  }).join(',');
  var geoID = '50000US' + cd_geoID;
  var endpoint = 'http://api.censusreporter.org/1.0/data/show/latest?table_ids=' + t_id + '&geo_ids=' + geoID;
  superagent
    .get(endpoint)
    .end(function(err, res) {
      var parsed_data = cenRepJSONParser(res.body, geoID);
      var stateObj = {};
      stateObj['district'] = parsed_data;
      // console.log(stateObj);
      this.setState(stateObj);
    });
}

// takes state FIPS, ACS table id number
function getStateReport(stateFP, req_str_arr) {
  var t_id = req_str_arr.map(function(req_str) {
    return t_ids[req_str];
  }).join(',');
  var geoID = '04000US' + stateFP;
  var endpoint = 'http://api.censusreporter.org/1.0/data/show/latest?table_ids=' + t_id + '&geo_ids=' + geoID;
  superagent
    .get(endpoint)
    .end(function(err, res) {
      var parsed_data = cenRepJSONParser(res.body, geoID);
      var stateObj = {};
      stateObj['state'] = parsed_data;
      // console.log(stateObj);
      this.setState(stateObj);
    });
}

// getCDReport('5301', ['race','hh_income']);
// getStateReport('53', ['race','hh_income']);

module.exports.getCDReport = getCDReport;
module.exports.getStateReport = getStateReport;
