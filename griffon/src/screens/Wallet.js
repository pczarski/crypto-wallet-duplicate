import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';


import { Button, Alert } from 'reactstrap';

export default class Wallet extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <Nav />
        <div className="content">
          <Alert color="primary">We are on the Wallet page</Alert>
          <Link to="/">
            <Button type="button" className="btn btn-primary">Go back</Button>
          </Link>
          </div>
      </div>
    );
  }
}