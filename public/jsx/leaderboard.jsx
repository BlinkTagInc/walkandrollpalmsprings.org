var React = require('react');
var classNames = require('classnames');
var SiteMenu = require('./site_menu.jsx');
var leaderboard = require('../js/leaderboard');

class Leader extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.rank}</td>
        <td>{this.props.name}</td>
        <td>{this.props.metric.toLocaleString()}</td>
      </tr>
    );
  }
}


module.exports = class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leaders: [],
      metric: 'co2'
    };
  }

  toggleMetric(metric) {
    this.setState({metric: metric});
  }

  renderLeaders() {
    return this.state.leaders.map(function(leader, idx) {
      var metric;

      if(this.state.metric === 'co2') {
        metric = leader.co2;
      } else if(this.state.metric === 'calories') {
        metric = leader.calories;
      }

      return <Leader rank={idx + 1} name={leader.neighborhood} metric={metric} key={idx} />;
    }.bind(this));
  }

  render() {
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
          <p>When a user clicks “I Will Use This Route”, the Walk and Roll: Palm Springs site records the trip’s starting neighborhood, calculated CO2 savings, and calories. No other user information is collected.</p>

          <p>CO2 savings and caloric expenditures are based on figures provided by the <a href="http://www.epa.gov/otaq/climate/documents/420f14040a.pdf">US Environmental Protection Agency</a> and the <a href="http://www.cdc.gov/healthyweight/physical_activity">Centers for Disease Control and Prevention</a>. These calculations assume industry averages and typical operating conditions (CO2), as well as average body types (calories).</p>
        </div>
        <SiteMenu selected="leaderboard" color="red" />
      </div>
    );
  }

  componentDidMount() {
    leaderboard.getLeaders(function(e, data) {
      if (e) {
        console.error(e);
      }
      this.setState({leaders: data});
    }.bind(this));
  }
};
