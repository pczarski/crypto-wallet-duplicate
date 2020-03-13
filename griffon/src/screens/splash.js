import React from 'react';
import '../styles/App.scss';
import '../styles/splash.scss';

import {Link} from 'react-router-dom';

export default class Splash extends React.Component {

  render () {
    return (
      <div className="wrapper">
        <div className="main">
            <h1>griffon</h1>
            <Link to="/createnew">
                <button type="button" className="btn btn-primary">Create a new wallet</button>
            </Link>
            <Link to="/recover">
                <button type="button" className="btn btn-primary">Recover wallet from seed phrase</button>
            </Link>
            <Link to="/wallet">
                <button type="button" className="btn btn-primary">Go to wallet</button>
            </Link>
          </div>
      </div>
    );
  }
}
