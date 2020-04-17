import React from 'react';
import Nav from '../Nav';

import '../../styles/nav.scss';
import '../../styles/App.scss';
import '../../styles/bal.scss';
import '../../styles/exchange.scss';
import {Redirect} from 'react-router-dom';
import {COINS, SELL, BUY, WITHDRAW, DEPOSIT, SWAP} from "../../App";
import Order from "./order";
import Withdraw from "./withdraw";
import Deposit from "./deposit";
import CurrencySelect from "../../components/common/currencySelect";
import $ from "jquery";
import Swap from "./swap";
import {Form} from 'reactstrap';

function getSubmit(option) {
    switch (option) {
        case WITHDRAW:
            return "Withdraw";
        case DEPOSIT:
            return "Deposit";
        default:
            return "Place Order";
    }
}

const urlBase = 'http://localhost:8080/';
export default class Trade extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: "",
        }
    }

    updateOrderResponse = (data) => {
        console.log(data);
        this.setState({
            response: "order placed with id " + data.id,
        });
    };

    handleOrderError = (error) => {
      console.log(error.getAllResponseHeaders());
    };

    handleSubmit = () => {
        console.log("called!!");
        switch (this.props.mainComponent) {
            case SWAP:
                this.placeSwapOrder();
                break;
            case SELL:
                this.placeSellOrder();
                break;
            case BUY:
                this.placeBuyOrder();
                break;
            case WITHDRAW:
                this.placeWithdrawOrder();
                break;
            case DEPOSIT:
                this.placeDepositOrder();
                break;
            default:
                console.log("we shouldn't be here");
        }
    };

    placeSellOrder = () => {
        const url = urlBase + "new-order?type=Sell&exchange="+
            this.props.exchange.value+"&currency1="+
            this.props.coin+"&currency2="+
            this.props.coin2+"&amount="+
            this.props.amount+"&price="+
            this.props.price;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: this.updateOrderResponse,
            error: this.handleOrderError,
        });
    };

    placeBuyOrder = () => {
        const url = urlBase + "new-order?type=Buy&exchange="+
            this.props.exchange.value+"&currency1="+
            this.props.coin+"&currency2="+
            this.props.coin2+"&amount="+
            this.props.amount+"&price="+
            this.props.price;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: this.updateOrderResponse,
            error: this.handleOrderError,
        });
    };
    placeSwapOrder = () => {
        const url = urlBase + "swap?exchange="+
            this.props.exchange.value+"&currency1="+
            this.props.coin+"&currency2="+
            this.props.coin2+"&amount="+
            this.props.amount;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: this.updateOrderResponse,
            error: this.handleOrderError,
        });
    };
    placeWithdrawOrder = () => {

    };
    placeDepositOrder = () => {

    };

    goBack = () => {
        this.props.goBack(COINS);
    };

    goToSwap = () => {
        this.fetchPriceIn();
        this.props.setMainComponent(SWAP);
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
                mainComponent = <Order
                    coins={this.props.coins} exchange={this.props.exchange}
                    marketPrice={marketPrice} label={"you will get:"}
                    title={"Sell"}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                    price={price} setPrice={this.props.setPrice}
                    amount={this.props.amount} setAmount={this.props.setAmount}
                    amount2={this.props.amount2} setAmount2={this.props.setAmount2}
                />;
                break;
            case BUY:
                mainComponent = <Order
                    coins={this.props.coins} exchange={this.props.exchange}
                    marketPrice={marketPrice} label={"you will need:"}
                    title={"Buy"}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                    price={price} setPrice={this.props.setPrice}
                    amount={this.props.amount} setAmount={this.props.setAmount}
                    amount2={this.props.amount2} setAmount2={this.props.setAmount2}
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
                mainComponent = <Swap
                    coins={this.props.coins} exchange={this.props.exchange}
                    marketPrice={marketPrice} label={"you will get:"}
                    title={"Swap"}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                    price={price} setPrice={this.props.setPrice}
                    amount={this.props.amount} setAmount={this.props.setAmount}
                    amount2={this.props.amount2} setAmount2={this.props.setAmount2}
                />;
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
                    <button onClick={this.goToSwap}>
                        Swap
                    </button>
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
                    <Form>
                        {mainComponent}
                        <button type="button" onClick={this.handleSubmit}>
                            {getSubmit(selectedMainComponent)}
                        </button>
                        <p>{this.state.response} </p>
                    </Form>

                </div>
            </div>
        );
    }
}
