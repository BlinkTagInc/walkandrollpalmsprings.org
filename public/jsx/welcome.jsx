var React = require('react');
var Link = require('react-router').Link;
var Navigation = require('./navigation.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="content">
        <h1 className="welcome-title">Walk and Roll:<br/> Palm Springs</h1>
        <div className="welcome-description">Eat, Play, Shop,<br/>Connect, and Move.<br />By Foot, Bike, and Transit.<br />Save Carbon. Count Calories.</div>
        <Link to="search" className="get-started">Get Started</Link>
        <Navigation selected="home" color="orange" />
      </div>
    );
  }
});
