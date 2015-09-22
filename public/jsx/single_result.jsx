var React = require('react');
var classNames = require('classnames');
var ModeMenu = require('./mode_menu.jsx');
var he = require('he');
var helper = require('../js/helper.js');
var map = require('../js/map.js');


module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },

  selectMode: function(mode) {
    this.props.selectMode(mode);

    map.clearMap();

    var startCoords = this.props.query.startLocation;
    var startAddress = this.props.query.startAddress;
    var endCoords = [this.props.place.lat, this.props.place.lng];
    var endAddress = this.props.place.street;
    map.drawMap(startCoords, startAddress, endCoords, endAddress, mode, this.updateDirections);
  },

  updateDirections: function(result) {
    if(!result || !result.routes || !result.routes.length || !result.routes[0].legs || !result.routes[0].legs.length) {
      this.setState({
        distance: null,
        time: null,
        co2: null,
        health: null
      });
      return;
    }

    var leg = result.routes[0].legs[0];

    this.setState({
      distance: helper.metersToMiles(leg.distance.value) + ' miles',
      time: helper.secondsToMinutes(leg.duration.value) + ' minutes',
      co2: helper.calculateCo2Saved(leg.distance.value, this.props.mode) + ' lbs. saved',
      health: helper.calculateCalories(leg.distance.value, leg.duration.value, this.props.mode) + ' calories burned',
      directionsUrl: helper.formatDirectionsUrl(this.props.query.startAddress, this.props.place.street, this.props.mode)
    });
  },

  render: function() {
    return (
      <div>
        <div className="section-header section-teal" ref="sectionHeader">
          <ModeMenu mode={this.props.mode} selectMode={this.selectMode} />
          <h3 className="results-title">{this.props.place.title}</h3>
          <div className="selected-places">{this.props.place.street}</div>
        </div>

        <div className="place-details">
          <img src={'http://visitpalmsprings.com' + this.props.place.thumbnail} className="place-thumbnail" />
          <div className="place-description">
            {he.decode(this.props.place.content)}
          </div>
          <div id="map" className="map"></div>
        </div>

        <div className="route-details">
          <div className="route-detail">
            <label>Distance:</label>
            <span>{this.state.distance}</span>
          </div>
          <div className="route-detail">
            <label>Time:</label>
            <span>{this.state.time}</span>
          </div>
          <div className="route-detail">
            <label>CO2:</label>
            <span>{this.state.co2}</span>
          </div>
          <div className="route-detail">
            <label>Health:</label>
            <span>{this.state.health}</span>
          </div>
          <a href={this.state.directionsUrl} className="btn btn-use">I will use<br /> this route!</a>
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    var startCoords = this.props.query.startLocation;
    var startAddress = this.props.query.startAddress;
    var endCoords = [this.props.place.lat, this.props.place.lng];
    var endAddress = this.props.place.street;
    map.drawMap(startCoords, startAddress, endCoords, endAddress, this.props.mode, this.updateDirections);
  }
});
