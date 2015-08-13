var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var Navigation = require('./navigation.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
      <div>
        <div className="section-header section-red">
          <h2>Walk and Roll: Palm Springs</h2>
          <h1>Leaderboard</h1>
        </div>
        <div className="section-content">

        </div>
        <Navigation selected="leaderboard" color="red" />
      </div>
    );
  }
});
