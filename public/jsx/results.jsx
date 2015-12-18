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
      places: [],
      loading: true
    };

    this.selectMode = (mode) => {
      this.setState({mode: mode});
    };
  }

  sortByDistance(places) {
    if(!this.props.location || !this.props.location.query || !this.props.location.query.startLocation) {
      return places;
    }

    var startLat = this.props.location.query.startLocation[0];
    var startLon = this.props.location.query.startLocation[1];
    return _.sortBy(places, (place) => {
      place.distance = map.calculateDistanceMi(place.lat, place.lng, startLat, startLon);
      return place.distance;
    });
  }

  render() {
    var mode = this.state.mode || this.props.location.query.mode || 'walk';
    if(this.props.params && this.props.params.place) {
      var place = _.findWhere(places.getSavedPlaces(), {title: this.props.params.place});

      if(place) {
        return (
          <SingleResult
            query={this.props.location.query}
            place={place}
            mode={mode}
            selectMode={this.selectMode} />
        );
      } else {
        return (
          <div className="loading">Loading</div>
        );
      }
    } else {
      return (
        <ResultsList
          query={this.props.location.query}
          places={this.state.places}
          mode={mode}
          selectMode={this.selectMode}
          loading={this.state.loading} />
      );
    }
  }

  componentDidMount() {
    let categories;

    if(this.props.params.category) {
      categories = this.props.params.category.split(',');
    } else {
      categories = this.props.location.query.categories;
    }

    places.getPlaces(categories, (e, data) => {
      if (e) {
        console.error(e);
      }
      this.setState({
        places: this.sortByDistance(data),
        loading: false
      });
    });
  }
};
