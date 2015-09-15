var config = require('./config.js');
var _ = require('underscore');
var $ = require('jquery');
require('mapbox.js');

var map;
var places = L.featureGroup();
var bounds;

// Setup mapbox
L.mapbox.accessToken = config.mapboxToken;


function calculateDistanceMi(lat1, lon1, lat2, lon2) {
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
}


function formatPopup(location) {
  var popup = '<strong>' + location.title + '</strong>';
  popup += '<br>' + location.content;
  popup += '<br><a href="#">View Details &rarr;</a>';

  return popup;
}


exports.drawMap = function(center, centerAddress) {
  map = L.mapbox.map('map', 'walkandrollpalmsprings.659284f6', {center: center, zoom: 13});
  places.addTo(map);

  var startIcon = L.icon({
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0,-25],
    iconUrl: '/images/icon-start.png'
  });

  L.marker(center, {title: 'Start Location', icon: startIcon})
    .bindPopup(centerAddress)
    .addTo(map);

  bounds = L.latLngBounds(center, center);
};


exports.drawNeighborhoodsMap = function() {
  map = L.mapbox.map('map', 'mapbox.streets')
    .setView([33.8163, -116.5453], 12);

  var colors = ['#91D4BF', '#EE7458', '#F89A2C', '#FCF8CE'];
  var labels = L.mapbox.featureLayer();

  $.getJSON('/data/neighborhoods.geojson', function(data) {
    var neighborhoods = L.geoJson(data, {
      pointToLayer: L.mapbox.marker.style,
      style: function() {
        return {
          fillColor: _.sample(colors),
          fillOpacity: 0.9,
          weight: 0
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
  var palmSprings = [33.8303,-116.5453];
  var maximumDistanceMi = 30;
  return (calculateDistanceMi(latlng[0], latlng[1], palmSprings[0], palmSprings[1]) <= maximumDistanceMi);
};
