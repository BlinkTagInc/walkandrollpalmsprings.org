var React = require('react');
var Router = require('react-router');
var { Link } = Router;

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
        <div className="section-links">
          <Link to="neighborhoods">Neighborhoods</Link>|
          <Link to="about">About This Site</Link>
        </div>
      </div>
    );
  }
});
