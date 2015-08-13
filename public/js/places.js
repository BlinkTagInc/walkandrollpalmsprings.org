var _ = require('underscore');
var $ = require('jquery');

exports.getPlaces = function(category, cb) {
  var categoryIds = [];

  if (_.contains(category, 'Fresh Groceries')) {
    categoryIds.push(240406);
  } else if (_.contains(category, 'Prepared Foods')) {
    categoryIds.push(5084);
    categoryIds.push(5058);
  } else if (_.contains(category, 'Restaurants')) {
    categoryIds.push(1003);
  } else if (_.contains(category, 'Arts & Culture')) {
    categoryIds.push(5033);
    categoryIds.push(5055);
  } else if (_.contains(category, 'Casinos & Resorts')) {
    categoryIds.push(5037);
  } else if (_.contains(category, 'Nightlife')) {
    categoryIds.push(13466);
  } else if (_.contains(category, 'Parks & Attractions')) {
    categoryIds.push(5048);
  } else if (_.contains(category, 'Spas & Salons')) {
    categoryIds.push(13421);
  } else if (_.contains(category, 'Beauty')) {
    categoryIds.push(5059);
  } else if(_.contains(category, 'Clothes')) {
    categoryIds.push(5063);
    categoryIds.push(5061);
    categoryIds.push(5077);
    categoryIds.push(5088);
  } else if(_.contains(category, 'Gifts')) {
    categoryIds.push(24462);
  } else if(_.contains(category, 'Home')) {
    categoryIds.push(5075);
  } else if(_.contains(category, 'Services')) {
    categoryIds.push(5081);
  }



  $.getJSON('http://www.visitpalmsprings.com/WebServices/QueryService.svc/BusinessSearch?method=?', {
    size: 10,
    features: '(' + categoryIds.join(',') + ')'
  }).done(function(data) {
    if (data && data.d && data.d.items && data.d.items.length) {
      cb(null, data.d.items);
    } else {
      cb(new Error('Invalid Response'));
    }
  }).error(function(e) {
    cb(e);
  });
};
