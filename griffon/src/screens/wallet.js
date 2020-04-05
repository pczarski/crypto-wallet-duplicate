import React from 'react';
import Nav from '../components/Nav';
import Popup from '../components/Popup';
import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';
import '../styles/coinLogos.css';

import {getRequest, getCurr} from '../lib/backendHandler.js';
import {roundTo2} from '../components/helper.js';

import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";

import { Button } from 'reactstrap';


export default class Wallet extends React.Component {

  componentDidMount() {
    const currency = getRequest("currency", "name", "Bitcoin");
    console.log(currency); // we don't "NEED" all of the calls. we can just call once and store into state
    // also, ideally round all of the prices
    
  }

  render () {
    return (
      <div className="wrapper">  
      <Nav />
        <div className="container">
          <div className="content">
            <h1>Wallet</h1>
            <div className='d-flex flex-row justify-content-around'>
              <Button className="btn btn-primary" size="lg">Send</Button>
              <Button type="button" className="btn btn-primary" size="lg">Receive</Button>
              <Popup/>
            </div>
            <div className = "row">
                    <div className = "bitcoin-container">
                        <img src={bitcoinLogo} alt= "Bitcoin"></img>
                        <div className ="bitcoin-overlay">
                          <div className="bitcoin-price">
                              <b>Price</b> {roundTo2(getCurr("Bitcoin").price)} <br />
                              <b>Balance</b> {roundTo2(getCurr("Bitcoin").balance)}
                          </div>
                        </div>
                    </div>
                    <div className ="ethereum-container">
                        <img src={ethLogo} alt="Ethereum"></img>
                        <div className ="ethereum-overlay">
                            <div className ="ethereum-price">
                              <b>Price</b> {roundTo2(getCurr("Ethereum").price)} <br />
                              <b>Balance</b> {roundTo2(getCurr("Ethereum").balance)}
                            </div>
                        </div>
                     </div>
                    <div className ="dash-container">
                        <img src={dashLogo} alt = "Dash"></img>
                        <div className = "dash-overlay">
                            <div className ="dash-price">
                              <b>Price</b> {roundTo2(getCurr("Dash").price)} <br />
                              <b>Balance</b> {roundTo2(getCurr("Dash").balance)}
                            </div>
                         </div>
                     </div>
                    <div className ="litecoin-container">
                        <img src={liteLogo} alt = "LiteCoin"></img>
                        <div className = "litecoin-overlay">
                            <div className ="litecoin-price">
                              <b>Price</b> {roundTo2(getCurr("Litecoin").price)} <br />
                              <b>Balance</b> {roundTo2(getCurr("Litecoin").balance)}
                            </div>
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
