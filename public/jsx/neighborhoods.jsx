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
          <h1>Neighborhoods</h1>
        </div>
        <div className="section-content">

        </div>

        <div className="section-header section-teal">
          <h2>About the Organized Neighborhoods of Palm Springs (ONE-PS)</h2>
        </div>
        <div className="section-content">
          <p>ONE-PS is a network of Palm Springs neighborhoods that gives voice to the issues and concerns of our community. We collectively seek practical solutions, and promote two-way communication between City residents and City officials on matters and events of broad civic and social interest.</p>
          <p>Read more about ONE-PS on the <a href="http://www.palmsprings-ca.gov/residents/neighborhoods/about-oni">City of Palm Spring’s website</a>.</p>
        </div>
        <Navigation selected="neighborhoods" color="red" />
      </div>
    );
  }
});
