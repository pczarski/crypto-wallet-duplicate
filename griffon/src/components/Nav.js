import React from 'react';

import '../styles/App.scss';
import '../styles/nav.scss';

import Balance from '../components/Balance';
import ExchangeAccess from "../screens/ExchangeAccess.js";
import {Link} from 'react-router-dom';


function Nav() {
  return (
    <div id="wrap">
    <nav id="sidebar">
        <div className="sidebar-header">
            <Balance />
        </div>
        <div className="dropdown-divider"></div>
       
            <ul className="list-group list-group-flush">
                <li className="listElement">
                    <Link className="list-group-item list-group-item-action bg-dark active" to="/wallet">
                        Wallet
                    </Link>
                </li>
                <li>
                    <Link className="list-group-item list-group-item-action bg-dark active" to="/ExchangeAccess">
                        Exchange
                <li>
                <Link className="list-group-item list-group-item-action bg-dark active" to="/orders">
                    Add Exchange
                    </Link>
                </li>
                
                <div className="bottomMenu">
                    <li>
                    <Link className="list-group-item list-group-item-action bg-dark active" to="/settings">
                        Settings
                        </Link>
                    </li>
                    <li>
                    <Link className="list-group-item list-group-item-action bg-dark active" to="/help">
                        Help
                        </Link>
                    </li>
                </div>

            </ul>
    
    </nav>
</div>
  );
}

export default Nav;
