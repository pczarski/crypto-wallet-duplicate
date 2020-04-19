import React from 'react';

import '../../styles/nav.scss';
import '../../styles/App.scss';
import '../../styles/bal.scss';
import '../../styles/exchange.scss';


import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';
import {COINS, SELL, BUY, WITHDRAW, DEPOSIT, SWAP} from "../../App";
import Order from "./order";
import WithdrawDeposit from "./withdrawDeposit";

import $ from "jquery";
import Swap from "./swap";
import {getCoinByCode, roundTo2} from "../../lib/helper";
import {Form, Button, Card, CardBody} from 'reactstrap';
import {cardStyles} from "../../styles/selectStyles";

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
            isError: false,
        }
    }

    updateOrderResponse = (data) => {
        console.log(data);
        this.setState({
            response: "order placed with id " + data.id,
            isError: false,
        });
        this.props.setAmount(0.0);
        this.props.setAmount2(0.0);
    };

    updateWithdrawDepositResponse = (data) => {
        console.log(data);
        this.setState({
            response: "success!",
            isError: false,
        });
        this.props.setAmount(0.0);
        this.props.setAmount2(0.0);
    };


    handleOrderError = (error) => {
        if(error.status === 400){
            this.setState({
                response: "Insufficient balance",
                isError: true,
            });
            this.props.setAmount(0.0);
            this.props.setAmount2(0.0);
        } else {
            this.setState({
                response: "Couldn't place order",
                isError: true,
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
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
        const url = urlBase + "withdraw?exchange="+
            this.props.exchange.value+"&currency="+
            this.props.coin2+"&amount="+
            this.props.amount;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: this.updateWithdrawDepositResponse,
            error: this.handleOrderError,
        });
    };
    placeDepositOrder = () => {
        const url = urlBase + "deposit?exchange="+
            this.props.exchange.value+"&currency="+
            this.props.coin2+"&amount="+
            this.props.amount;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: this.updateWithdrawDepositResponse,
            error: this.handleOrderError,
        });
    };

    goBack = () => {
        this.props.goBack(COINS);
    };

    goToSwap = () => {
        this.fetchPriceIn();
        this.props.setMainComponent(SWAP);
        this.setState({
            response:"",
        })
    };

    goToSell = () => {
        this.fetchPriceIn();
        this.props.setMainComponent(SELL);
        this.setState({
            response:"",
        })
    };

    gotToBuy = () => {
        this.fetchPriceIn();
        this.props.setMainComponent(BUY);
        this.setState({
            response:"",
        })
    };

    goToWithdraw = () => {
        this.props.setMainComponent(WITHDRAW);
        this.setState({
            response:"",
        })
    };

    goToDeposit = () => {
        this.props.setMainComponent(DEPOSIT);
        this.setState({
            response:"",
        })
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
        const balance = getCoinByCode(this.props.coin, this.props.coins).balance;
        const balance2 = getCoinByCode(this.props.coin2, this.props.coins).balance;
        const balance3 = (this.props.walletCoins) ?
            getCoinByCode(this.props.coin2, this.props.walletCoins).balance : "";
        let mainComponent;
        switch (selectedMainComponent) {
            case SELL:
                mainComponent = <Order
                    coins={this.props.coins} exchange={this.props.exchange}
                    marketPrice={marketPrice} label={"You will get:"}
                    title={"Sell"} balance={balance}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                    price={price} setPrice={this.props.setPrice}
                    amount={this.props.amount} setAmount={this.props.setAmount}
                    amount2={this.props.amount2} setAmount2={this.props.setAmount2}
                    available={roundTo2(balance)+" "+this.props.coin}
                />;
                break;
            case BUY:
                mainComponent = <Order
                    coins={this.props.coins} exchange={this.props.exchange}
                    marketPrice={marketPrice} label={"You will need:"}
                    title={"Buy"} balance={balance}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                    price={price} setPrice={this.props.setPrice}
                    amount={this.props.amount} setAmount={this.props.setAmount}
                    amount2={this.props.amount2} setAmount2={this.props.setAmount2}
                    available={roundTo2(balance2)+" "+this.props.coin2}
                />;
                break;
            case WITHDRAW:
                mainComponent = <WithdrawDeposit id='withdraw-deposit'
                                                 coins={this.props.coins} title={"Withdraw"}
                                                 balance={balance}
                                                 coin={this.props.coin} setCoin={this.props.setCoin}
                                                 setAmount={this.props.setAmount} amount={this.props.amount}
                />;
                break;
            case DEPOSIT:
                mainComponent = <WithdrawDeposit id='withdraw-deposit'
                                                 coins={this.props.coins} title={"Deposit"}
                                                 balance={balance3}
                                                 coin={this.props.coin} setCoin={this.props.setCoin}
                                                 setAmount={this.props.setAmount} amount={this.props.amount}
                />;

                break;
            default:
                mainComponent = <Swap
                    coins={this.props.coins} exchange={this.props.exchange}
                    marketPrice={marketPrice} label={"You will get:"}
                    title={"Swap"} balance={balance}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    coin2={this.props.coin2} setCoin2={this.props.setCoin2}
                    price={price} setPrice={this.props.setPrice}
                    amount={this.props.amount} setAmount={this.props.setAmount}
                    amount2={this.props.amount2} setAmount2={this.props.setAmount2}
                />;
        }

        return (
            <div style={{marginTop: '2%'}}>
            <Card style={cardStyles}>
                <CardBody>
                    <div className ="x-close">
                        <Button onClick={this.goBack} close id="back"/>
                    </div>
                    <div className ="top-bar">
                        <div id = "swap-first">
                            <Button id='nav-btn' size='lg' onClick={this.goToSwap}
                                    className={(selectedMainComponent === SWAP) ? 'active' : ''}>
                                Swap
                            </Button>
                        </div>
                        <div id = "swap">
                            <Button id ='nav-btn' size='lg'  onClick={this.gotToBuy}
                                    className={(selectedMainComponent === BUY) ? 'active' : ''}>
                                Buy
                            </Button>
                        </div>
                        <div id= "swap">
                            <Button  id= 'nav-btn'size='lg'  onClick={this.goToSell}
                                     className={(selectedMainComponent === SELL) ? 'active' : ''}>
                                Sell
                            </Button>
                        </div>
                        <div id = "swap">
                            <Button id = 'nav-btn'size='lg'  onClick={this.goToWithdraw}
                                    className={(selectedMainComponent === WITHDRAW) ? 'active' : ''}>
                                Withdraw
                            </Button>
                        </div>
                        <div id="swap">
                            <Button id='nav-btn' size='lg'  onClick={this.goToDeposit}
                                    className={(selectedMainComponent === DEPOSIT) ? 'active' : ''}>
                                Deposit
                            </Button>
                        </div>
                    </div>

                    <Form onSubmit={this.handleSubmit}>
                        {mainComponent}
                        <Button type="button" onClick={this.handleSubmit} className='btn-action'>
                            {getSubmit(selectedMainComponent)}
                        </Button>
                        <p className={(this.state.isError) ? 'error-message' : 'success-message'}>
                            {this.state.response}
                        </p>
                    </Form>
                </CardBody>
            </Card>
            </div>
        );
    }
}
