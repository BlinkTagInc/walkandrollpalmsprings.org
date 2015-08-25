var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var SiteMenu = require('./site_menu.jsx');

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
        <SiteMenu selected="leaderboard" color="red" />
      </div>
    );
  }
});
