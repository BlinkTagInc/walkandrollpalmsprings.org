var _ = require('underscore');
var $ = require('jquery');

exports.getPlaces = function(category, cb) {
  var categoryIds = [];

  if (_.contains(category, 'Fresh Groceries')) {
    categoryIds.push(5073, 5084);
  } else if (_.contains(category, 'Prepared Foods')) {
    categoryIds.push(5009, 5013, 5015, 5058, 5073, 5084);
  } else if (_.contains(category, 'Restaurants')) {
    categoryIds.push(5007,5008,5009,5010,135916,5012,5013,5014,16204,5015,121643,5016,5017,5018,5019,5020,145762,78819,5021,5022,5023,5024,5025,11803,5026,123343,5027,11784,5028,186758,5029,5030,253446,5058);
  } else if (_.contains(category, 'Arts & Culture')) {
    categoryIds.push(5033, 5045, 5046, 5055, 5070, 5074);
  } else if (_.contains(category, 'Casinos & Resorts')) {
    categoryIds.push(5037);
  } else if (_.contains(category, 'Nightlife')) {
    categoryIds.push(5045, 13466, 5055, 5025);
  } else if (_.contains(category, 'Parks & Attractions')) {
    categoryIds.push(5031, 5032, 5056, 5034, 12437, 5035, 5036, 14520, 5041, 247639, 5042, 5043, 5047, 5048, 249862, 5049, 5051, 5052, 5053, 5054, 12287);
  } else if (_.contains(category, 'Spas & Salons')) {
    categoryIds.push(13421);
  } else if (_.contains(category, 'Beauty')) {
    categoryIds.push(5066, 12941, 198387, 5076, 5083);
  } else if(_.contains(category, 'Clothes')) {
    categoryIds.push(5063, 5066, 198387, 5076, 5061, 5077, 5082, 5083, 5085, 145695, 5087, 5088);
  } else if(_.contains(category, 'Gifts')) {
    categoryIds.push(11816, 5057, 5059, 5060, 13019, 5062, 12379, 13013, 5064, 5066, 24462, 198387, 5076, 12675, 5083, 5072, 12704);
  } else if(_.contains(category, 'Home')) {
    categoryIds.push(11816, 5057, 5059, 12379, 13013, 5064, 5065, 5066, 5074, 5075, 198387, 5076, 12675, 12853, 5071, 5079, 5080, 5083, 5087);
  } else if(_.contains(category, 'Services')) {
    categoryIds.push(5035, 190678, 190680, 190681, 5044, 190682, 5011, 185453, 96115, 13019, 5065, 5069, 12699, 5068, 12853, 12594, 5081, 5086);
  } else if(_.contains(category, 'For Kids')) {
    categoryIds.push(5033, 5046, 5048);
  }



  $.getJSON('http://www.visitpalmsprings.com/WebServices/QueryService.svc/BusinessSearch?method=?', {
    size: 20,
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
