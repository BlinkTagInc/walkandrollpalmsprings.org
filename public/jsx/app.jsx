var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
var helper = require('../js/helper');

var Search = require('./search.jsx');
var Results = require('./results.jsx');
var Welcome = require('./welcome.jsx');
var Neighborhoods = require('./neighborhoods.jsx');
var Leaderboard = require('./leaderboard.jsx');
var About = require('./about.jsx');
var NotFound = require('./not_found.jsx');

require('typeahead.js');

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Welcome} />
    <Route path="about" component={About}/>
    <Route path="search" component={Search}/>
    <Route path="results" component={Results}/>
    <Route path="neighborhoods" component={Neighborhoods}/>
    <Route path="leaderboard" component={Leaderboard}/>
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('app'));
