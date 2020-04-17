import React from 'react';
import Nav from '../Nav';

import '../../styles/nav.scss';
import '../../styles/App.scss';
import '../../styles/bal.scss';
import '../../styles/exchange.scss';
import {Redirect} from 'react-router-dom';
import {COINS, SELL, BUY, WITHDRAW, DEPOSIT, SWAP} from "../../App";
import Order from "./order";
import WithdrawDeposit from "./withdrawDeposit";
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
                mainComponent = <WithdrawDeposit
                    coins={this.props.coins} title={"Withdraw"}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    setAmount={this.props.setAmount} amount={this.props.amount}
                />;
                break;
            case DEPOSIT:
                mainComponent = <WithdrawDeposit
                    coins={this.props.coins} title={"Deposit"}
                    coin={this.props.coin} setCoin={this.props.setCoin}
                    setAmount={this.props.setAmount} amount={this.props.amount}
                />;

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
                    <Form onSubmit={this.handleSubmit}>
                        {mainComponent}
                        <button type="button" onClick={this.handleSubmit}>
                            {getSubmit(selectedMainComponent)}
                        </button>
                        <p className={(this.state.isError) ? 'error-message' : 'success-message'}>
                            {this.state.response}
                        </p>
                    </Form>

                </div>
            </div>
        );
    }
}
