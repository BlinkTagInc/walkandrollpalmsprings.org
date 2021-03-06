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

    this.state = {};

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

    this.logTrip = (e) => {
      e.preventDefault();

      window.location = this.state.directionsUrl;
    };
  }

  calculateTripStatsFromDistance(miles) {
    if(miles) {
      this.setState({
        distance: miles.toFixed(1),
        calories: helper.calculateCalories(miles, this.props.mode),
        directionsUrl: helper.formatDirectionsUrl(this.props.query.startAddress, this.props.place.street, this.props.mode)
      });
    }
  }

  renderThumbnail() {
    if(this.props.place.thumbnail) {
      return (
        <img src={'http://visitpalmsprings.com' + this.props.place.thumbnail} className="place-thumbnail" />
      );
    }
  }

  updateMap() {
    if(!this.props.place) {
      map.drawMap(this.props.query.startLocation, this.props.query.startAddress, null, null, this.props.mode, this.calculateTripStatsFromGoogleDirections);
    } if(this.props.place.kml) {
      map.drawKML(this.props.place.kml);
      this.calculateTripStatsFromDistance(this.props.place.routeDistance);
    } else if(this.props.place.json) {
      map.drawJSON(this.props.place.json);
      this.calculateTripStatsFromDistance(this.props.place.routeDistance);
    } else {
      map.drawMap(this.props.query.startLocation, this.props.query.startAddress, [this.props.place.lat, this.props.place.lng], this.props.place.street, this.props.mode, this.calculateTripStatsFromGoogleDirections);
    }
  }

  buildTwitterShareUrl(text) {
    let shareUrl = 'https://twitter.com/intent/tweet';
    shareUrl += `?&text=${encodeURIComponent(text)}`;
    shareUrl += `&tw_p=tweetbutton`;

    return shareUrl;
  }

  buildFacebookShareUrl(url) {
    let shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    return shareUrl;
  }

  render() {
    let distance;
    let time;
    let co2;
    let calories;
    let directionsButton;

    if(this.state.distance) {
      distance = (
        <div className="route-detail">
          <label>Distance:</label>
          <span>{this.state.distance} miles</span>
        </div>
      );
    }

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

    if(this.props.place.directionsUrl) {
      directionsButton = (
        <a href={this.props.place.directionsUrl} className="btn btn-use">See Route Details</a>
      );
    } else if(this.state.directionsUrl) {
      directionsButton = (
        <a href={this.state.directionsUrl} onClick={this.logTrip} className="btn btn-use">Get Full Directions</a>
      );
    }

    var gerunds = {
      walk: 'walking',
      bike: 'biking',
      transit: 'taking transit'
    };

    var email = `mailto:?subject=My Route on Walk and Roll: Palm Springs&body=I'm ${gerunds[this.props.mode]} to ${this.props.place.title}. See my route on WalkandRollPalmSprings.org.`;
    var twitter = this.buildTwitterShareUrl(`I'm ${gerunds[this.props.mode]} to ${this.props.place.title.replace(/^(.{40}[^\s]*).*/, "$1")}. See my route on http://walkandRollPalmSprings.org.`);
    var facebook = this.buildFacebookShareUrl('http://walkandrollpalmsprings.org');

    var description;
    if(typeof Symbol !== 'undefined') {
      // Linkify doesn't support IE
      description = <Linkify>{he.decode(this.props.place.content || '')}</Linkify>;
    } else {
      description = he.decode(this.props.place.content || '');
    }

    return (
      <div>
        <div className="section-header section-teal" ref="sectionHeader">
          <ModeMenu mode={this.props.mode} selectMode={this.selectMode} />
          <h3 className="results-title">{this.props.place.title}</h3>
          <div className="selected-categories">{this.props.place.street}</div>
        </div>

        <div className="place-details">
          {this.renderThumbnail()}
          <div className="place-description">
            {description}
          </div>
          <div id="map" className="map"></div>
        </div>

        <div className="route-details">
          {distance}
          {time}
          {co2}
          {calories}
          {directionsButton}
        </div>
        <div className="share-section">
          <h3>Tell your friends about your route</h3>
          <div className="share-links">
            <a className="email-link" href={email} target="_blank">
              <i className="fa fa-envelope-o"></i><span>Email</span>
            </a>
            <a className="twitter-link" href={twitter} target="_blank">
              <i className="fa fa-twitter"></i><span>Tweet</span>
            </a>
            <a className="facebook-link" href={facebook} target="_blank">
              <i className="fa fa-facebook"></i><span>Facebook</span>
            </a>
          </div>
        </div>
        <SiteMenu selected="search" color="teal" />
      </div>
    );
  }

  componentDidMount() {
    this.updateMap();

    this.setState({currentMode: this.props.mode});
  }

  componentDidUpdate() {
    if(this.state.currentMode !== this.props.mode) {
      this.setState({currentMode: this.props.mode});
      map.clearMap();
      this.updateMap();
    }
  }
};
