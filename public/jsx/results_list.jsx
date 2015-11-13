var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');
import { Link } from 'react-router'
var SiteMenu = require('./site_menu.jsx');
var ModeMenu = require('./mode_menu.jsx');

class Place extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSelected = () => {
      this.props.selectPlace(this.props.place);
    };
  }

  render() {
    return (
      <div className="place" onClick={this.toggleSelected}>
        <div className="place-title">{this.props.number}. {this.props.place.title}</div>
      </div>
    );
  }
}


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

  renderResultList() {
    return this.filterPlacesByMode().map(function(place, key) {
      return (
        <Place className="place" key={key} number={key+1} place={place} selectPlace={this.props.selectPlace} />
      );
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div className="section-header section-teal" ref="sectionHeader">
          <ModeMenu mode={this.props.mode} selectMode={this.props.selectMode} />
          <h3 className="results-title">Showing:</h3>
          <div className="selected-places">{this.props.query.places.join(', ')}</div>
        </div>

        <div className="place-list">
          {this.renderResultList()}
        </div>

        <div className="section-footer section-teal">
          <Link to="search">Return to Search</Link>
        </div>
        <SiteMenu selected="search" color="teal" />
      </div>
    );
  }
};
