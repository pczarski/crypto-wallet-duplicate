import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import '../styles/buy.scss';
import {Link} from 'react-router-dom';

// import { Button } from 'reactstrap';
//
// import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
// import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
// import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";


// import { Button, Alert } from 'reactstrap';
//          <Route path="/Buy" render={(props) => <Buy {...props} />}/>
export default class Buy extends React.Component {
  render () {
    return (
                  <div className="wrapper">
                      <Nav/>
                  <div className="box">
                  <div className="icons">
                  <img src={bitcoinLogo} className="img-fluid" alt="Responsive crypyto logo" />
                  </div>
                  <div className="Available2">
                  Available: x BTC
                  </div>
                  <div className="123">
                  <Link to="/Withdraw">
                  <button type="button" class="btn btn-dark">Withdraw from Wallet</button></Link>
                  <Link to="/topup">
                  <button type="button" class="btn btn-dark">Top up Exchange</button></Link>
                  </div>

                  </div>

                  </div>

    );
  }
}
