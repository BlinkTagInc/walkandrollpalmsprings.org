var config = require('./config.js');
var _ = require('underscore');
var $ = require('jquery');
var polyline = require('polyline');
var leafletPip = require('leaflet-pip');
require('mapbox.js');

var map;
var places = L.featureGroup();
var bounds;

// Setup mapbox
L.mapbox.accessToken = config.mapboxToken;


exports.calculateDistanceMi = function(lat1, lon1, lat2, lon2) {
  function toRadians(degree) {
    return (degree * (Math.PI / 180));
  }
  var radius = 3959.0; //Earth Radius in mi
  var radianLat1 = toRadians(lat1);
  var radianLon1 = toRadians(lon1);
  var radianLat2 = toRadians(lat2);
  var radianLon2 = toRadians(lon2);
  var radianDistanceLat = radianLat1 - radianLat2;
  var radianDistanceLon = radianLon1 - radianLon2;
  var sinLat = Math.sin(radianDistanceLat / 2.0);
  var sinLon = Math.sin(radianDistanceLon / 2.0);
  var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLon, 2.0);
  var d = radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
  return d;
};


function formatPopup(location) {
  var popup = '<strong>' + location.title + '</strong>';
  popup += '<br>' + location.content;
  popup += '<br><a href="#">View Details &rarr;</a>';

  return popup;
}


function getMode(mode) {
  if(mode === 'walk') {
    return google.maps.TravelMode.WALKING;
  } else if(mode === 'bike') {
    return google.maps.TravelMode.BICYCLING;
  } else if(mode === 'transit') {
    return google.maps.TravelMode.TRANSIT;
  }
}


function getDirections(startLocation, endLocation, mode, cb) {
  var directionsService = new google.maps.DirectionsService();

  var request = {
    origin: startLocation[0] + ',' + startLocation[1],
    destination: endLocation[0] + ',' + endLocation[1],
    travelMode: getMode(mode)
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      L.polyline(polyline.decode(result.routes[0].overview_polyline), {
        color: '#18A071',
        opacity: '0.9',
        weight: 3
      }).addTo(map);

      cb(result);
    }
  });
}


exports.drawMap = function(startLocation, startAddress, endLocation, endAddress, mode, cb) {
  bounds = L.latLngBounds(startLocation, endLocation);
  map = L.mapbox.map('map', 'walkandrollpalmsprings.659284f6', {center: bounds.getCenter(), zoom: 14});

  map.fitBounds(bounds, {padding: [20, 20]});

  getDirections(startLocation, endLocation, mode, cb);

  var startIcon = L.icon({
    iconSize: [30, 47],
    iconAnchor: [15, 47],
    popupAnchor: [0, -47],
    iconUrl: '/images/icon-start.png'
  });

  var endIcon = L.icon({
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
    iconUrl: '/images/icon-end.png'
  });

  L.marker(startLocation, {title: 'Start Location', icon: startIcon})
    .bindPopup(startAddress)
    .addTo(map);

  L.marker(endLocation, {title: 'End Location', icon: endIcon})
    .bindPopup(endAddress)
    .addTo(map);
};


exports.clearMap = function() {
  map.remove();
};


exports.drawNeighborhoodsMap = function(selectNeighborhood) {
  map = L.mapbox.map('map', 'walkandrollpalmsprings.659284f6')
    .setView([33.8163, -116.5453], 11);

  var colors = ['#F19079', '#FBC280', '#C6BEDA', '#FCE59E'];
  var labels = L.mapbox.featureLayer();

  $.getJSON('/data/neighborhoods.geojson', function(data) {
    var neighborhoods = L.geoJson(data, {
      pointToLayer: L.mapbox.marker.style,
      style: function() {
        return {
          fillColor: _.sample(colors),
          fillOpacity: 0.9,
          weight: 1,
          color: '#000000'
        };
      },
      onEachFeature: function(feature, layer) {
        var label = L.marker(layer.getBounds().getCenter(), {
          icon: L.divIcon({
            className: 'map-label',
            html: feature.properties.NAME,
            iconSize: [100, 40]
          })
        }).addTo(labels);

        layer.on({click: function(e) {
          selectNeighborhood(e.target);
        }});
      }

    }).addTo(map);
  });

  map.on('zoomend', function() {
    if (map.getZoom() > 13) {
      map.addLayer(labels);
    } else {
      if(map.hasLayer(labels)) {
        map.removeLayer(labels);
      }
    }
  });
};


exports.resizeMap = function() {
  map.invalidateSize();
};


exports.updateMap = function(locations) {
  locations.forEach(function(location, idx) {
    var marker = L.marker([location.lat, location.lng], {
      title: location.title,
      icon:  L.mapbox.marker.icon({'marker-size': 'large', 'marker-color': '#EE7458', 'marker-symbol': (idx + 1)})
    }).bindPopup(formatPopup(location));
    places.addLayer(marker);
    bounds.extend([location.lat, location.lng]);
  });

  if(bounds) {
    map.fitBounds(bounds.pad(0.1));
  }
};


exports.isNearPalmSprings = function(latlng) {
  var palmSprings = [33.8303, -116.5453];
  var maximumDistanceMi = 30;
  return (exports.calculateDistanceMi(latlng[0], latlng[1], palmSprings[0], palmSprings[1]) <= maximumDistanceMi);
};


exports.neighborhoodFromPoint = function(lnglat, cb) {
  $.getJSON('/data/neighborhoods.geojson', function(data) {
    var neighborhoods = L.geoJson(data, {pointToLayer: L.mapbox.marker.style});

    var layers = leafletPip.pointInLayer(lnglat, neighborhoods, true);

    cb(null, layers.length ? layers[0] : null);
  });
};
