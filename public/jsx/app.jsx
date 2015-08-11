var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute } = Router;
var helper = require('../js/helper');

var Search = require('./search.jsx');
var Results = require('./results.jsx');
var Welcome = require('./welcome.jsx');
var Neighborhoods = require('./neighborhoods.jsx');
var Leaderboard = require('./leaderboard.jsx');
var About = require('./about.jsx');
var NotFound = require('./not_found.jsx');

require('typeahead.js');


var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Welcome} />
    <Route name="search" handler={Search} />
    <Route name="results" handler={Results} />
    <Route name="neighborhoods" handler={Neighborhoods} />
    <Route name="leaderboard" handler={Leaderboard} />
    <Route name="about" handler={About} />

    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
