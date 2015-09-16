var React = require('react');
var classNames = require('classnames');
var Router = require('react-router');
var { Link } = Router;
var SiteMenu = require('./site_menu.jsx');
var ModeMenu = require('./mode_menu.jsx');

var Place = React.createClass({
  render: function() {
    return (
      <div className="place" onClick={this.toggleSelected}>
        <div className="place-title">{this.props.number}. {this.props.place.title}</div>
      </div>
    );
  },

  toggleSelected: function() {
    this.props.selectPlace(this.props.place);
  }
});


module.exports = React.createClass({
  renderResultList: function() {
    return this.props.places.map(function(place, key) {
      return <Place className="place" key={key} number={key+1} place={place} selectPlace={this.props.selectPlace} />
    }.bind(this));
  },

  render: function() {
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
});
