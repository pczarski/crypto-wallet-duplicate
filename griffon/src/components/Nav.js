import React, {useState} from 'react';

import '../styles/App.scss';
import '../styles/nav.scss';
import { useLocation } from 'react-router-dom'
import Balance from '../components/Balance';
import {Link} from 'react-router-dom';

import Wallet from '../assets/wallet.svg';
// import Sett from '../assets/wallet.svg';
import Exch from '../assets/exchange.svg';
import Sett from '../assets/settings.svg'
import MenuLink from "./common/menuLink";

function Nav() {
    const wallet = () => {
        return (
            <div>
                <img id='icon' src ={Wallet} alt = 'wallet icon'/> <span className={"iconPadding"}>Wallet</span>
            </div>
        )
    };

    const exchange = () => {
        return (
            <div>
                <img id='icon' src ={Exch} alt = 'exchange icon'/> <span className={"iconPadding"}>Exchange</span>
            </div>
        )
    };

    const location = useLocation().pathname;

  return (
    <div id="wrap">
    <nav id="sidebar">
        <div className="sidebar-header">
            <Balance />
        </div>
        <div style={{marginTop: '10%'}}></div>
            <ul className="list-group list-group-flush">
                <li className="list-items">
                    <MenuLink to={"/wallet"} active={(location==='/wallet')}
                              text={wallet()}
                    />
                </li>
                <li className="list-items">
                    <MenuLink to={"/ExchangeAccess"} active={(location==='/ExchangeAccess')}
                              text={exchange()}
                    />
                </li>
                <li className="list-items">
                    <Link className="list-group-item list-group-item-action bg-dark active iconPadding" to="/wallet">
                        <img id='icon' src ={Wallet} alt = 'wallet icon'/> <span className={"iconPadding"}>Wallet</span>
                    </Link>
                </li>
                <li className="list-items">
                    <Link className="list-group-item list-group-item-action bg-dark active iconPadding" to="/ExchangeAccess">
                        <img id='icon' src ={Exch} alt = 'exchange icon'/> <span className={"iconPadding"}>Exchange</span>
                    </Link>
                </li>
                <div className="bottomMenu">
                    <li className="list-items">
                    <Link className="list-group-item list-group-item-action bg-dark active iconPadding" to="/settings">
                        <img id='icon' src ={Sett} alt = 'settings icon'/> <span className={"iconPadding"}>Settings</span>
                    </Link>
                    </li>
                </div>
            </ul>
    </nav>
</div>
  );
}

export default Nav;
