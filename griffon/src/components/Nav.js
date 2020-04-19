import React, {useState} from 'react';

import '../styles/App.scss';
import '../styles/nav.scss';
import { useLocation } from 'react-router-dom'
import Balance from '../components/Balance';
import {Link} from 'react-router-dom';

import Wallet from '../assets/wallet.svg';
import Exch from '../assets/exchange.svg';
import Sett from '../assets/settings.svg';
import WalletDark from '../assets/walletDark.svg';
import ExchDark from '../assets/exchangeDark.svg';
import SettDark from '../assets/settingsDark.svg'

import MenuLink from "./common/menuLink";

function Nav() {
    const location = useLocation().pathname;

    const wallet = () => {
        return (
            <div>
                <img id='icon' src ={(location==='/wallet' || location==='/transfer') ? WalletDark : Wallet}
                     alt = 'wallet icon'/> <span className={"iconPadding"}>Wallet</span>
            </div>
        )
    };

    const exchange = () => {
        return (
            <div>
                <img id='icon' src ={(location==='/ExchangeAccess')? ExchDark : Exch} alt = 'exchange icon'/> <span className={"iconPadding"}>Exchange</span>
            </div>
        )
    };

    const settings = () => {
        return (
            <div>
                <img id='icon' src ={(location==='/settings') ? SettDark : Sett} alt = 'settings icon'/> <span className={"iconPadding"}>Settings</span>
            </div>
        )
    };

    return (
        <div id="wrap">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <Balance />
                </div>
                <div style={{marginTop: '10%'}}></div>
                <ul className="list-group list-group-flush">
                    <li className="list-items">
                        <MenuLink to={"/wallet"} active={(location==='/wallet'|| location==='/transfer')}
                                  text={wallet()}
                        />
                    </li>
                    <li className="list-items">
                        <MenuLink to={"/ExchangeAccess"} active={(location==='/ExchangeAccess')}
                                  text={exchange()}
                        />
                    </li>
                    <div className="bottomMenu">
                        <li className="list-items">
                            <MenuLink to={"/settings"} active={(location==='/settings')}
                                      text={settings()}
                            />
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
