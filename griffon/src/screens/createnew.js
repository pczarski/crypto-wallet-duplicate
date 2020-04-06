import React from 'react';

import '../styles/App.scss';

import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import {makeWallet} from "../lib/backendHandler.js"


export default class CreateNew extends React.Component {
  state = {
    data: [],
    wallet: null
  };


  async handleClick() {
    console.log('wallet made');
    localStorage.setItem('hasWallet', true);
    const wallet = await makeWallet("");
    console.log(wallet)
  }
 

  render () {
    return (
      <div className="wrapper">
        <div className="container">
          <h1>create new Wallet</h1>
          <div className='d-flex flex-row justify-content-around'>
            <Link to="/wallet">
                <Button type="button" className="btn btn-primary" onClick={this.handleClick}>Create new wallet</Button>
            </Link>
            <Link to="/">
                <Button type="button" className="btn btn-primary">Go back</Button>
            </Link>
            <Button type="button" className="btn btn-primary" onClick={this.handleClick}>Get Password</Button>
          </div>
        </div>
      </div>
    );
  }
}
