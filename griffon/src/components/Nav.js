import React from 'react';

import '../styles/App.scss';
import '../styles/nav.scss';

import Balance from '../components/Balance';
import {Link} from 'react-router-dom';

import Wallet from '../assets/wallet.svg';
// import Sett from '../assets/wallet.svg';
import Exch from '../assets/exchange.svg';
import Sett from '../assets/settings.svg'

function Nav() {
  return (
    <div id="wrap">
    <nav id="sidebar">
        <div className="sidebar-header">
            <Balance />
        </div>
        <div className="dropdown-divider"></div>
            <ul className="list-group list-group-flush">
                <li className="list-items">
                    <Link className="list-group-item list-group-item-action bg-dark active" to="/wallet">
                        <img id='icon' src ={Wallet} alt = 'wallet icon'/>Wallet
                    </Link>
                </li>
                <li className="list-items">
                    <Link className="list-group-item list-group-item-action bg-dark active" to="/ExchangeAccess">
                        <img id='icon' src ={Exch} alt = 'exchange icon'/>Exchange
                    </Link>
                </li>
                <div className="bottomMenu">
                    <li className="list-items">
                    <Link className="list-group-item list-group-item-action bg-dark active" to="/settings">
                        <img id='icon' src ={Sett} alt = 'settings icon'/>Settings
                    </Link>
                    </li>
                </div>
            </ul>
    </nav>
</div>
  );
}

export default Nav;
