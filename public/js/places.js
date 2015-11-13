var _ = require('underscore');
var $ = require('jquery');

exports.getPlaces = function(categories, cb) {
  var categoryIds = [];
  var places = [];

  if (_.contains(categories, 'Fresh Groceries')) {
    categoryIds.push(5073, 5084);
  }
  if (_.contains(categories, 'Prepared Foods')) {
    categoryIds.push(5009, 5013, 5015, 5058, 5073, 5084);
  }
  if (_.contains(categories, 'Restaurants')) {
    categoryIds.push(5007,5008,5009,5010,135916,5012,5013,5014,16204,5015,121643,5016,5017,5018,5019,5020,145762,78819,5021,5022,5023,5024,5025,11803,5026,123343,5027,11784,5028,186758,5029,5030,253446,5058);
  }
  if (_.contains(categories, 'Arts & Culture')) {
    categoryIds.push(5033, 5045, 5046, 5055, 5070, 5074);
  }
  if (_.contains(categories, 'Casinos & Resorts')) {
    categoryIds.push(5037);
  }
  if (_.contains(categories, 'Nightlife')) {
    categoryIds.push(5045, 13466, 5055, 5025);
  }
  if (_.contains(categories, 'Parks & Attractions')) {
    categoryIds.push(5031, 5032, 5056, 5034, 12437, 5035, 5036, 14520, 5041, 247639, 5042, 5043, 5047, 5048, 249862, 5049, 5051, 5052, 5053, 5054, 12287);
  }
  if (_.contains(categories, 'Spas & Salons')) {
    categoryIds.push(13421);
  }
  if (_.contains(categories, 'Beauty')) {
    categoryIds.push(5066, 12941, 198387, 5076, 5083);
  }
  if(_.contains(categories, 'Clothes')) {
    categoryIds.push(5063, 5066, 198387, 5076, 5061, 5077, 5082, 5083, 5085, 145695, 5087, 5088);
  }
  if(_.contains(categories, 'Gifts')) {
    categoryIds.push(11816, 5057, 5059, 5060, 13019, 5062, 12379, 13013, 5064, 5066, 24462, 198387, 5076, 12675, 5083, 5072, 12704);
  }
  if(_.contains(categories, 'Home')) {
    categoryIds.push(11816, 5057, 5059, 12379, 13013, 5064, 5065, 5066, 5074, 5075, 198387, 5076, 12675, 12853, 5071, 5079, 5080, 5083, 5087);
  }
  if(_.contains(categories, 'Services')) {
    categoryIds.push(5035, 190678, 190680, 190681, 5044, 190682, 5011, 185453, 96115, 13019, 5065, 5069, 12699, 5068, 12853, 12594, 5081, 5086);
  }
  if(_.contains(categories, 'For Kids')) {
    categoryIds.push(5033, 5046, 5048);
  }
  if(_.contains(categories, 'Outdoor Markets')) {
    places.push(
      {
        city: 'La Quinta',
        content: 'On Sundays in Old Town La Quinta, from 8:00 am to 12:30 pm, at 78100 Main Street, just a few blocks west of La Quinta City Hall off Calle Tampico. For more information, visit http://certifiedfarmersmarket.org.',
        lat: 33.677924,
        lng: -116.302392,
        street: '78100 Main Street',
        title: 'La Quinta Farmer\'s Market',
        websiteUrl: 'http://certifiedfarmersmarket.org',
        ignoreDistance: true
      },
      {
        city: 'Palm Desert',
        content: 'On Wednesdays in Palm Desert, from 4:00pm to 8pm, at the Palm Desert Chamber of Commerce, 72-559 Highway 111. For more information, visit http://certifiedfarmersmarket.org.',
        lat: 33.729862,
        lng: -116.403492,
        street: '72-559 Highway 111',
        title: 'Palm Desert Farmer\'s Market',
        websiteUrl: 'http://certifiedfarmersmarket.org',
        ignoreDistance: true
      },
      {
        city: 'Palm Springs',
        content: 'On Saturdays in Palm Springs, from 8:00 am to 12:30 pm, adjacent to the Camelot Theatres in the Palm Springs Mall parking lot at 2300 E. Baristo Road at Farrell. For more information, visit http://certifiedfarmersmarket.org.',
        lat: 33.819706,
        lng: -116.521460,
        street: '2300 E. Baristo Road',
        title: 'Palm Springs Farmer\'s Market',
        websiteUrl: 'http://certifiedfarmersmarket.org',
        ignoreDistance: true
      }
    );
  }
  if(_.contains(categories, 'Running & Walking')) {
    places.push(
      {
        city: 'Palm Springs',
        content: 'This is a 9.24 mi route in Palm Springs, CA, United States. The route has a total ascent of 2289 ft and has a maximum elevation of 10,687 ft.',
        lat: 33.812661,
        lng: -116.640053,
        street: 'Mt. Jacinto Peak',
        title: 'Mt. Jacinto Peak via Tramway',
        websiteUrl: 'http://www.mapmyride.com/routes/view/876625939',
        kml: 'mtjacinto.kml',
        routeDistance: 9.24,
        ignoreDistance: true
      },
      {
        city: 'Palm Springs',
        content: '13 mi hike SJP via Skyline Trail - Lykken Trail - Ramon Rd.',
        lat: 33.815889155,
        lng: -116.555993557,
        title: 'Skyline (Flat rock to Grubbs notch)',
        websiteUrl: 'http://www.mapmyride.com/routes/view/882509147',
        kml: 'skyline.kml',
        routeDistance: 13,
        ignoreDistance: true
      },
      {
        city: 'Palm Springs',
        content: 'This is a 10 mi Walk/Run circling Palm Springs. It has a total ascent of 361 ft and has a maximum elevation of 618 ft.',
        lat: 33.828134,
        lng: -116.517391,
        title: 'Palm Springs Circle Tour',
        websiteUrl: 'http://www.mapmyride.com/us/palm-springs-ca/10-03-mi-run-in-palm-springs-on-oct-21-2-route-147739787',
        kml: 'circle.kml',
        routeDistance: 10,
        ignoreDistance: true
      }
    );
  }
  if(_.contains(categories, 'Bike Routes')) {
    places.push(
      {
        city: 'Palm Springs',
        content: 'This is a 28 mi route in Palm Springs, CA, United States. The route has a total ascent of 454 ft and has a maximum elevation of 474 ft.',
        street: 'Palm Canyon Drive',
        title: 'Ride To the River',
        websiteUrl: 'http://www.mapmyride.com/routes/view/673616458',
        kml: 'totheriver.kml',
        routeDistance: 28.39,
        ignoreDistance: true
      },
      {
        city: 'Palm Springs',
        content: 'This is a 18 mi route in Palm Springs, CA, United States. The route has a total ascent of 415 ft and has a maximum elevation of 600 ft.',
        street: 'Palm Canyon Drive',
        title: 'City Loop',
        websiteUrl: 'http://www.mapmyride.com/routes/view/673616458',
        kml: 'cityloop.kml',
        routeDistance: 18.34,
        ignoreDistance: true
      },
      {
        city: 'Palm Springs',
        content: 'This is a 19 mi route in Palm Springs, CA, United States. The route has a total ascent of 771 ft and has a maximum elevation of 815 ft.',
        street: 'Palm Canyon Drive',
        title: 'City Spin with Belardo Climb',
        websiteUrl: 'http://www.mapmyride.com/routes/view/627557348',
        kml: 'cityspinwithbelardoclimb.kml',
        routeDistance: 19.33,
        ignoreDistance: true
      }
    );
  }

  $.getJSON('http://www.visitpalmsprings.com/WebServices/QueryService.svc/BusinessSearch?method=?', {
    size: 20,
    features: '(' + categoryIds.join(',') + ')'
  }).done(function(data) {
    if (data && data.d && data.d.items && data.d.items.length) {
      var results = data.d.items.concat(places);

      cb(null, results);
    } else if(places) {
      cb(null, places);
    } else {
      cb(new Error('Invalid Response'));
    }
  }).error(function(e) {
    cb(e);
  });
};
