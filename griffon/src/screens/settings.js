import React from 'react';
import Nav from '../components/Nav';


import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';
import RecoveryPhrase from '../components/RecoveryPhrase';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
  render () {
    return (
      <div className="wrapper">
       <Nav/>
       <div className="content">
       <nav className="navbar ">
       <h1>Settings</h1>
		    <ul id="nav1">
			    <li>
            {/* <a href="#"> */}
            Change Password
            {/* </a> */}
          </li>
          <li>
            {/* <a href="#"> */}
              Private Keys
            {/* </a> */}
          </li>
          <li>
            {/* <a href="#"> */}
              Display recovery phrase
            {/* </a> */}
          </li>
		    </ul>
      </nav>
      {this.state.selected === "RecoveryPhrase" && <RecoveryPhrase/>}
      <RecoveryPhrase/>
      </div>
      </div>
    );
  }
}
