var React = require('react');
import { Link } from 'react-router'

module.exports = class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div className="section-header section-red">
          <h2>Walk and Roll:<br />Palm Springs</h2>
          <h1>Not Found</h1>
        </div>
        <div className="section-content">
          <p>This page could not be found.</p>
          <Link to="/">Walk and Roll: Palm Springs Home</Link>
        </div>
      </div>
    );
  }
};
