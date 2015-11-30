var React = require('react');
var classNames = require('classnames');
var config = require('../js/config.js');
var SiteMenu = require('./site_menu.jsx');
var cache = require('../js/cache.js');
var map = require('../js/map.js');
var $ = require('jquery');
var _ = require('underscore');


class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <li onClick={this.props.toggleSelected.bind(null, this.props.item)} className={classNames({selected: this.props.selected})}>{this.props.item}</li>;
  }
}


class MenuSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: _.intersection(this.props.items, this.props.selectedCategories).length
    };

    this.toggleMenu = () => {
      this.setState({open: !this.state.open});
    };
  }

  renderItems() {
    return this.props.items.map(function(item, key) {
      return <MenuItem key={key} item={item} selected={_.contains(this.props.selectedCategories, item)} toggleSelected={this.props.toggleSelected} />;
    }.bind(this));
  }

  render() {
    return (
      <li className={classNames({open: this.state.open}, 'place-menu')}>
        <div className="place-title" onClick={this.toggleMenu}>{this.props.name}</div>
        <ul>
          {this.renderItems()}
        </ul>
      </li>
    );
  }
}

module.exports = class Search extends React.Component {
  constructor(props) {
    super(props);

    var query = cache.fetchQuery();

    this.state = {
      selectedCategories: query.categories || ['Fresh Groceries'],
      selectedMode: query.mode || 'walk',
      startLocation: query.startLocation,
      startAddress: query.startAddress,
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
            'Places of Worship',
          ]
        },
        {
          name: 'Move',
          items: [
            'Running & Walking',
            'Bike Routes',
            'Transit Stops'
          ]
        }
      ]
    };

    this.toggleSelected = (item) => {
      if(_.contains(this.state.selectedCategories, item)) {
        this.setState({selectedCategories: _.without(this.state.selectedCategories, item)});
      } else {
        this.setState({selectedCategories: this.state.selectedCategories.concat([item])});
      }
    };

    this.clearStart = () => {
      this.setState({
        startLocation: undefined,
        startAddress: undefined,
        skipValidation: false
      });
    };

    this.selectMode = (mode) => {
      this.setState({selectedMode: mode});
    };

    this.validateStart = (cb) => {
      var error = null;
      var startAddress = this.refs.startAddress.value;
      if (!startAddress) {
        return cb();
      }

      if(this.state.skipValidation) {
        return cb();
      } else {
        this.setState({skipValidation: true});
      }

      $.getJSON('https://api.mapbox.com/v4/geocode/mapbox.places/' + startAddress + '.json', {
        access_token: config.mapboxToken,
        proximity: '-116.5453,33.8303'
      }, function(data) {
        if (data && data.features && data.features.length) {
          var latlng = [data.features[0].center[1], data.features[0].center[0]];
          if (map.isNearPalmSprings(latlng)) {
            this.setState({
              startLocation: latlng,
              startAddress: startAddress
            });

            map.neighborhoodFromPoint([latlng[1], latlng[0]], function(e, layer) {
              if(layer) {
                this.setState({
                  startNeighborhood: layer.feature.properties.NAME
                });
              }
            }.bind(this));
          } else {
            error = 'The address you entered was not in Palm Springs.';
          }
        } else {
          error = 'The address you entered was not found.';
        }
        cb(error);
      }.bind(this));
    };

    this.doSearch = (e) => {
      e.preventDefault();

      this.validateSearch(function(e) {
        if (e) {
          return this.handleValidationError(e);
        }

        var query = {
          categories: this.state.selectedCategories,
          mode: this.state.selectedMode,
          startLocation: this.state.startLocation || [33.8303,-116.5453],
          startAddress: this.state.startAddress || '3200 E Tahquitz Canyon Way'
        };

        cache.saveQuery(query);
        this.props.history.pushState(null, '/results', query);
      }.bind(this));
    };
  }

  renderPlaceMenu() {
    return this.state.menus.map(function(menu, idx) {
      return <MenuSection name={menu.name} items={menu.items} key={idx} toggleSelected={this.toggleSelected} selectedCategories={this.state.selectedCategories} />;
    }.bind(this));
  }

  renderNeighborhoodName() {
    if(this.state.startNeighborhood) {
      return (
        <li>
          <div className="start-neighborhood">Neighborhood: {this.state.startNeighborhood}</div>
        </li>
      );
    }
  }

  handleValidationError(e) {
    if (e) {
      alert('Error: ' + e);
    }
  }

  validateSearch(cb) {
    if (!this.state.selectedCategories.length) {
      return cb('Please selct at least one type of destination.');
    }

    this.validateStart(cb);
  }

  componentDidMount() {
    if (navigator.geolocation && !this.state.startAddress) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $.getJSON('https://api.mapbox.com/v4/geocode/mapbox.places/' + position.coords.longitude + ',' + position.coords.latitude + '.json', {
          access_token: config.mapboxToken
        }, function(data) {
          if(data && data.features && data.features.length) {
            if(data.features[0].address) {
              this.refs.startAddress.value = data.features[0].address + ' ' + data.features[0].text;
            }
          }
        }.bind(this));
      }.bind(this));
    }
  }

  render() {
    return (
      <div>
        <div className="section-header section-teal">
          <h2>Walk and Roll:<br />Palm Springs</h2>
        </div>
        <div className="section-content">
          <h1 className="page-title teal">Search</h1>
        </div>
        <form onSubmit={this.doSearch}>
          <ul className="search-menu">
            <li>
              <div className="instructions">Select One or More Destination</div>
            </li>
            <li>
              <ul className="place-select">{this.renderPlaceMenu()}</ul>
            </li>
            <li>
              <div className="instructions">Start Location</div>
            </li>
            <li className={classNames('start-address', {selected: !!this.state.startLocation})}>
              <input
                ref="startAddress"
                type="text"
                defaultValue={this.state.startAddress}
                placeholder="Enter a Palm Springs address"
                onBlur={this.validateStart.bind(this, this.handleValidationError)}
                onChange={this.clearStart} />
            </li>
            {this.renderNeighborhoodName()}
            <li>
              <div className="instructions">Travel by:</div>
            </li>
            <li>
              <ul className="mode-select">
                <li
                  className={classNames({selected: this.state.selectedMode === "walk"})}
                  onClick={this.selectMode.bind(null, "walk")}>Walk</li>
                <li
                  className={classNames({selected: this.state.selectedMode === "bike"})}
                  onClick={this.selectMode.bind(null, "bike")}>Bike</li>
                <li
                  className={classNames({selected: this.state.selectedMode === "transit"})}
                  onClick={this.selectMode.bind(null, "transit")}>Transit</li>
              </ul>
            </li>
          </ul>
          <input type="submit" className="btn btn-teal btn-center btn-search" value="Search" />
        </form>

        <SiteMenu selected="search" color="teal" />
      </div>
    );
  }
};
