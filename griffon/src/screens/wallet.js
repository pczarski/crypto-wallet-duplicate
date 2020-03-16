import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';
import {getRequest} from '../lib/backendHandler.js';

import { Button, Alert } from 'reactstrap';

export default class Wallet extends React.Component {


  render () {

      const currency = getRequest("currency", "name", "Bitcoin");
      console.log(currency);

    return (
      <div className="wrapper">
        <Nav />
        <div className="content">
          <h1>Wallet</h1>
          <Link to="/">
            <Button type="button" className="btn btn-primary">Go back</Button>
          </Link>

          </div>
      </div>
    );
  }
}