var React = require('react');
var Link = require('react-router').Link;
var classNames = require('classnames');

module.exports = React.createClass({
  render: function() {
    return (
      <div className={classNames('navigation', this.props.color)}>
        <Link to="home" className={classNames({selected: this.props.selected === 'home'})}>Home</Link>
        <Link to="search" className={classNames({selected: this.props.selected === 'search'})}>Search</Link>
        <Link to="neighborhoods" className={classNames({selected: this.props.selected === 'neighborhoods'})}>Neighborhoods</Link>
        <Link to="leaderboard" className={classNames({selected: this.props.selected === 'leaderboard'})}>Leaderboard</Link>
        <Link to="about" className={classNames({selected: this.props.selected === 'about'})}>About</Link>
      </div>
    );
  }
});
