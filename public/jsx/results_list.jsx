var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');
import { Link } from 'react-router'
var SiteMenu = require('./site_menu.jsx');
var ModeMenu = require('./mode_menu.jsx');


module.exports = class ResultsList extends React.Component {
  constructor(props) {
    super(props);
  }

  filterPlacesByMode() {
    return _.filter(this.props.places, (place) => {
      let maxDistance;
      if(this.props.mode === 'walk') {
        maxDistance = 1;
      } else if (this.props.mode === 'bike') {
        maxDistance = 3;
      } else if (this.props.mode === 'transit') {
        maxDistance = 10;
      }
      return place.ignoreDistance || place.distance <= maxDistance;
    });
  }

  renderResultList(results) {
    if(this.props.loading) {
      return (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      );
    }
    if(!results || !results.length) {
      return (
        <div className="no-results">
          <p>No matching results</p>
          <Link to="/search">Revise your search</Link>
        </div>
      );
    }
    return results.map(function(place, key) {
      return (
        <Link
          to={'/results/' + this.props.query.categories + '/' + place.title}
          className="place"
          key={key}
          query={{
            startLocation: this.props.query.startLocation,
            startAddress: this.props.query.startAddress,
            mode: this.props.query.mode
          }}>
          <div className="place-title">
            {key + 1}. {place.title}
          </div>
        </Link>
      );
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div className="section-header section-teal" ref="sectionHeader">
          <ModeMenu mode={this.props.mode} selectMode={this.props.selectMode} />
          <h3 className="results-title">Showing:</h3>
          <div className="selected-categories">
            {this.props.query.categories ? this.props.query.categories.join(', ') : ''}
          </div>
        </div>

        <div className="place-list">
          {this.renderResultList(this.filterPlacesByMode())}
        </div>

        <div className="section-footer section-teal">
          <Link to="/search">Return to Search</Link>
        </div>
        <SiteMenu selected="search" color="teal" />
      </div>
    );
  }
};
