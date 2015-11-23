var React = require('react');
import { Link } from 'react-router'
var SiteMenu = require('./site_menu.jsx');

module.exports = class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content background-tan">
        <h1 className="welcome-title">Walk and Roll:<br/> Palm Springs</h1>
        <div className="welcome-description">
          <div className="welcome-logo"></div>
          Eat, Play, <br/>Shop, and Move.<br />By Foot, Bike, and Transit.<br />Save Carbon. Count Calories.
          <Link to="search" className="btn btn-green btn-get-started">Get Started</Link>
        </div>
        <SiteMenu selected="home" color="red" />
      </div>
    );
  }
};
