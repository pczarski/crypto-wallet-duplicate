import React from 'react';

import '../styles/App.scss';

import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import {makeWallet} from "../lib/backendHandler.js"

export default class CreateNew extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {

  }
  makeWallet() {

  }
  async handleClick(e) {
    e.preventDefault();
    console.log('wallet made');
    localStorage.setItem('hasWallet', true);
    const wallet = makeWallet("currency", "name", "Bitcoin");

    console.log(wallet)

    //
  }

  render () {
    return (
      <div className="wrapper">
        <div className="container">
          <h1>Create New Wallet</h1>
            <Link to="/wallet">
              <Button type="button" className="btn btn-primary bt3" onClick={this.handleClick}>Create new wallet</Button>
          </Link>
          <Link to="/">
              <Button type="button" className="btn btn-primary bt4">Go back</Button>
          </Link>
        </div>
      </div>
    );
  }
}
