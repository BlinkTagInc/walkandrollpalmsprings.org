var React = require('react');
var Link = require('react-router').Link;
var classNames = require('classnames');

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
      <div className="content">
        <h1 className="welcome-title">Walk and Roll:<br/> Palm Springs</h1>
        <div className="welcome-description">Eat, Play, Shop,<br/>Connect, and Move.<br />By Foot, Bike, and Transit.<br />Save Carbon. Count Calories.</div>
        <Link to="search" className="get-started">Get Started</Link>
        <div className="navigation">
          <Link to="home" className="selected">Home</Link>
          <Link to="search">Search</Link>
          <Link to="neighborhoods">Neighborhoods</Link>
          <Link to="leaderboard">Leaderboard</Link>
          <Link to="about">About</Link>
        </div>
      </div>
    );
  }
});
