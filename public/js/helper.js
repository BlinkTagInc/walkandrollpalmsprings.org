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
