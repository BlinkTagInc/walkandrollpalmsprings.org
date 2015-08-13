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
        <div className="section-header section-green">
          <h2>Walk and Roll: Palm Springs</h2>
          <h1>About This Site</h1>
        </div>
        <div className="section-content">
          <p>This site was created by <a href="http://blinktag.com">BlinkTag, Inc</a>. for the City of Palm Springs in 2015 as part of [project]. Funding for this site came from [source].</p>

          <p>Questions? Contact: <a href="mailto:info@walkandrollpalmsprings.org">info@walkandrollpalmsprings.org</a></p>
        </div>
        <Navigation selected="about" color="green" />
      </div>
    );
  }
});
