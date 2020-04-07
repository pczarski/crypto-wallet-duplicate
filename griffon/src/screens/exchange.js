import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";


import { Button, Alert } from 'reactstrap';

export default class Exchange extends React.Component {
  render () {
    return (
                  <div className="wrapper">
                      <Nav/>
                      <nav class="navbar 1">
                      <h1>Exchange</h1>
                       <ul id="nav1">

                           <li id="active"><a href="#">Instant Exchange</a></li>
                           <li ><a href="#">Order History</a></li>
                       </ul>
                       </nav>
                       <div className="extra1">
                       <div className="cryptoicons">
                       <img className="btc"src={bitcoinLogo} alt= "Bitcoin"></img> <img className="eth"src={ethLogo} alt= "Etherium"></img>

                       </div>
                       <div className="convert">
                       <input className="input1" type='text' name="current" placeholder="0.00" /><select id="cars2">

  <option value="BTC">BTC</option>

</select>  <input className="bob"type="button" value="swap"/><select id="cars">
  <option value="ETH">ETH</option>

</select><input className="input2" type='text' name="current" placeholder="0.00" />
                       </div>
                        <div className="Available">
                        <p className="Available1">Available: 0 BTC</p>
                        <input className="exchange1"type="button" value="exchange"/></div>

                       </div>
                     </div>
    );
  }
}
// <input className="input1" type='text' name="current" placeholder="0.00" />   <input className="input2" type='text' name="current" placeholder="0.00" />
// <img className="btc"src={bitcoinLogo} alt= "Bitcoin"></img>
// <img className="eth"src={ethLogo} alt= "Etherium"></img>
