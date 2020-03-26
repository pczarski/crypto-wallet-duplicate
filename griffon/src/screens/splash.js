import React from 'react';
import '../styles/App.scss';
import '../styles/splash.scss';

import {Link} from 'react-router-dom';

import {Button} from 'reactstrap';

export default class Splash extends React.Component {

  render () {
    return (
      <div className="wrapper">
        <div className="container">
            <h1>griffon</h1>
            <div className='d-flex flex-row justify-content-around'>
              <Link to="/createnew">
                  <Button type="button" size="lg" className="btn btn-primary">Create a new wallet</Button>
              </Link>
              <Link to="/recover">
                  <Button type="button" size="lg" className="btn btn-primary">Recover wallet from seed phrase</Button>
              </Link>
              <Link to="/wallet">
                  <Button type="button" size="lg" className="btn btn-primary">Go to wallet</Button>
              </Link>
            </div>
          </div>
       </div>
    );
  }
}
