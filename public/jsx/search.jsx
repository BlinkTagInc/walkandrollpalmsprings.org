var React = require('react');
var classNames = require('classnames');
var config = require('../js/config.js');
var Navigation = require('react-router').Navigation;
var map = require('../js/map.js');
var $ = require('jquery');
var _ = require('underscore');


var MenuItem = React.createClass({
  render: function() {
    return <li onClick={this.props.toggleSelected.bind(null, this.props.item)} className={classNames({selected: this.props.selected})}>{this.props.item}</li>;
  }
});


var MenuSection = React.createClass({
  getInitialState: function() {
    return {
      open: _.intersection(this.props.items, this.props.selectedPlaces).length
    };
  },

  toggleMenu: function() {
    this.setState({open: !this.state.open});
  },

  renderItems: function() {
    return this.props.items.map(function(item, key) {
      return <MenuItem key={key} item={item} selected={_.contains(this.props.selectedPlaces, item)} toggleSelected={this.props.toggleSelected} />;
    }.bind(this));
  },

  render: function() {
    return (
      <li className={classNames({open: this.state.open}, 'place-menu')}>
        <div className="place-title" onClick={this.toggleMenu}>{this.props.name}</div>
        <ul>
          {this.renderItems()}
        </ul>
      </li>
    );
  }
});

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      selectedPlaces: ['Fresh Groceries'],
      selectedMode: 'walk',
      menus: [
        {
          name: 'Eat',
          items: [
            'Fresh Groceries',
            'Prepared Foods',
            'Outdoor Markets',
            'Restaurants'
          ]
        },
        {
          name: 'Play',
          items: [
            'Arts & Culture',
            'Casinos & Resorts',
            'Nightlife',
            'Parks & Attractions',
            'Spas & Salons'
          ]
        },
        {
          name: 'Shop',
          items: [
            'Beauty',
            'Clothes',
            'Gifts',
            'Home',
            'Services'
          ]
        },
        {
          name: 'Connect',
          items: [
            'Neighborhoods',
            'Civic Services',
            'For Kids',
            'Public Safety'
          ]
        },
        {
          name: 'Move',
          items: [
            'Running & Walking',
            'Bike Routes',
            'Transit Stops',
            'Electric Vehicle Stations'
          ]
        }
      ]
    };
  },

  renderPlaceMenu: function() {
    return this.state.menus.map(function(menu, idx) {
      return <MenuSection name={menu.name} items={menu.items} key={idx} toggleSelected={this.toggleSelected} selectedPlaces={this.state.selectedPlaces} />;
    }.bind(this));
  },

  renderModeMenu: function() {
    return ['walk', 'bike', 'transit'].map(function(mode, idx) {
      return (
        <li value={mode} key={idx} className={classNames('mode', {selected: this.state.selectedMode === mode})} onClick={this.selectMode.bind(null, mode)}>{mode}</li>
      );
    }.bind(this));
  },

  toggleSelected: function(item) {
    if(_.contains(this.state.selectedPlaces, item)) {
      this.setState({selectedPlaces: _.without(this.state.selectedPlaces, item)});
    } else {
      this.setState({selectedPlaces: this.state.selectedPlaces.concat([item])});
    }
  },

  selectMode: function(mode) {
    this.setState({selectedMode: mode});
  },

  validateStart: function(cb) {
    var error = null;
    var startAddress = this.refs.startAddress.getDOMNode().value;
    if (!startAddress) {
      return cb();
    }

    $.getJSON('https://api.mapbox.com/v4/geocode/mapbox.places/' + startAddress + '.json', {
      access_token: config.mapboxToken
    }, function(data) {
      if (data && data.features && data.features.length) {
        var latlng = [data.features[0].center[1], data.features[0].center[0]];
        if (map.isNearPalmSprings(latlng)) {
          this.setState({
            startLocation: latlng,
            startAddress: startAddress
          });
        } else {
          error = 'The address you entered was not in Palm Springs.';
        }
      } else {
        error = 'The address you entered was not found.';
      }
      cb(error);
    }.bind(this));
  },

  validateSearch: function(cb) {
    if (!this.state.selectedPlaces.length) {
      return cb('Please selct at least one type of destination.');
    }

    this.validateStart(cb);
  },

  handleValidationError: function(e) {
    if (e) {
      alert('Error: ' + e);
    }
  },

  doSearch: function() {
    this.validateSearch(function(e) {
      if (e) {
        return this.handleValidationError(e);
      }

      var query = {
        places: this.state.selectedPlaces,
        mode: this.state.selectedMode,
        startLocation: this.state.startLocation || [33.8303,-116.5453],
        startAddress: this.state.startAddress || '3200 E Tahquitz Canyon Way'
      };

      this.transitionTo('results', null, query);
    }.bind(this));
  },

  componentDidMount: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $.getJSON('https://api.mapbox.com/v4/geocode/mapbox.places/' + position.coords.longitude + ',' + position.coords.latitude + '.json', {
          access_token: config.mapboxToken
        }, function(data) {
          if(data && data.features && data.features.length) {
            if(data.features[0].address) {
              this.refs.startAddress.getDOMNode().value = data.features[0].address + ' ' + data.features[0].text;
            }
          }
        }.bind(this));
      }.bind(this));
    }
  },

  render: function() {
    return (
      <div>
        <ul className="search-menu">
          <li className="section-header section-teal">
            <h1>Select One or More</h1>
          </li>
          <li>
            <ul className="place-select">{this.renderPlaceMenu()}</ul>
          </li>
          <li className="section-header section-orange">
            <h1>Start Location</h1>
          </li>
          <li className="start-address">
            <input ref="startAddress" type="text" onBlur={this.validateStart.bind(this, this.handleValidationError)} />
          </li>
          <li className="section-header section-red">
            <h1>Travel by:</h1>
          </li>
          <li>
            <ul className="mode-select">{this.renderModeMenu()}</ul>
          </li>

          <li onClick={this.doSearch} className="section-header section-green section-link"><h1>Search</h1></li>
        </ul>
      </div>
    );
  }
});
