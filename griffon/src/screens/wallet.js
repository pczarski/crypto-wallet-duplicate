import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';
import '../styles/coinLogos.css';

import Crypto from '../components/walletComponents/Coins.js';

import {getCurr} from '../lib/backendHandler.js';
// import {roundTo2} from '../lib/helper.js';


import { Button } from 'reactstrap';


const {ipcRenderer} = window.require("electron")

export default class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      supportedCurr: ["BTC", "ETH", "DASH", "LTC", 	"USDT"],
      currency: [],
      seed: null
    }
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg) // prints "pong"
    })
    ipcRenderer.send('asynchronous-message', 'ping')

  }

  getCurrencies () {
    let currencies = [];
    let getCurs = this.state.supportedCurr.map((i) => {
      return new Promise((resolve, reject) => {
        let req = getCurr(i)
        currencies.push({
          name: req.name,
          price: req.price,
          balance: req.balance
        });
        resolve(true);
      });
    })
    Promise.all(getCurs).then((d) => {
      this.setState({
        currency: [...this.state.currency, ...currencies] // <<<<
      })
    })
  }

  async componentDidMount() {
    await this.getCurrencies()
  }


  render () {

    return (
      <div className="wrapper">
      <Nav />
        <div className="container">
          <div className="content">
            <h1>Wallet</h1>

              <Crypto/>

            <Link to="/transfer">
              <Button className="btn btn-primary" size="lg" block>Send or Receive Currency</Button>
            </Link>
            <Link to="/orderHistory">
              <Button className="btn btn-primary" size="lg" block>View Order History</Button>
            </Link>
              <Link to="/">
                <Button className="btn btn-primary" size="lg" block>Go back</Button>
              </Link>
          </div>
        </div>
      </div>
    );
  }
}
