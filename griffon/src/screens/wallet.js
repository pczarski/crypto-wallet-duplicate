import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';
import '../styles/coinLogos.css';

import {getCurr} from '../lib/backendHandler.js';
import {roundTo2} from '../lib/helper.js';

import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";
import thetherLogo from "../../node_modules/cryptocurrency-icons/svg/color/usdt.svg";
import { Button } from 'reactstrap';

import {receiver } from "../lib/helper"
const {ipcRenderer} = window.require("electron")

export default class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      supportedCurr: ["BTC", "ETH", "DASH", "LTC", 	"USDT"],
      currency: [],
      seed: null
    }


    console.log(ipcRenderer)

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
            <div className='d-flex flex-row justify-content-around'>
            <Link to="/transfer">
              <Button className="btn btn-primary" size="lg">Send or Receive Currency</Button> 
            </Link>
            </div>
            <div className = "row">
              <div className = "bitcoin-container">
                <img src={bitcoinLogo} alt= "Bitcoin"></img>
                <div className ="bitcoin-overlay">
                  {
                  this.state.currency && this.state.currency[0] &&
                    <div className="bitcoin-price">
                      <b>{this.state.currency[0].name}</b> <br /> <br />
                      <b>Price</b> {roundTo2(this.state.currency[0].price)} <br />
                      <b>Balance</b> {roundTo2(this.state.currency[0].balance)}
                    </div>
                  }
                </div>
              </div>
              <div className ="ethereum-container">
                <img src={ethLogo} alt="Ethereum"></img>
                <div className ="ethereum-overlay">
                  {
                    this.state.currency && this.state.currency[1] &&
                    <div className ="ethereum-price">
                      <b>{this.state.currency[1].name}</b> <br /> <br />
                      <b>Price</b> {roundTo2(this.state.currency[1].price)} <br />
                      <b>Balance</b> {roundTo2(this.state.currency[1].balance)}
                    </div>
                  }
                </div>
              </div>
              <div className ="dash-container">
                <img src={dashLogo} alt = "Dash"></img>
                <div className = "dash-overlay">
                  {
                    this.state.currency && this.state.currency[2] &&
                    <div className ="dash-price">
                      <b>{this.state.currency[2].name}</b> <br /> <br />
                      <b>Price</b> {roundTo2(this.state.currency[2].price)} <br />
                      <b>Balance</b> {roundTo2(this.state.currency[2].balance)}
                    </div>
                  }
                </div>
              </div>
              <div className ="litecoin-container">
                <img src={liteLogo} alt = "LiteCoin"></img>
                <div className = "litecoin-overlay">
                  {
                    this.state.currency && this.state.currency[2] &&
                    <div className ="litecoin-price">
                      <b>{this.state.currency[3].name}</b> <br /> <br />
                      <b>Price</b> {roundTo2(this.state.currency[3].price)} <br />
                      <b>Balance</b> {roundTo2(this.state.currency[3].balance)}
                    </div>
                  }
                </div>
              </div> 
              {/* change to thether */}
              <div className ="litecoin-container">
                <img src={thetherLogo} alt = "LiteCoin"></img>
                <div className = "litecoin-overlay">
                  {
                    this.state.currency && this.state.currency[2] &&
                    <div className ="litecoin-price">
                      <b>{this.state.currency[4].name}</b> <br /> <br />
                      <b>Price</b> {roundTo2(this.state.currency[4].price)} <br />
                      <b>Balance</b> {roundTo2(this.state.currency[4].balance)}
                    </div>
                  }
                </div>
              </div>
            </div>
            <Link to="/">
              <Button className="btn btn-primary" size="lg" block>Go back</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
