var React = require('react');
var classNames = require('classnames');
var Router = require('react-router');
var { Link } = Router;
var SiteMenu = require('./site_menu.jsx');
var he = require('he');
var map = require('../js/map.js');
var places = require('../js/places.js');
var _ = require('underscore');

var Place = React.createClass({
  getInitialState: function() {
    return {
      selected: false
    };
  },

  renderDetails: function() {
    if (this.state.selected) {
      return <div className="place-details">{this.props.place.street}<br />{he.decode(this.props.place.content)} <a href="#" className="place-link">Map & Directons &raquo;</a></div>
    }
  },

  render: function() {
    return (
      <div className={classNames('place', {selected: !!this.state.selected})} onClick={this.toggleSelected}>
        <div className="place-title">{this.props.number}. {this.props.place.title}</div>
        {this.renderDetails()}
      </div>
    );
  },

  toggleSelected: function() {
    this.setState({
      selected: !this.state.selected
    });
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      menuOpen: false,
      selectedMode: this.props.query.mode,
      places: []
    };
  },

  toggleModeMenu: function() {
    this.setState({menuOpen: !this.state.menuOpen});
  },

  selectMode: function(mode) {
    this.setState({
      selectedMode: mode,
      menuOpen: false
    });
  },

  renderModeMenu: function() {
    var menuItems = [
      <div className={classNames('mode', 'selected', this.state.selectedMode)} onClick={this.toggleModeMenu} ket="selected"></div>
    ];
    var modes = ['walk', 'bike', 'transit'];

    if (this.state.menuOpen) {
      _.without(modes, this.state.selectedMode).forEach(function(mode, idx) {
        menuItems.push(
          <div className={classNames('mode', mode)} key={idx} onClick={this.selectMode.bind(null, mode)}></div>
        );
      }.bind(this));
    }

    return (
      <div className={classNames('mode-menu', {open: this.state.menuOpen})}>
        {menuItems}
      </div>
    );
  },

  renderPlaceList: function() {
    return this.state.places.map(function(place, key) {
      return <Place className="place" key={key} number={key+1} place={place} />
    });
  },

  render: function() {
    return (
      <div>
        <div className="section-header section-teal" ref="sectionHeader">
          {this.renderModeMenu()}
          <h2 className="results-title">Showing:</h2>
          <div className="selected-places">{this.props.query.places.join(', ')}</div>
        </div>

        <div className="place-list">
          {this.renderPlaceList()}
        </div>

        <div className="section-footer section-teal">
          <Link to="search">Return to Search</Link>
        </div>
        <SiteMenu selected="search" color="teal" />
      </div>
    );
  },

  componentDidMount: function() {
    places.getPlaces(this.props.query.places, function(e, data) {
      if (e) {
        console.error(e);
      }
      console.log(data);
      this.setState({places: data});
    }.bind(this));
  }
});
