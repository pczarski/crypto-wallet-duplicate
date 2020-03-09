import React from 'react';
import '../styles/App.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <div className="wrapper">
    <nav id="sidebar">
        <div className="sidebar-header">
            <h3>Bootstrap Sidebar</h3>
        </div>
        <ul className="list-unstyled components">
            <li>
                Wallet
            </li>
            <li>
                Exchange
            </li>
            <li>
                Settings
            </li>
            <li>
                Help
            </li>
        </ul>

    </nav>
    
    </div>
  );
}

export default Nav;
