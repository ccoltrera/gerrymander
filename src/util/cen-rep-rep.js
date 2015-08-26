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

// takes a Census Reporter generated JSON and the geo info, returns an object that's more human readable
function cenRepJSONParser (cenRepJSON, geoID) {
  var parsedJSON = {};
  for (var table in cenRepJSON.tables) {
    var thisTable = cenRepJSON.tables[table];
    for (var column in thisTable.columns) {
      var thisColumn = thisTable.columns[column];

      var parsedColumn = {};

      parsedColumn.estimate = cenRepJSON.data[geoID][table].estimate[column];
      parsedColumn.error = cenRepJSON.data[geoID][table].error[column];

      parsedJSON[thisColumn.name] = parsedColumn;

    }
  }
  return parsedJSON;
}

// takes 4 digit congressional district geoID, ACS table id number
function getCDReport(that, cd_geoID, req_str) {
  var t_id = t_ids[req_str];
  var geoID = '50000US' + cd_geoID;
  var endpoint = 'http://api.censusreporter.org/1.0/data/show/latest?table_ids=' + t_id + '&geo_ids=' + geoID;
  superagent
    .get(endpoint)
    .end(function(err, res) {
      var parsed_data = cenRepJSONParser(res.body, geoID);
      var stateObj = {};
      stateObj['cd_' + req_str] = parsed_data;
      console.log(stateObj);
      // that.setState(stateObj);
    });
}

// takes state FIPS, ACS table id number
function getStateReport(that, stateFP, req_str) {
  var t_id = t_ids[req_str];
  var geoID = '04000US' + stateFP;
  var endpoint = 'http://api.censusreporter.org/1.0/data/show/latest?table_ids=' + t_id + '&geo_ids=' + geoID;
  superagent
    .get(endpoint)
    .end(function(err, res) {
      var parsed_data = cenRepJSONParser(res.body, geoID);
      var stateObj = {};
      stateObj['state_' + req_str] = parsed_data;
      console.log(stateObj);
      // that.setState(stateObj);
    });
}

// getCDReport(this, '5301', 'race');
// getStateReport(this, '53', 'race');

module.exports.getCDReport = getCDReport;
module.exports.getStateReport = getStateReport;
