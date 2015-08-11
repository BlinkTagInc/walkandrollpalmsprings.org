var React = require('react');
var classNames = require('classnames');
var Router = require('react-router');
var { Link } = Router;
var map = require('../js/map.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      mapHeight: 400
    };
  },

  handleResize: function(e) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      mapHeight: window.innerHeight - this.refs.sectionHeader.getDOMNode().clientHeight - this.refs.sectionFooter.getDOMNode().clientHeight
    });
  },

  render: function() {
    return (
      <div>
        <div className="section-header section-teal" ref="sectionHeader">
          <div className={classNames('selected-mode', this.props.query.mode)}></div>
          <h2 className="results-title">Showing:</h2>
          <div className="selected-places">{this.props.query.places.join(', ')}</div>
        </div>
        <div className="results-map" id="map" style={{height: this.state.mapHeight + 'px'}}></div>

        <div className="section-footer" ref="sectionFooter">
          <Link to="search" className="footer-bar red">Back to Search</Link>
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    map.drawMap([this.props.query.startLat, this.props.query.startLon], this.props.query.startAddress);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
});
