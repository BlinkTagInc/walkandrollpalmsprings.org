var React = require('react');
var classNames = require('classnames');
var Router = require('react-router');
var { Link } = Router;
var map = require('../js/map.js');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      mapHeight: 400,
      menuOpen: false,
      selectedMode: this.props.query.mode
    };
  },

  handleResize: function() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      mapHeight: window.innerHeight - this.refs.sectionHeader.getDOMNode().clientHeight - this.refs.sectionFooter.getDOMNode().clientHeight
    });
  },

  toggleModeMenu: function() {
    this.setState({menuOpen: true});
  },

  selectMode: function(mode) {
    this.setState({
      selectedMode: mode,
      menuOpen: false
    });
  },

  renderModeMenu: function() {
    var menuItems;
    var modes = ['walk', 'bike', 'transit'];

    if (this.state.menuOpen) {
      menuItems = _.without(modes, this.state.selectedMode).map(function(mode, idx) {
        return (
          <div className={classNames('mode', mode)} key={idx} onClick={this.selectMode.bind(null, mode)}></div>
        );
      }.bind(this));
    }

    return (
      <div className={classNames('mode-menu', {open: this.state.menuOpen})}>
        <div className={classNames('mode', 'selected', this.state.selectedMode)} onClick={this.toggleModeMenu}></div>
        {menuItems}
      </div>
    );
  },

  render: function() {
    return (
      <div>
        <div className="section-header section-teal" ref="sectionHeader">
          {this.renderModeMenu()}
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

  componentDidUpdate: function() {
    map.resizeMap();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
});
