import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import '../styles/buy.scss';
import {Link} from 'react-router-dom';

import { Button } from 'reactstrap';

import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";

export default class TopUp extends React.Component {
  render () {
    return (
                  <div className="wrapper">
                      <Nav/>
                  <div className="box">
                  <form className="text-center  p-5" action="#!">
    <p className="h4 mb-4">Send Currency</p>

    <div className="form-row mb-4 ">
        <div className="col">
        <label >Currency:</label>
        <select id="Crypto" className="form-control" name="cars" >

    <option value="BTC">Bitcoin</option>
    <option value="ETH">Etherium</option>
    <option value="LTC">Litecoin</option>
    <option value="USTC">Tether</option>
    <option value="Dash">Dash</option>
  </select>
        </div>
        <div className="col">
        <label >To:</label>
             <input type="text"  className="form-control" placeholder="Enter your Public Key address" />
        </div>


    </div>

    <div className="form-row mb-4">

    <div className="col">
<label >Enter Amount:</label>
    <input type="number" className="form-control mb-4" placeholder="0.00"/></div><p id="arrow" onClick=""> <a id="test" href="#">&#8644;</a></p>
    <div className="col">
    <label >To:</label>
    <input  type="number"  className="form-control" placeholder="0.00" />
    </div></div>

    <div className="form-row mb-4">
    <div className="col">
        <button className="btn btn-info my-4 btn-block" type="submit">Continue</button>
        </div>
        <div className="col">
        <Link to= "Buy">
            <button className="btn btn-info my-4 btn-block" >Back</button></Link>
            </div>
            </div>
</form>
                  </div>
                  </div>

    );
  }
}
//    <input type="text" id="defaultRegisterPhonePassword" className="form-control" placeholder="Phone number" aria-describedby="defaultRegisterFormPhoneHelpBlock"/>
