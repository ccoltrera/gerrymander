'use strict';

function perimeterLength(coordDegArr) {
  var distanceArr = []

  for (var i = 0; i < coordDegArr.length; i++) {
    var lat1, lng1, lat2, lng2;

    lat1 = coordDegArr[i][0];
    lng1 = coordDegArr[i][1];
    if (coordDegArr[i + 1]) {
      lat2 = coordDegArr[i + 1][0];
      lng2 = coordDegArr[i + 1][1];
    } else {
      lat2 = coordDegArr[0][0];
      lng2 = coordDegArr[0][1];
    }

    var R = 6371000; // metres
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2 - lat1) * Math.PI / 180;
    var Δλ = (lng2 - lng1) * Math.PI / 180;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;

    distanceArr.push(d);
  }

  var perimeterLength = distanceArr.reduce(function(dist1, dist2) {
    return dist1 + dist2;
  });

  return perimeterLength;
}

function gerryNumber(district) {
  var areaInMeters = district.properties.ALAND;
  var perimInMeters = perimeterLength(district.geometry.coordinates[0]);

  var circleArea = Math.pow(perimInMeters, 2) / (Math.PI * 4);
  var polyToCircleRatio = areaInMeters / (areaInMeters + circleArea);
  var circleToPolyRatio = circleArea / (areaInMeters + circleArea);

  return ({
    polyToCircleRatio: polyToCircleRatio,
    circleToPolyRatio: circleToPolyRatio
  });
}

module.exports = gerryNumber;
