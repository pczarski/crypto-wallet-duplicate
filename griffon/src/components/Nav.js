import React from 'react';
import '../styles/App.scss';
import Balance from '../components/Balance';
import ExchangeAccess from "../screens/ExchangeAccess.js";
import {Link} from 'react-router-dom';


function Nav() {
  return (
    <nav id="sidebar">
        <div className="sidebar-header">
            <Balance />
        </div>
        <ul className="list-unstyled components">
            <li className="listElement">
                <Link to="/wallet">
                    Wallet
                </Link>
            </li>
            <li>
                <Link to="/ExchangeAccess">
                    Exchange
                </Link>
            </li>
            <div className="dropdown-divider"></div>
            <div className="bottomMenu">
                <li>
                <Link to="/settings">
                    Settings
                    </Link>
                </li>

                <li>
                <Link to="/help">
                    Help
                    </Link>
                </li>
            </div>
        </ul>
    </nav>

  );
}

export default Nav;
