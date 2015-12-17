var React = require('react');
var ReactDOM = require('react-dom');
var config = require('../js/config');
var map = require('../js/map');
var xhr = require('xhr');
var $ = require('jquery');

function search(endpoint, source, accessToken, proximity, query, callback) {
  var searchTime = new Date();
  var uri = endpoint + '/geocoding/v5/' +
    source + '/' + encodeURIComponent(query) + '.json' +
    '?access_token=' + accessToken +
    (proximity ? '&proximity=' + proximity : '');
  xhr({
    uri: uri,
    json: true
  }, function(err, res, body) {
    callback(err, res, body, searchTime);
  });
}

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.clickOption = (e) => {
      e.preventDefault();
      this.props.clickOption(this.props.result, this.props.idx);
    }
  }

  render() {
    return (
      <li>
        <a href='#'
          onClick={this.clickOption}
          className={this.props.resultClass + ' ' + (this.props.idx === this.props.focus ? this.props.resultFocusClass : '')}>
          {this.props.result.place_name}</a>
      </li>
    );
  }
}


class Geocoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      focus: null,
      loading: false,
      searchTime: new Date()
    };

    this.onInput = (e) => {
      this.setState({loading:true});
      var value = e.target.value;
      if (value === '') {
        this.setState({
          results: [],
          focus: null,
          loading:false
        });
      } else {
        search(
          this.props.endpoint,
          this.props.source,
          this.props.accessToken,
          this.props.proximity,
          value,
          this.onResult);
      }
    };

    this.onKeyDown = (e) => {
      switch (e.which) {
        // up
        case 38:
          e.preventDefault();
          this.moveFocus(-1);
          break;
        // down
        case 40:
          this.moveFocus(1);
          break;
        // accept
        case 13:
          if( this.state.results.length > 0 && this.state.focus == null) {
            this.clickOption(this.state.results[0],0);
          }
          this.acceptFocus();
          break;
      }
    };

    this.clickOption = (place, listLocation) => {
      this.props.onSelect(place);
      this.setState({focus:listLocation});
      // focus on the input after click to maintain key traversal
      ReactDOM.findDOMNode(this.refs.input).focus();
      this.refs.input.value = place.properties.address || place.place_name;
      this.setState({
        results: []
      });
    };

    this.onResult = (err, res, body, searchTime) => {
      // searchTime is compared with the last search to set the state
      // to ensure that a slow xhr response does not scramble the
      // sequence of autocomplete display.
      if (!err && body && body.features && this.state.searchTime <= searchTime) {
        this.setState({
          searchTime: searchTime,
          loading: false,
          results: body.features,
          focus: null
        });
        this.props.onSuggest(this.state.results);
      }
    };
  }

  componentDidMount() {
    if (this.props.focusOnMount) ReactDOM.findDOMNode(this.refs.input).focus();

    if(navigator.geolocation && !this.refs.input.value) {
      navigator.geolocation.getCurrentPosition((position) => {
        if(map.isNearPalmSprings([position.coords.latitude, position.coords.longitude])) {
          $.getJSON('https://api.mapbox.com/v4/geocode/mapbox.places/' + position.coords.longitude + ',' + position.coords.latitude + '.json', {
            access_token: config.mapboxToken
          }, (data) => {
            if(data && data.features && data.features.length) {
              if(data.features[0].address) {
                this.refs.input.value = data.features[0].address + ' ' + data.features[0].text;
              }
            }
          });
        }
      });
    }
  }

  moveFocus(dir) {
    if(this.state.loading) return;
    this.setState({
      focus: this.state.focus === null ?
        0 : Math.max(0,
          Math.min(
            this.state.results.length - 1,
            this.state.focus + dir))
    });
  }

  acceptFocus() {
    if (this.state.focus !== null) {
      this.props.onSelect(this.state.results[this.state.focus]);
    }
  }

  render() {
    var input = <input
      ref='input'
      className={this.props.inputClass}
      onInput={this.onInput}
      onKeyDown={this.onKeyDown}
      placeholder={this.props.inputPlaceholder}
      type='text' />;
    return (
      <div>
        {this.props.inputPosition === 'top' && input}
        {this.state.results.length > 0 && (
          <ul className={`${this.props.showLoader && this.state.loading ? 'loading' : ''} ${this.props.resultsClass}`}>
            {this.state.results.map((result, i) => (
              <Result
                result={result}
                key={i}
                clickOption={this.clickOption}
                idx={i}
                resultClass={this.props.resultClass}
                resultFocusClass={this.props.resultFocusClass} />
            ))}
          </ul>
        )}
        {this.props.inputPosition === 'bottom' && input}
      </div>
    );
  }
}

Geocoder.propTypes = {
  endpoint: React.PropTypes.string,
  source: React.PropTypes.string,
  inputClass: React.PropTypes.string,
  resultClass: React.PropTypes.string,
  resultsClass: React.PropTypes.string,
  inputPosition: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string,
  resultFocusClass: React.PropTypes.string,
  onSelect: React.PropTypes.func.isRequired,
  onSuggest: React.PropTypes.func,
  accessToken: React.PropTypes.string.isRequired,
  proximity: React.PropTypes.string,
  showLoader: React.PropTypes.bool,
  focusOnMount: React.PropTypes.bool
};

Geocoder.defaultProps = {
  endpoint: 'https://api.tiles.mapbox.com',
  inputClass: '',
  resultClass: '',
  resultsClass: '',
  resultFocusClass: 'strong',
  inputPosition: 'top',
  inputPlaceholder: 'Search',
  showLoader: false,
  source: 'mapbox.places',
  proximity: '',
  onSuggest: function() {},
  focusOnMount: true
};

module.exports = Geocoder;
