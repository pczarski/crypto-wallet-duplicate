import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import {Link} from 'react-router-dom';

import { Button } from 'reactstrap';

import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
// import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
// import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";


// import { Button, Alert } from 'reactstrap';

export default class Order extends React.Component {
  render () {
    return (
                  <div className="wrapper">
                      <Nav/>
                      <nav className="navbar 1">
                      <h1>Exchange</h1>
                       <ul id="nav1">
                       <Link to ="exchange">
                           <li >Instant Exchange</li>
                           </Link>
                           <Link to ="order">
                           <li id="active">Place Order</li>
                           </Link>
                       </ul>
                       </nav>
                       <div className="extra1">
                       <div className="cryptoicons">
                       <img className="img1"src={bitcoinLogo} alt= "Bitcoin"></img> <img className="img2"src={ethLogo} alt= "Etherium"></img>

                       </div>
                       <div className="convert">
                       <input className="input1" type='number' name="current" placeholder="0.00" />
                       <select id="select2">
                       <option value="1">BTC</option>
                       <option value="2">Dash</option>
                       <option value="3">LTC</option>
                       <option value="4">ETH</option>

                      </select>
                    <input className="bob"type="button" value="swap"/>
                    <select id="select1">
                    <option value="1">ETH</option>
                    <option value="2">Dash</option>
                    <option value="3">LTC</option>
                    <option value="4">BTC</option>

                    </select>
                    <input className="input2" type='number' name="current" placeholder="0.00" />
                       </div>
                        <div className="Available">
                        <p className="Available1">Available Balance: 0 BTC</p>
                        <p className="Rate">Rate: 0 BTC  = 0 ETH</p>

                        <input className="exchange2"type="button" value="Place Order"/></div>

                       </div>
                     </div>
    );
  }
}
