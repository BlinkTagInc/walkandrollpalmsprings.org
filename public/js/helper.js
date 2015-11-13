var $ = require('jquery');
var _ = require('underscore');
var moment = require('moment-timezone');


exports.substringMatcher = function(strs) {
  //for Typeahead
  return function findMatches(q, cb) {
    // an array that will be populated with substring matches
    var matches = [];

    // regex used to determine if a string contains the substring `q`
    var substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });

    cb(matches);
  };
};


exports.metersToMiles = function(meters) {
  return Math.round(meters / 1609.34 * 10) / 10;
};


exports.secondsToMinutes = function(seconds) {
  return Math.round(seconds / 60);
};


exports.calculateCo2Saved = function(miles, mode) {
  // Sources:
  // http://www.epa.gov/otaq/climate/documents/420f14040a.pdf
  // http://www.cdc.gov/healthyweight/physical_activity
  // 411 grams per mile figure from the EPA, and the 29/80 calories per mile for biking/walking from the CDC.

  var lbsCodePerMileDriving = 0.9061;
  var lbsCo2PerMileWalking = 0.039;
  var lbsCo2PerMileBiking = 0.017;

  if(mode === 'walk') {
    return Math.round(miles * (lbsCodePerMileDriving - lbsCo2PerMileWalking));
  } else if(mode === 'bike') {
    return Math.round(miles * (lbsCodePerMileDriving - lbsCo2PerMileBiking));
  } else if(mode === 'transit') {
    return null;
  }
};


exports.calculateCalories = function(miles, mode) {
  // Sources:
  // http://www.runnersworld.com/peak-performance/running-v-walking-how-many-calories-will-you-burn
  // http://www.livestrong.com/article/135430-calories-burned-biking-one-mile/

  var calsPerMileWalking = 80;
  var calsPerMileBiking = 29;

  if(mode === 'walk') {
    return Math.round(miles * calsPerMileWalking);
  } else if(mode === 'bike') {
    return Math.round(miles * calsPerMileBiking);
  } else if(mode === 'transit') {
    return null;
  }
};


exports.formatDirectionsUrl = function(startAddress, endAddress, mode) {
  var url = 'http://www.google.com/maps?ie=UTF8&f=d';

  url += '&saddr=' + encodeURIComponent(startAddress);
  url += '&daddr=' + encodeURIComponent(endAddress + ' near Palm Springs');

  if(mode === 'transit') {
    url += '&ttype=dep&dirflg=r';
  } else if (mode === 'walk') {
    url += '&dirflg=w';
  } else if (mode === 'bike') {
    url += '&dirflg=b';
  }

  return url;
};
