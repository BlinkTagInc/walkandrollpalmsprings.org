var React = require('react');
var classNames = require('classnames');
var config = require('../js/config.js');
var Navigation = require('react-router').Navigation;
var $ = require('jquery');
var _ = require('underscore');


var MenuItem = React.createClass({
  getInitialState: function() {
    return {
      selected: false
    };
  },

  toggleSelected: function() {
    this.setState({selected: !this.state.selected});

    this.props.toggleSelected(this.props.item, this.state.selected);
  },

  render: function() {
    return <li onClick={this.toggleSelected.bind(null, this.props.item)} className={classNames({selected: this.state.selected})}>{this.props.item}</li>;
  }
});

var MenuSection = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },

  toggleMenu: function() {
    this.setState({open: !this.state.open});
  },

  renderItems: function() {
    return this.props.items.map(function(item, key) {
      return <MenuItem key={key} item={item} toggleSelected={this.props.toggleSelected} />;
    }.bind(this));
  },

  render: function() {
    return (
      <li className={classNames({open: this.state.open}, 'place-menu')}>
        <div onClick={this.toggleMenu} className="menu-section">{this.props.name}</div>
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
      selectedPlaces: [],
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
      return <MenuSection name={menu.name} items={menu.items} key={idx} toggleSelected={this.toggleSelected} />;
    }.bind(this));
  },

  renderModeMenu: function() {
    return ['walk', 'bike', 'transit'].map(function(mode, idx) {
      return (
          <li value={mode} key={idx} className={classNames('mode-menu', {selected: this.state.selectedMode === mode})} onClick={this.selectMode.bind(null, mode)}>{mode}</li>
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

  setAddress: function(data) {
    if(data && data.features && data.features.length) {
      if(data.features[0].address) {
        this.setState({startAddress: data.features[0].address + ' ' + data.features[0].text});
      }
    }
  },

  validateSearch: function() {
    var isValid = true;

    if (!this.state.startAddress) {
      alert('Please enter a start address.');
      isValid = false;
    }

    if (!this.state.selectedPlaces.length) {
      alert('Please selct at least one type of destination.');
      isValid = false;
    }

    return isValid;
  },

  doSearch: function() {
    if(!this.validateSearch()) {
      return;
    }

    var query = {
      places: this.state.selectedPlaces,
      mode: this.state.selectedMode,
      startLat: this.state.startLat,
      startLon: this.state.startLon,
      startAddress: this.state.startAddress
    };
    this.transitionTo('results', null, query);
  },

  componentDidMount: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.setState({
          startLat: position.coords.latitude,
          startLon: position.coords.longitude
        });
        $.getJSON('https://api.mapbox.com/v4/geocode/mapbox.places/' + position.coords.longitude + ',' + position.coords.latitude + '.json', {
          access_token: config.mapboxToken
        }, this.setAddress);
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
          {this.renderPlaceMenu()}
          <li className="section-header section-orange">
            <h1>Start Location</h1>
          </li>
          <li className="start-address menu-section">{this.state.startAddress || ' '}</li>
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
