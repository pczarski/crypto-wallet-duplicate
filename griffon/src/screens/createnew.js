import React from 'react';

import '../styles/App.scss';

import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import {makeWallet} from "../lib/backendHandler.js"


const { ipcRenderer } = window.require('electron') // ipc rendered used to set password

export default class CreateNew extends React.Component {
  state = {
    data: [],
    wallet: null
  };


  async handleClick() {
    console.log('wallet made');
    localStorage.setItem('hasWallet', true);
    const wallet = makeWallet();
    // this.setState({wallet: wallet})
    console.log(wallet)
  }
  async getPass() {
    ipcRenderer.send('get-password', "user").then((result) => {
      console.log(result)
    })
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
            <Button type="button" className="btn btn-primary" onClick={this.getPass()}>Get Password</Button>

          </div>
        </div>
      </div>
    );
  }
}
