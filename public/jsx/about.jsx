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
        <div className="section-header section-green">
          <h2>Walk and Roll:<br />Palm Springs</h2>
        </div>
        <div className="section-content">
          <h1 className="page-title green">About This Site</h1>
          <p>This site was created by <a href="http://blinktag.com">BlinkTag, Inc</a>. for the City of Palm Springs in 2015 as part of [project]. Funding for this site came from [source].</p>

          <p>Questions? Contact: <a href="mailto:info@walkandrollpalmsprings.org">info@walkandrollpalmsprings.org</a></p>
        </div>
        <SiteMenu selected="about" color="green" />
      </div>
    );
  }
});
