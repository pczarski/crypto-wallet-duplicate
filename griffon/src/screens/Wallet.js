import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';


import { Button, Alert, FormGroup, Input } from 'reactstrap';

export default class Wallet extends React.Component {

  addMoney(curr) {
    if (localStorage.getItem('balance') === null) {
        localStorage.setItem('balance', curr);  
    }
    else {
        var temp_bal = parseInt(localStorage.getItem('balance'),10);
        var temp_bal1 = temp_bal + curr;
        alert(temp_bal1);
        localStorage.setItem('balance', temp_bal1);  
    }
  } 

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