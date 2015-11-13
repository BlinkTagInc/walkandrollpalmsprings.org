var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');
var ResultsList = require('./results_list.jsx');
var SingleResult = require('./single_result.jsx');
var map = require('../js/map');
var places = require('../js/places');


module.exports = class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: this.props.location.query.mode,
      places: [],
      selectedPlace: null
    };

    this.selectPlace = (place) => {
      this.setState({selectedPlace: place});
    };

    this.selectMode = (mode) => {
      this.setState({mode: mode});
    };
  }

  sortByDistance(places) {
    var startLat = this.props.location.query.startLocation[0];
    var startLon = this.props.location.query.startLocation[1];
    return _.sortBy(places, (place) => {
      place.distance = map.calculateDistanceMi(place.lat, place.lng, startLat, startLon);
      return place.distance;
    });
  }

  render() {
    if(this.state.selectedPlace) {
      return (
        <SingleResult
          query={this.props.location.query}
          place={this.state.selectedPlace}
          mode={this.state.mode}
          selectMode={this.selectMode} />
      );
    } else {
      return (
        <ResultsList
          query={this.props.location.query}
          places={this.state.places}
          selectPlace={this.selectPlace}
          mode={this.state.mode}
          selectMode={this.selectMode} />
      );
    }
  }

  componentDidMount() {
    places.getPlaces(this.props.location.query.places, function(e, data) {
      if (e) {
        console.error(e);
      }
      this.setState({places: this.sortByDistance(data)});
    }.bind(this));
  }
};
