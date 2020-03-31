import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';
import '../styles/coinLogos.css';
import {getRequest, getCurr} from '../lib/backendHandler.js';

//---import images for each currency---

import bitcoinLogo from '../assets/bitcoinLogo.png';
import ethLogo from '../assets/ethereum.png';
import dashLogo from '../assets/Dash.png';
import liteLogo from '../assets/litecoin.png';

//---------

import { Button } from 'reactstrap';


export default class Wallet extends React.Component {

  componentDidMount() {
    const currency = getRequest("currency", "name", "Bitcoin");
    console.log(currency);
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
            </div>
            <h3> list of currencies</h3>
            <div class = "row">
                    <div class = "bitcoin-container">
                        <img src={bitcoinLogo} alt= "Bitcoin"></img>
                        <div class ="bitcoin-overlay">
                          <div class="bitcoin-price">{getCurr("Bitcoin").price}</div>
                        </div>
                    </div>
                    <div class ="ethereum-container">
                        <img src={ethLogo} alt="Ethereum"></img>
                        <div class ="ethereum-overlay">
                            <div class ="ethereum-price">{getCurr("Ethereum").price}</div>
                        </div>
                     </div>
                    <div class ="dash-container">
                        <img src={dashLogo} alt = "Dash"></img>
                        <div class = "dash-overlay">
                            <div class ="dash-price">{getCurr("Dash").price}</div>
                         </div>
                     </div>
                    <div class ="litecoin-container">
                        <img src={liteLogo} alt = "LiteCoin"></img>
                        <div class = "litecoin-overlay">
                            <div class ="litecoin-price">{getCurr("Litecoin").price}</div>
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