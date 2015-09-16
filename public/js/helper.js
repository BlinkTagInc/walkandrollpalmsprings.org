var $ = require('jquery'),
    _ = require('underscore'),
    moment = require('moment-timezone');


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


exports.calculateCo2Saved = function(meters, mode) {
  // Sources:
  // http://www.epa.gov/cleanenergy/energy-resources/refs.html
  // http://www.co2list.org/files/carbon.htm
  // http://www.buses.org/files/ComparativeEnergy.pdf

  var mpg = 21.4;
  var lbsCo2PerGallon = 19.5925;
  var lbsCodePerMileDriving = lbsCo2PerGallon / mpg;
  var lbsCo2PerMileWalking = 0.039;
  var lbsCo2PerMileBiking = 0.017;
  var lbsCo2PerMileTransit = 0.7;

  var miles = exports.metersToMiles(meters);

  if(mode === 'walk') {
    return Math.round(miles * (lbsCodePerMileDriving - lbsCo2PerMileWalking));
  } else if(mode === 'bike') {
    return Math.round(miles * (lbsCodePerMileDriving - lbsCo2PerMileBiking));
  } else if(mode === 'transit') {
    return Math.round(miles * (lbsCodePerMileDriving - lbsCo2PerMileTransit));
  }
};


exports.calculateCalories = function(meters, seconds, mode) {
  // Sources:
  // http://www.runnersworld.com/peak-performance/running-v-walking-how-many-calories-will-you-burn
  // http://www.livestrong.com/article/135430-calories-burned-biking-one-mile/

  var calsPerMileWalking = 88.9;
  var calsPerMileBiking = 47;

  if(mode === 'walk') {
    return Math.round(exports.metersToMiles(meters) * calsPerMileWalking);
  } else if(mode === 'bike') {
    return Math.round(exports.metersToMiles(meters) * calsPerMileBiking);
  } else if(mode === 'transit') {
    return Math.round(exports.secondsToMinutes(seconds) * 1);
  }
};
