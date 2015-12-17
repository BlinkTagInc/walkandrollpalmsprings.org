var React = require('react');
import { Link } from 'react-router'
var SiteMenu = require('./site_menu.jsx');

module.exports = class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="section-header section-green-dark">
          <h2>Walk and Roll:<br />Palm Springs</h2>
        </div>
        <div className="section-content">
          <h1 className="page-title green-dark">About This Site</h1>
        </div>
        <div className="section-content">
          <p>This site was created by <a href="http://blinktag.com">BlinkTag, Inc</a>. for the <a href="http://www.ci.palm-springs.ca.us/">City of Palm Springs</a> in 2015.</p>
          <p>For more information about Sustainability in Palm Springs, see: <a href="http://www.healthyplanethealthyyoups.com">Healthy Planet Healthy you</a></p>
          <p>For more information about Palm Springs, see:</p>
          <ul>
            <li><a href="http://visitpalmsprings.com/">Visit Palm Springs</a></li>
            <li><a href="http://directory.cvhip.com/">Coachella Valley Health in Play (cvHIP)</a></li>
            <li><a href="http://new.buzzps.com/">Palm Springs BUZZ</a></li>
          </ul>
          <p>Questions? Contact: <a href="mailto:Michele.Mician@palmsprings-ca.gov">Michele.Mician@palmsprings-ca.gov</a></p>
          <img src="/images/city-of-palm-springs-logo@2x.png" className="about-logo" />
        </div>
        <SiteMenu selected="about" color="green-dark" />
      </div>
    );
  }
};
