var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');
var SiteMenu = require('./site_menu.jsx');
var logging = require('../js/logging');

class Leader extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.rank}</td>
        <td>{this.props.name}</td>
        <td>{this.props.result}</td>
      </tr>
    );
  }
}


module.exports = class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      co2: [],
      calories: [],
      metric: 'co2'
    };
  }

  toggleMetric(metric) {
    this.setState({metric: metric});
  }

  fetchData() {
    logging.getLeaderboard('co2', (e, data) => {
      if(e) {
        console.error(e);
        return alert('Unable to fetch leaderboard. Please try again later.');
      }
      this.setState({co2: _.reject(_.sortBy(data.result, neighborhood => -neighborhood.result), neighborhood => !neighborhood.startNeighborhood)});
    });
    logging.getLeaderboard('calories', (e, data) => {
      if(e) {
        console.error(e);
      }
      this.setState({calories: _.reject(_.sortBy(data.result, neighborhood => -neighborhood.result), neighborhood => !neighborhood.startNeighborhood)});
    });
  }

  render() {
    let leaderboard = this.state[this.state.metric].map((neighborhood, idx) => {
      return <Leader rank={idx + 1} name={neighborhood.startNeighborhood} result={neighborhood.result} key={idx} />;
    });

    let metricColumnTitle = (this.state.metric === 'co2') ? 'CO2 (lbs.)' : 'Calories';

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
                <th>{metricColumnTitle}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard}
            </tbody>
          </table>
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
    this.fetchData();
  }
};
