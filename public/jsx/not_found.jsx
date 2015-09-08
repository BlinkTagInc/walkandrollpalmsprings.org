var React = require('react');
var Router = require('react-router');
var { Link } = Router;

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="section-header section-red">
          <h2>Walk and Roll:<br />Palm Springs</h2>
          <h1>Not Found</h1>
        </div>
        <div className="section-content">
          <p>This page could not be found.</p>
          <Link to="home">Walk and Roll: Palm Springs Home</Link>
        </div>
      </div>
    );
  }
});
