var React = require('react');
var classNames = require('classnames');
var SiteMenu = require('./site_menu.jsx');
var leaderboard = require('../js/leaderboard');

var Leader = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.rank}</td>
        <td>{this.props.name}</td>
        <td>{this.props.metric.toLocaleString()}</td>
      </tr>
    );
  }
});


module.exports = React.createClass({
  getInitialState: function() {
    return {
      leaders: [],
      metric: 'co2'
    };
  },

  toggleMetric: function(metric) {
    this.setState({metric: metric});
  },

  renderLeaders: function() {
    return this.state.leaders.map(function(leader, idx) {
      var metric;

      if(this.state.metric === 'co2') {
        metric = leader.co2;
      } else if(this.state.metric === 'calories') {
        metric = leader.calories;
      }

      return <Leader rank={idx + 1} name={leader.neighborhood} metric={metric} key={idx} />;
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <div className="section-header section-red">
          <h2>Walk and Roll:<br />Palm Springs</h2>
        </div>
        <div className="section-content">
          <h1 className="page-title red">Leaderboard</h1>
        </div>
        <div className="section-content">
          <table className="leaderboard">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Neighborhood</th>
                <th>CO2 (lbs.)</th>
              </tr>
            </thead>
            <tbody>
              {this.renderLeaders()}
            </tbody>
          </table>
          <div className="leaderboard-time">From 5:00 AM PDT 8/1/15 through 5:16 PM 9/1/15</div>
          <div className="leaderboard-metric">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={classNames('btn', 'btn-white', {active: this.state.metric === 'co2'})}
                onClick={this.toggleMetric.bind(this, 'co2')}>CO2</button>
              <button
                type="button"
                className={classNames('btn', 'btn-white', {active: this.state.metric === 'calories'})}
                onClick={this.toggleMetric.bind(this, 'calories')}>Calories</button>
            </div>
          </div>
        </div>
        <div className="section-header section-red">
          <h3>What does this data mean?</h3>
        </div>
        <div className="section-content">
          <p>When a user clicks “I Will Use This Route”, the Walk and Roll: Palm Springs site records the trip’s starting neighborhood, calculated CO2 savings, and calories. No other user information is collected. CO2 savings and caloric expenditures are based on [data sources].</p>
        </div>
        <SiteMenu selected="leaderboard" color="red" />
      </div>
    );
  },

  componentDidMount: function() {
    leaderboard.getLeaders(function(e, data) {
      if (e) {
        console.error(e);
      }
      this.setState({leaders: data});
    }.bind(this));
  }
});
