var React = require('react');
import { Link } from 'react-router'
var SiteMenu = require('./site_menu.jsx');
var map = require('../js/map.js');

module.exports = class Neighborhoods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getNeighborhoodDetail() {
    if(this.state.selectedNeighborhood) {
      var neighborhoodWebsite;
      if(this.state.selectedNeighborhood.website) {
        neighborhoodWebsite = (
          <div className="neighborhood-detail">
            <label>Website:</label>
            <a href={this.state.selectedNeighborhood.website}>{this.state.selectedNeighborhood.website}</a>
          </div>
        );
      }

      return (
        <div className="neighborhood-details">
          <div className="neighborhood-detail">
            <label>Name:</label>
            <span>{this.state.selectedNeighborhood.name}</span>
          </div>
          {neighborhoodWebsite}
        </div>
      );
    }
  }

  render() {
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

        {this.getNeighborhoodDetail()}

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
  }

  selectNeighborhood(neighborhoodLayer) {
    this.setState({
      selectedNeighborhood: {
        name: neighborhoodLayer.feature.properties.NAME,
        website: neighborhoodLayer.feature.properties.WEBSITE
      }
    });
  }

  componentDidMount() {
    map.drawNeighborhoodsMap(this.selectNeighborhood.bind(this));
  }
};
