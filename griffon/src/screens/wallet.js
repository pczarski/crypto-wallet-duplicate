import React from 'react';
import Nav from '../components/Nav';

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
      seed: null
    }
  }

  render () {

    return (
      <div className="wrapper">
      <Nav />
        <div className="container">
          <div className="content">
              <Coins fetch={this.props.fetch} coins={this.props.coins}/>
            <Link to="/transfer">
              <Button className="btn btn-primary" size="lg" block>Send or Receive Currency</Button>
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
