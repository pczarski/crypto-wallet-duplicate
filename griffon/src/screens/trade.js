import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import {Link, Redirect} from 'react-router-dom';
import {COINS, SELL, BUY, WITHDRAW, DEPOSIT} from "../App";
import Sell from "../components/exchange/sell";
import Buy from "../components/exchange/buy";
import Withdraw from "../components/exchange/withdraw";
import Deposit from "../components/exchange/deposit";



export default class Trade extends React.Component {

    goBack = () => {
        this.props.goBack(COINS);
    };

    goToSell = () => {
        this.props.setMainComponent(SELL);
    };

    gotToBuy = () => {
        this.props.setMainComponent(BUY);
    };

    goToWithdraw = () => {
        this.props.setMainComponent(WITHDRAW);
    };

    goToDeposit = () => {
        this.props.setMainComponent(DEPOSIT);
    };

    render () {
        if(this.props.coins === null || !this.props.setMainComponent){
            // we shouldn't be here
            return(<Redirect to='/ExchangeAccess'/>);
        }
        const selectedMainComponent = this.props.mainComponent;
        let mainComponent;
        switch (selectedMainComponent) {
            case SELL:
                mainComponent = <Sell
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                />;
                break;
            case BUY:
                mainComponent = <Buy
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                />;
                break;
            case WITHDRAW:
                mainComponent = <Withdraw coin={this.props.coin} setCoin={this.props.setCoin}/>;
                break;
            case DEPOSIT:
                mainComponent = <Deposit coin={this.props.coin} setCoin={this.props.setCoin}/>;
                break;
            default:
                mainComponent = null;
        }
        const selectedCoin = this.props.coin;
        return (
            <div className="wrapper">
                <Nav/>
                <div className="container">
                    <div>
                        TODO: dropdown here: {selectedCoin}
                    </div>
                    <button onClick={this.goBack}>
                        go back todo: make an X instead
                    </button>
                    <br/>
                    <button onClick={this.goToSell}>
                        Sell
                    </button>
                    <button onClick={this.gotToBuy}>
                        Buy
                    </button>
                    <button onClick={this.goToWithdraw}>
                        withdraw
                    </button>
                    <button onClick={this.goToDeposit}>
                        deposit
                    </button>
                    {mainComponent}

                </div>
            </div>
        );
    }
}
