var React = require('react');
var Geocoder = require('./geocoder.jsx');
var classNames = require('classnames');
var config = require('../js/config.js');
var SiteMenu = require('./site_menu.jsx');
var config = require('../js/config');
var cache = require('../js/cache');
var helper = require('../js/helper');
var map = require('../js/map');
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

    this.state = {};

    this.toggleMenu = () => {
      this.setState({open: !this.state.open});
    };
  }

  renderItems() {
    return this.props.items.map((item, key) => {
      return <MenuItem key={key} item={item} selected={_.contains(this.props.selectedCategories, item)} toggleSelected={this.props.toggleSelected} />;
    });
  }

  render() {
    let open = _.intersection(this.props.items, this.props.selectedCategories).length || this.state.open;
    return (
      <li className={classNames({open: open}, 'place-menu')}>
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
            // 'Casinos & Resorts',
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
            'Civic Resources'
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

    this.setStart = (place) => {
      if(!map.isNearPalmSprings([place.geometry.coordinates[1], place.geometry.coordinates[0]])) {
        this.setState({startLocationIsValid: false});
        return alert('Please enter an address in Palm Springs');
      }

      this.setState({
        startLocationIsValid: true,
        startAddress: place.properties.address || place.place_name,
        startLocation: [place.geometry.coordinates[1], place.geometry.coordinates[0]]
      });

      map.neighborhoodFromPoint(place.geometry.coordinates, (e, layer) => {
        if(layer) {
          this.setState({
            startNeighborhood: layer.feature.properties.NAME
          });
        }
      });
    };

    this.doSearch = (e) => {
      e.preventDefault();

      this.validateSearch((e) => {
        if (e) {
          return this.handleValidationError(e);
        }

        var query = {
          categories: this.state.selectedCategories,
          mode: this.state.selectedMode,
          startLocation: this.state.startLocation,
          startAddress: this.state.startAddress,
          startNeighborhood: this.state.startNeighborhood
        };

        cache.saveQuery(query);
        this.props.history.pushState(null, '/results', query);
      });
    };
  }

  renderPlaceMenu() {
    return this.state.menus.map((menu, idx) => {
      return <MenuSection name={menu.name} items={menu.items} key={idx} toggleSelected={this.toggleSelected} selectedCategories={this.state.selectedCategories} />;
    });
  }

  handleValidationError(e) {
    if (e) {
      alert('Error: ' + e);
    }
  }

  validateSearch(cb) {
    if(!this.state.startLocationIsValid) {
      return cb('Please choose a start location within Palm Springs.');
    }
    if (!this.state.selectedCategories.length) {
      return cb('Please selct at least one type of destination.');
    }
    if(!this.state.startLocation || !this.state.startAddress) {
      return cb('Plase enter a start location.');
    }
    cb();
  }

  render() {
    if(helper.isIE() && helper.isIE() < 10) {
      return (
        <div>
          <div className="section-header section-teal">
            <h2>Walk and Roll:<br />Palm Springs</h2>
          </div>
          <div className="section-content">
            <h1 className="page-title teal">Search</h1>
          </div>
          <div className="section-content">
            The search functionality of this site does not support your browser. Please use Internet Explorer 10 or above, Chrome, Firefox or Safari.
          </div>
          <div className="section-content"><a href="https://browser-update.org">Update your browser</a></div>
          <SiteMenu selected="search" color="teal" />
        </div>
      );
    }

    let neighborhoodName;
    if(this.state.startNeighborhood) {
      neighborhoodName = (
        <li>
          <div className="start-neighborhood">Neighborhood: {this.state.startNeighborhood}</div>
        </li>
      );
    }

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
            <li className={classNames('start-address', {selected: this.state.startLocationIsValid === true, invalid: this.state.startLocationIsValid === false})}>
              <Geocoder
                accessToken={config.mapboxToken}
                onSelect={this.setStart}
                inputPlaceholder="Enter a Palm Springs address"
                proximity="-116.5453,33.8303"
                resultsClass="start-address-results"
                />
            </li>
            {neighborhoodName}
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
