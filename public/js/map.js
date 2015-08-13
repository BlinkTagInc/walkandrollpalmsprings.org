var config = require('./config.js');
var _ = require('underscore');
require('mapbox.js');

var map;
var places = L.featureGroup();
var bounds;

// Setup mapbox
L.mapbox.accessToken = config.mapboxToken;


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


exports.resizeMap = function() {
  map.invalidateSize();
};


function formatPopup(location) {
  var popup = '<strong>' + location.title + '</strong>';
  popup += '<br>' + location.content;
  popup += '<br><a href="#">View Details &rarr;</a>';

  return popup;
}


exports.updateMap = function(locations) {
  places.clearLayers();

  locations.forEach(function(location, idx) {
    var marker = L.marker([location.lat, location.lng], {
      title: location.title,
      icon:  L.mapbox.marker.icon({'marker-size': 'large', 'marker-color': '#EE7458', 'marker-symbol': (idx + 1)})
    }).bindPopup(formatPopup(location));
    places.addLayer(marker);
    bounds.extend([location.lat, location.lng]);
  });

  map.fitBounds(bounds.pad(0.1));
};
