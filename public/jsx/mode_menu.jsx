var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');

module.exports = class ModeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };

    this.toggleModeMenu = () => {
      this.setState({menuOpen: !this.state.menuOpen});
    };

    this.selectMode = (mode) => {
      this.setState({menuOpen: false});
      this.props.selectMode(mode);
    };
  }

  render() {
    var menuItems = [
      <div className={classNames('mode', 'selected', this.props.mode)} onClick={this.toggleModeMenu} key="selected"></div>
    ];
    var modes = ['walk', 'bike', 'transit'];

    if (this.state.menuOpen) {
      _.without(modes, this.props.mode).forEach(function(mode, idx) {
        menuItems.push(
          <div className={classNames('mode', mode)} key={idx} onClick={this.selectMode.bind(null, mode)}></div>
        );
      }.bind(this));
    }

    return (
      <div className={classNames('mode-menu', {open: this.state.menuOpen})}>
        {menuItems}
      </div>
    );
  }
};
