var config = require('./config.js');
var _ = require('underscore');
var map;

require('mapbox.js');

// Setup mapbox
L.mapbox.accessToken = config.mapboxToken;


exports.drawMap = function(center, centerAddress) {
  var map = L.mapbox.map('map', 'walkandrollpalmsprings.659284f6', {center: center, zoom: 13});
  var startIcon = L.icon({
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0,-25],
    iconUrl: '/images/icon-start.png'
  });

  L.marker(center, {title: 'Start Location', icon: startIcon})
    .bindPopup(centerAddress)
    .addTo(map);
};
