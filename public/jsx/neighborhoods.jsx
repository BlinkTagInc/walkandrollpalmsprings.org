var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var SiteMenu = require('./site_menu.jsx');
var map = require('../js/map.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
      <div>
        <div className="section-header section-orange">
          <h2>Walk and Roll:<br />Palm Springs</h2>
        </div>
        <div className="section-content">
          <h1 className="page-title orange">Neighborhoods</h1>
        </div>
        <div className="section-instructions">Tap any neighborhood for more information.</div>

        <div id="map" className="neighborhood-map"></div>

        <div className="section-header section-orange">
          <h3>About the Organized Neighborhoods of Palm Springs (ONE-PS)</h3>
        </div>
        <div className="section-content">
          <p>The Organized Neighborhoods of Palm Springs (ONE-PS) is a network of Palm Springs neighborhoods that gives voice to the issues and concerns of our community. We collectively seek practical solutions, and promote two-way communication between City residents and City officials on matters and events of broad civic and social interest.</p>
          <p>Read more about ONE-PS on the <a href="http://www.palmsprings-ca.gov/residents/neighborhoods/about-oni">City of Palm Spring’s website</a>.</p>
        </div>
        <SiteMenu selected="neighborhoods" color="orange" />
      </div>
    );
  },
  componentDidMount: function() {
    map.drawNeighborhoodsMap();
  }

});
