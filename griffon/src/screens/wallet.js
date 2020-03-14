import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';
import {getRequest} from '../lib/backendHandler.js';


import { Button, Alert, FormGroup, Input } from 'reactstrap';

export default class Wallet extends React.Component {


  render () {

      const currency = getRequest("currency", "name", "Bitcoin");
      console.log(currency);

    return (
      <div className="wrapper">
        <Nav />
        <div className="content">
          <Alert color="primary">We are on the Wallet page</Alert>
          <Link to="/">
            <Button type="button" className="btn btn-primary">Go back</Button>
          </Link>

            <div>
                <h5>
                    <br/>
                    {currency['name']}
                </h5>
                <p>balance: {currency['balance']}</p>
            </div>

          </div>
      </div>
    );
  }
}