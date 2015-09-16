var React = require('react');
var classNames = require('classnames');
var ResultsList = require('./results_list.jsx');
var SingleResult = require('./single_result.jsx');
var places = require('../js/places.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      mode: this.props.query.mode,
      places: [],
      selectedPlace: null
    };
  },

  selectMode: function(mode) {
    this.setState({mode: mode});
  },

  selectPlace: function(place) {
    this.setState({selectedPlace: place});
  },

  render: function() {
    if(this.state.selectedPlace) {
      return (
        <SingleResult
          query={this.props.query}
          place={this.state.selectedPlace}
          mode={this.state.mode}
          selectMode={this.selectMode} />
      );
    } else {
      return (
        <ResultsList
          query={this.props.query}
          places={this.state.places}
          selectPlace={this.selectPlace}
          mode={this.state.mode}
          selectMode={this.selectMode} />
      );
    }
  },

  componentDidMount: function() {
    places.getPlaces(this.props.query.places, function(e, data) {
      if (e) {
        console.error(e);
      }
      this.setState({places: data});
    }.bind(this));
  }
});
