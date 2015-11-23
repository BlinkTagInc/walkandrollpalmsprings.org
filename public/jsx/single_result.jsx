var React = require('react');
var Linkify = require('react-linkify');
var classNames = require('classnames');
var ModeMenu = require('./mode_menu.jsx');
var SiteMenu = require('./site_menu.jsx');
var he = require('he');
var helper = require('../js/helper.js');
var map = require('../js/map.js');


module.exports = class SingleResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMode: this.props.mode
    };

    this.calculateTripStatsFromGoogleDirections = (result) => {
      if(!result || !result.routes || !result.routes.length || !result.routes[0].legs || !result.routes[0].legs.length) {
        this.setState({
          distance: null,
          time: null,
          co2: null,
          calories: null
        });
        return;
      }

      var leg = result.routes[0].legs[0];
      var miles = helper.metersToMiles(leg.distance.value);

      this.setState({
        distance: miles,
        time: helper.secondsToMinutes(leg.duration.value),
        co2: helper.calculateCo2Saved(miles, this.props.mode),
        calories: helper.calculateCalories(miles, this.props.mode),
        directionsUrl: helper.formatDirectionsUrl(this.props.query.startAddress, this.props.place.street, this.props.mode)
      });
    };

    this.selectMode = (mode) => {
      this.props.selectMode(mode);
    };
  }

  calculateTripStatsFromDistance(miles) {
    this.setState({
      distance: miles.toFixed(1),
      calories: helper.calculateCalories(miles, this.props.mode),
      directionsUrl: helper.formatDirectionsUrl(this.props.query.startAddress, this.props.place.street, this.props.mode)
    });
  }

  renderThumbnail() {
    if(this.props.place.thumbnail) {
      return (
        <img src={'http://visitpalmsprings.com' + this.props.place.thumbnail} className="place-thumbnail" />
      );
    }
  }

  updateMap() {
    if(this.props.place.kml) {
      map.drawKML(this.props.place.kml);

      this.calculateTripStatsFromDistance(this.props.place.routeDistance);
    } else {
      var startCoords = this.props.query.startLocation;
      var startAddress = this.props.query.startAddress;
      var endCoords = [this.props.place.lat, this.props.place.lng];
      var endAddress = this.props.place.street;
      map.drawMap(startCoords, startAddress, endCoords, endAddress, this.props.mode, this.calculateTripStatsFromGoogleDirections);
    }
  }

  render() {
    let time;
    let co2;
    let calories;

    if(this.state.time) {
      time = (
        <div className="route-detail">
          <label>Time:</label>
          <span>{this.state.time} minutes</span>
        </div>
      );
    }

    if(this.state.co2) {
      co2 = (
        <div className="route-detail">
          <label>CO2:</label>
          <span>{this.state.co2} lbs. saved</span>
        </div>
      );
    }

    if(this.state.calories) {
      calories = (
        <div className="route-detail">
          <label>Health:</label>
          <span>{this.state.calories} calories burned</span>
        </div>
      );
    }


    return (
      <div>
        <div className="section-header section-teal" ref="sectionHeader">
          <ModeMenu mode={this.props.mode} selectMode={this.selectMode} />
          <h3 className="results-title">{this.props.place.title}</h3>
          <div className="selected-places">{this.props.place.street}</div>
        </div>

        <div className="place-details">
          {this.renderThumbnail()}
          <div className="place-description">
            <Linkify>{he.decode(this.props.place.content)}</Linkify>
          </div>
          <div id="map" className="map"></div>
        </div>

        <div className="route-details">
          <div className="route-detail">
            <label>Distance:</label>
            <span>{this.state.distance} miles</span>
          </div>
          {time}
          {co2}
          {calories}
          <a href={this.props.place.directionsUrl || this.state.directionsUrl} className="btn btn-use">Get Full Directions</a>
        </div>
        <SiteMenu selected="search" color="teal" />
      </div>
    );
  }

  componentDidMount() {
    this.updateMap();
  }

  componentDidUpdate() {
    if(this.state.currentMode !== this.props.mode) {
      this.setState({currentMode: this.props.mode});
      map.clearMap();
      this.updateMap();
    }
  }
};
