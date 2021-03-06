var _ = require('underscore');
var $ = require('jquery');
var places = [];

exports.getPlaces = function(categories, cb) {
  var categoryIds = [];

  //reset searched places
  places = [];

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
  // if (_.contains(categories, 'Casinos & Resorts')) {
  //   categoryIds.push(5037);
  // }
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
  if(_.contains(categories, 'Places of Worship')) {
    places.push(
      {
        lat: 33.8128511,
        lng: -116.5276045,
        street: '630 S Sunrise Way',
        title: 'Desert Chapel',
        websiteUrl: 'http://www.yelp.com/biz/desert-chapel-palm-springs'
      },
      {
        lat: 33.8163539,
        lng: -116.515946,
        street: '2800 E Ramon Rd',
        title: 'St Theresa Catholic Church',
        websiteUrl: 'http://www.yelp.com/biz/st-theresa-catholic-church-palm-springs'
      },
      {
        lat: 33.839939,
        lng: -116.506785,
        street: '1281 N Gene Autry Trl',
        title: 'The Fathers House',
        websiteUrl: 'http://www.yelp.com/biz/the-fathers-house-palm-springs'
      },
      {
        lat: 33.821039,
        lng: -116.541445,
        street: '204 S Calle El Segundo',
        title: 'Our Lady of Guadalupe',
        websiteUrl: 'http://www.yelp.com/biz/our-lady-of-guadalupe-palm-springs'
      },
      {
        lat: 33.8298978,
        lng: -116.547909,
        street: '151 W Alejo Rd',
        title: 'Our Lady of Solitude Catholic Church',
        websiteUrl: 'http://www.yelp.com/biz/our-lady-of-solitude-catholic-church-palm-springs'
      },
      {
        lat: 33.8308318,
        lng: -116.5504874,
        street: '332 W Alejo Rd',
        title: 'Temple Isaiah-Louis & Florence Kitsis Jcc',
        websiteUrl: 'http://www.yelp.com/biz/temple-isaiah-louis-and-florence-kitsis-jcc-palm-springs'
      },
      {
        lat: 33.8388402,
        lng: -116.5069725,
        street: '1243 N Gene Autry Trl Ste 115',
        title: 'Rebirth Temple Of Faith',
        websiteUrl: 'http://www.yelp.com/biz/rebirth-temple-of-faith-palm-springs'
      },
      {
        lat: 33.8522865299706,
        lng: -116.523741397943,
        street: '2100 E Racquet Club Rd',
        title: 'Palm Springs Spiritual Enrichment Center',
        websiteUrl: 'http://www.yelp.com/biz/palm-springs-spiritual-enrichment-center-palm-springs'
      },
      {
        lat: 33.8302588444047,
        lng: -116.529515024591,
        street: '1555 E Alejo Rd',
        title: 'United Methodist Church of Palm Springs',
        websiteUrl: 'http://www.yelp.com/biz/united-methodist-church-of-palm-springs-palm-springs'
      },
      {
        lat: 33.813633155201,
        lng: -116.528153252231,
        street: '620 S Sunrise Way',
        title: 'Seventh-Day Adventist Church',
        websiteUrl: 'http://www.yelp.com/biz/seventh-day-adventist-church-palm-springs'
      }
    );
  }
  if(_.contains(categories, 'Civic Resources')) {
    places.push(
      {
        lat: 33.801309315663,
        lng: -116.538020849268,
        street: '333 E Amado Rd',
        title: 'US Post Office',
        websiteUrl: 'http://www.yelp.com/biz/us-post-office-palm-springs'
      },
      {
        lat: 33.8263300555556,
        lng: -116.51071915588,
        street: '255 N El Cielo Rd',
        title: 'Airport Park Post Office',
        websiteUrl: 'http://www.yelp.com/biz/airport-park-post-office-palm-springs'
      },
      {
        lat: 33.801309315663,
        lng: -116.538020849268,
        street: '300 S Sunrise Way',
        title: 'Palm Springs Public Library',
        websiteUrl: 'http://www.yelp.com/biz/palm-springs-public-library-palm-springs-2'
      },
      {
        lat: 33.8232718470509,
        lng: -116.511797145136,
        street: '3200 E Tahquitz Canyon Way',
        title: 'City of Palm Springs',
        websiteUrl: 'http://www.yelp.com/biz/city-of-palm-springs-palm-springs'
      },
      {
        lat: 33.8268036356222,
        lng: -116.546933857827,
        street: '190 W Amado Rd',
        title: 'Palm Springs Chamber of Commerce',
        websiteUrl: 'http://www.yelp.com/biz/palm-springs-chamber-of-commerce-palm-springs'
      },
      {
        lat: 33.8273832,
        lng: -116.51053884412,
        street: '300 N El Cielo Rd',
        title: 'Palm Springs Fire Station',
        websiteUrl: 'http://www.yelp.com/biz/palm-springs-fire-station-palm-springs'
      },
      {
        lat: 33.8217173913633,
        lng: -116.512734047381,
        street: '200 S Civic Dr',
        title: 'Palm Springs Police Department',
        websiteUrl: 'http://www.yelp.com/biz/palm-springs-police-department-palm-springs'
      },
      {
        lat: 33.801335194649,
        lng: -116.527547058199,
        street: '1775 E Palm Canyon Dr',
        title: 'US Post Office',
        websiteUrl: 'http://www.yelp.com/biz/us-post-office-palm-springs-2'
      },
      {
        lat: 33.8377799535719,
        lng: -116.506211242227,
        street: '3700 E Tachevah Dr',
        title: 'Bureau Of Indian Affairs',
        websiteUrl: 'http://www.yelp.com/biz/bureau-of-indian-affairs-palm-springs'
      }
    );
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
        content: 'This is a 9.24 mi route in Palm Springs, CA, United States. The route has a total ascent of 2289 ft and has a maximum elevation of 10,687 ft.',
        lat: 33.812661,
        lng: -116.640053,
        street: 'Mt. Jacinto Peak',
        title: 'Mt. Jacinto Peak via Tramway',
        directionsUrl: 'http://www.mapmyride.com/routes/view/876625939',
        kml: 'mtjacinto.kml',
        routeDistance: 9.24,
        ignoreDistance: true
      },
      {
        content: '13 mi hike SJP via Skyline Trail - Lykken Trail - Ramon Rd.',
        lat: 33.815889155,
        lng: -116.555993557,
        title: 'Skyline (Flat rock to Grubbs notch)',
        directionsUrl: 'http://www.mapmyride.com/routes/view/882509147',
        kml: 'skyline.kml',
        routeDistance: 13,
        ignoreDistance: true
      },
      {
        content: 'This is a 10 mi Walk/Run circling Palm Springs. It has a total ascent of 361 ft and has a maximum elevation of 618 ft.',
        lat: 33.828134,
        lng: -116.517391,
        title: 'Palm Springs Circle Tour',
        directionsUrl: 'http://www.mapmyride.com/us/palm-springs-ca/10-03-mi-run-in-palm-springs-on-oct-21-2-route-147739787',
        kml: 'circle.kml',
        routeDistance: 10,
        ignoreDistance: true
      },
      {
        content: 'A Taquitz River stroll.',
        lat: 33.801265,
        lng: -116.539412,
        title: 'Taquitz River',
        directionsUrl: 'http://www.mapmyrun.com/us/palm-springs-ca/2-04mi-run-on-7-24-13-route-252665347',
        kml: 'taquitz_river.kml',
        routeDistance: 2,
        ignoreDistance: true
      },
      {
        content: 'Walk or run through old Las Palmas',
        lat: 33.8339556015,
        lng: -116.542410851,
        title: 'Old Las Palmas',
        directionsUrl: 'http://www.mapmyrun.com/us/palm-springs-ca/palm-springs-run-route-1748299',
        kml: 'old_las_palmas.kml',
        routeDistance: 5.25,
        ignoreDistance: true
      },
      {
        content: 'Short Tram Way Climb',
        lat: 33.856714,
        lng: -116.56001,
        title: 'Short Tram Way Climb',
        directionsUrl: 'http://www.mapmyrun.com/us/palm-springs-ca/3-78mi-run-on-10-26-13-route-315451419',
        kml: 'short_tram_way_climb.kml',
        routeDistance: 3.78,
        elevation: 1897,
        ignoreDistance: true
      },
      {
        content: 'Palm Springs Art Museum walk',
        lat: 33.82462,
        lng: -116.550573,
        title: 'Palm Springs Art Museum',
        directionsUrl: 'http://www.mapmyrun.com/us/palm-springs-ca/3-58mi-run-on-1-14-13-route-165904718',
        kml: 'art_museum.kml',
        routeDistance: 3.6,
        elevation: 1044,
        ignoreDistance: true
      },
      {
        content: 'Demuth Park',
        lat: 33.815585,
        lng: -116.501833,
        title: 'Demuth Park',
        directionsUrl: 'http://www.mapmyrun.com/us/palm-springs-ca/4-00mi-run-on-11-2-12-route-150784875',
        kml: 'demuth_park.kml',
        routeDistance: 4,
        elevation: 62,
        ignoreDistance: true
      },
      {
        content: 'Old Cielo Road',
        lat: 33.8103534809,
        lng: -116.504387855,
        title: 'Old Cielo Road',
        directionsUrl: 'http://www.mapmyrun.com/us/palm-springs-ca/palm-springs-nr-airport-route-1638890',
        kml: 'old_cielo_road.kml',
        routeDistance: 12,
        ignoreDistance: true
      }
    );
  }
  if(_.contains(categories, 'Bike Routes')) {
    places.push(
      {
        content: 'This is a 28 mi route in Palm Springs, CA, United States. The route has a total ascent of 454 ft and has a maximum elevation of 474 ft.',
        street: 'Palm Canyon Drive',
        title: 'Ride To the River',
        directionsUrl: 'http://www.mapmyride.com/routes/view/673616458',
        kml: 'totheriver.kml',
        routeDistance: 28.39,
        ignoreDistance: true
      },
      {
        content: 'This is a 18 mi route in Palm Springs, CA, United States. The route has a total ascent of 415 ft and has a maximum elevation of 600 ft.',
        street: 'Palm Canyon Drive',
        title: 'City Loop',
        directionsUrl: 'http://www.mapmyride.com/routes/view/673616458',
        kml: 'cityloop.kml',
        routeDistance: 18.34,
        ignoreDistance: true
      },
      {
        content: 'This is a 19 mi route in Palm Springs, CA, United States. The route has a total ascent of 771 ft and has a maximum elevation of 815 ft.',
        street: 'Palm Canyon Drive',
        title: 'City Spin with Belardo Climb',
        directionsUrl: 'http://www.mapmyride.com/routes/view/627557348',
        kml: 'cityspinwithbelardoclimb.kml',
        routeDistance: 19.33,
        ignoreDistance: true
      },
      {
        content: 'Taquitz Creek Loop',
        title: 'Taquitz Creek Loop',
        directionsUrl: 'https://www.google.com/maps/d/edit?mid=zDH0TLBKql5g.kTn4ULbApVwM',
        kml: 'taquitz_creek_loop.kml',
        ignoreDistance: true
      },
      {
        content: 'Las Palmas Loop',
        title: 'Las Palmas Loop',
        directionsUrl: 'https://www.google.com/maps/d/u/0/edit?mid=zDH0TLBKql5g.k02LcTPC1mcQ',
        kml: 'las_palmas_loop.kml',
        ignoreDistance: true
      },
      {
        content: 'Gene Autry Bikeway',
        title: 'Gene Autry Bikeway',
        directionsUrl: 'https://www.google.com/maps/d/edit?mid=zDH0TLBKql5g.kgDSDCVdGrRE',
        kml: 'gene_autry_bikeway.kml',
        ignoreDistance: true
      },
      {
        content: 'Downtown Loop',
        title: 'Downtown Loop',
        directionsUrl: 'https://www.google.com/maps/d/edit?mid=zDH0TLBKql5g.kzQ4F3G3JbJA',
        kml: 'downtown_loop.kml',
        ignoreDistance: true
      },
      {
        content: 'Deepwell Loop',
        title: 'Deepwell Loop',
        directionsUrl: 'https://www.google.com/maps/d/edit?mid=zDH0TLBKql5g.kM0cWVkM-XsY',
        kml: 'deepwell_loop.kml',
        ignoreDistance: true
      },
      {
        content: 'Citywide Loop',
        title: 'Citywide Loop',
        directionsUrl: 'https://www.google.com/maps/d/edit?mid=zDH0TLBKql5g.keiVDyjiMmCE',
        kml: 'citywide_loop.kml',
        ignoreDistance: true
      },
      {
        content: 'Canyon Country Club Loop',
        title: 'Canyon Country Club Loop',
        directionsUrl: 'https://www.google.com/maps/d/edit?mid=zDH0TLBKql5g.kjiwCo6p1xqw',
        kml: 'canyon_country_club_loop.kml',
        ignoreDistance: true
      }
    );
  }
  if(_.contains(categories, 'Transit Stops')) {
    places.push(
      {
        content: 'The BUZZ',
        title: 'The BUZZ',
        directionsUrl: 'http://new.buzzps.com/route.html',
        kml: 'buzz.kml',
        ignoreDistance: true
      },
      {
        content: 'Sunline Transit Route 14',
        title: 'Sunline Transit Route 14',
        directionsUrl: 'http://www.sunline.org/pub/schedules/2015/sept2015/Line_14.pdf',
        json: 'sunline14.json',
        ignoreDistance: true
      },
      {
        content: 'Sunline Transit Route 24',
        title: 'Sunline Transit Route 24',
        directionsUrl: 'http://www.sunline.org/pub/schedules/2015/sept2015/Line_24.pdf',
        json: 'sunline24.json',
        ignoreDistance: true
      },
      {
        content: 'Sunline Transit Route 30',
        title: 'Sunline Transit Route 30',
        directionsUrl: 'http://www.sunline.org/pub/schedules/2015/sept2015/Line_30.pdf',
        json: 'sunline30.json',
        ignoreDistance: true
      },
      {
        content: 'Sunline Transit Route 32',
        title: 'Sunline Transit Route 32',
        directionsUrl: 'http://www.sunline.org/pub/schedules/2015/sept2015/Line_32.pdf',
        json: 'sunline32.json',
        ignoreDistance: true
      },
      {
        content: 'Sunline Transit Route 111',
        title: 'Sunline Transit Route 111',
        directionsUrl: 'http://www.sunline.org/pub/schedules/2015/sept2015/Line_111.pdf',
        json: 'sunline111.json',
        ignoreDistance: true
      }
    );
  }

  $.getJSON('http://www.visitpalmsprings.com/WebServices/QueryService.svc/BusinessSearch?method=?', {
    size: 1000,
    features: '(' + categoryIds.join(',') + ')'
  }).done(function(data) {
    if (data && data.d && data.d.items && data.d.items.length) {
      places = data.d.items.concat(places);

      cb(null, places);
    } else if(places) {
      cb(null, places);
    } else {
      cb(new Error('Invalid Response'));
    }
  }).error(function(e) {
    cb(e);
  });
};

exports.getSavedPlaces = function() {
  return places;
};
