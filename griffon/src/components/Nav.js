import React from 'react';
import '../styles/App.scss';
import Balance from '../components/Balance';

import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav id="sidebar">
        <div className="sidebar-header">
            <Balance />
        </div>
        <ul className="list-unstyled components">
            <li className="listElement">
                Wallet
            </li>
            <li>
                Exchange
            </li>
            <div className="dropdown-divider"></div>
            <div className="bottomMenu">
                <li>
                    Settings
                </li>
                <li>
                    Help
                </li>
            </div>
        </ul>
    </nav>
    
  );
}

export default Nav;
