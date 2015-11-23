var React = require('react');
import { Link } from 'react-router'
var SiteMenu = require('./site_menu.jsx');

module.exports = class Safety extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="section-header section-green">
          <h2>Walk and Roll:<br />Palm Springs</h2>
        </div>
        <div className="section-content">
          <h1 className="page-title green">Safety Tips</h1>
        </div>
        <div className="section-content">
          <p>It’s up to all of us to keep our streets safe. Follow these tips and enjoy walking and rolling safely around Palm Springs.</p>
        </div>
        <div className="section-header section-green">
          <h3>Walking Safety</h3>
        </div>
        <div className="section-content">
          <div className="safety-section">
            <img src="/images/ped_safety/1_crosswalk.png" className="safety-image" />
            <div className="safety-text">Cross at crosswalks, when possible</div>
          </div>
          <div className="safety-section">
            <div className="safety-text">Obey traffic signals</div>
            <img src="/images/ped_safety/2_signal.png" className="safety-image" />
          </div>
          <div className="safety-section">
            <img src="/images/ped_safety/3_look.png" className="safety-image" />
            <div className="safety-text">Look left, right, and left again before crossing</div>
          </div>
          <div className="safety-section">
            <div className="safety-text">Make eye contact with drivers before passing them</div>
            <img src="/images/ped_safety/7_eyecontact.png" className="safety-image" />
          </div>
          <div className="safety-section">
            <img src="/images/ped_safety/4_obstacles.png" className="safety-image" />
            <div className="safety-text">Be visible before crossing; stand clear of obstacles</div>
          </div>
          <div className="safety-section">
            <div className="safety-text">Don’t walk with distractions</div>
            <img src="/images/ped_safety/5_headphones.png" className="safety-image" />
          </div>
          <div className="safety-section">
            <img src="/images/ped_safety/6_flashlight.png" className="safety-image" />
            <div className="safety-text">Carry a flashlight when walking at night</div>
          </div>
        </div>
        <div className="section-header section-green">
          <h3>Bicyling Safety</h3>
        </div>
        <div className="section-content">
          <div className="safety-section">
            <img src="/images/bike_safety/1_helmet.png" className="safety-image" />
            <div className="safety-text">Wear a helmet</div>
          </div>
          <div className="safety-section">
            <div className="safety-text">Wear reflective clothing</div>
            <img src="/images/bike_safety/2_reflective.png" className="safety-image" />
          </div>
          <div className="safety-section">
            <img src="/images/bike_safety/3_lights.png" className="safety-image" />
            <div className="safety-text">Use a white headlight and red rear light</div>
          </div>
          <div className="safety-section">
            <div className="safety-text">Lock your front wheel and frame</div>
            <img src="/images/bike_safety/4_lock.png" className="safety-image" />
          </div>
          <div className="safety-section">
            <img src="/images/bike_safety/5_police.png" className="safety-image" />
            <div className="safety-text">Register your bike with the police</div>
          </div>
          <div className="safety-section">
            <div className="safety-text">Learn and use hand turn signals</div>
            <img src="/images/bike_safety/6_signal.png" className="safety-image" />
          </div>
          <div className="safety-section">
            <img src="/images/bike_safety/7_lane.png" className="safety-image" />
            <div className="safety-text">Watch for car doors</div>
          </div>
          <div className="safety-section">
            <div className="safety-text">Keep tires inflated and bike maintained</div>
            <img src="/images/bike_safety/8_maintenance.png" className="safety-image" />
          </div>
        </div>
        <SiteMenu selected="safety" color="green" />
      </div>
    );
  }
};
