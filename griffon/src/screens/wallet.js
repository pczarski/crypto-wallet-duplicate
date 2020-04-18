import React from 'react';
import Nav from '../components/Nav';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import '../styles/App.scss';
import '../styles/nav.scss';
import '../styles/bal.scss';

import Coins from '../components/walletComponents/Coins.js';

import { Button } from 'reactstrap';

export default class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      supportedCurr: ["BTC", "ETH", "DASH", "LTC", 	"USDT"],
      currency: [],
      seed: null,
      goToTransfer: false,
    }
  }

  handleCoinClick = (coin) => {
    this.props.handleCoinClick(coin);
    console.log(coin);
    this.setState({
      goToTransfer: true,
    });
  };

  render () {
    const transfer = this.state.goToTransfer;
    if (transfer) {
      return (
          <Redirect to="/transfer"/>
      )
    }

    return (
      <div className="wrapper">
      <Nav />
        <div className="cont">
          <div className="content">
              <Coins fetch={this.props.fetch} coins={this.props.coins} coinClick={this.handleCoinClick}/>

          </div>
        </div>
      </div>
    );
  }
}
