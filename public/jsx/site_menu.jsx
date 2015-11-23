var React = require('react');
import { Link } from 'react-router'
var classNames = require('classnames');

module.exports = class SiteMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames('site-menu', this.props.color)}>
        <Link to="/" className={classNames({selected: this.props.selected === 'home'})}>Home</Link>
        <Link to="search" className={classNames({selected: this.props.selected === 'search'})}>Search</Link>
        <Link to="neighborhoods" className={classNames({selected: this.props.selected === 'neighborhoods'})}>Neighborhoods</Link>
        <Link to="leaderboard" className={classNames({selected: this.props.selected === 'leaderboard'})}>Leaderboard</Link>
        <Link to="about" className={classNames({selected: this.props.selected === 'about'})}>About</Link>
        <Link to="safety" className={classNames({selected: this.props.selected === 'safety'})}>Safety</Link>
      </div>
    );
  }
};
