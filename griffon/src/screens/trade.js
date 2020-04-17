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
import CurrencySelect from "../components/common/currencySelect";
import $ from "jquery";
import Portfolio from "../components/exchange/portfolio";



export default class Trade extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    goBack = () => {
        this.props.goBack(COINS);
    };

    goToSell = () => {
        this.fetchPriceIn();
        this.props.setMainComponent(SELL);
    };

    gotToBuy = () => {
        this.fetchPriceIn();
        this.props.setMainComponent(BUY);
    };

    goToWithdraw = () => {
        this.props.setMainComponent(WITHDRAW);
    };

    goToDeposit = () => {
        this.props.setMainComponent(DEPOSIT);
    };

    fetchPriceIn = () => {
        const url =
            "http://localhost:8080/exchange-price-in?exchange="+
            this.props.exchange.value+"&base="+this.props.coin+
            "&in="+this.props.coin2;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: this.setPrice,
        });
    };

    render () {
        if(this.props.coins === null || !this.props.setMainComponent){
            // we shouldn't be here
            return(<Redirect to='/ExchangeAccess'/>);
        }
        const marketPrice = this.props.marketPrice;
        const price = this.props.price;
        const selectedMainComponent = this.props.mainComponent;
        let mainComponent;
        switch (selectedMainComponent) {
            case SELL:
                mainComponent = <Sell
                    coins={this.props.coins} exchange={this.props.exchange}
                    marketPrice={marketPrice}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                    price={price} setPrice={this.props.setPrice}
                    amount={this.props.amount} setAmount={this.props.setAmount}
                    amount2={this.props.amount2} setAmount2={this.props.setAmount2}
                />;
                break;
            case BUY:
                mainComponent = <Buy
                    coins={this.props.coins}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                />;
                break;
            case WITHDRAW:
                mainComponent = <Withdraw
                    coins={this.props.coins}
                    coin={this.props.coin} setCoin={this.props.setCoin}/>;
                break;
            case DEPOSIT:
                mainComponent = <Deposit
                    coins={this.props.coins}
                    coin={this.props.coin} setCoin={this.props.setCoin}/>;
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
                        <CurrencySelect coin={selectedCoin}
                                        coins={this.props.coins}
                                        setCoin={this.props.setCoin}
                        />
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
