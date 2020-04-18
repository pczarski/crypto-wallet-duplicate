import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import SideBar from '../components/Nav.js';
import Select from 'react-select';
import OrderHistory from "./orderHistory";
import {ORDERS, PORTFOLIO} from "../App";
import Portfolio from "../components/exchange/portfolio";


import '../styles/exchangeAccess.css'
import {selectMenuStyles} from "../styles/selectStyles";

export default class ExchangeAccess extends Component
{
    // todo: not keeping an states, consider converting to a function component


    // will update the main component to order history
    selectOrderHistory = () => {
        this.props.setMainComponent(ORDERS);
    };

    // will update the main component to the exchange access wallet
    selectPortfolio = () => {
        this.props.setMainComponent(PORTFOLIO);
    };

    render() {
        // use the mainComponent prop which is taken from App.js's state
        const selectedComponent = this.props.mainComponent;
        let mainComponent;

        // controlling the main display
        if (selectedComponent === PORTFOLIO) {
            // Portfolio component lets you display you coins and makes orders
            // children components are Coins and Exchange
            // this.props.selectedInPortfolio and this.props.setSelectedInPortfolio control
            // what is displayed in that component
            mainComponent = <Portfolio fetch={this.props.fetch} exchange={this.props.exchange}
                                       coin={this.props.coin} coin2={this.props.coin2}
                                       setCoin={this.props.handleCoinClick}
                                       setCoin2={this.props.setCoin2} coins={this.props.coins}
                                       selectedComponent={this.props.selectedInPortfolio}
                                       setMainComponent={this.props.setSelectedInPortfolio}
                                       tradeMainComponent={this.props.tradeMainComponent}
                                       setTradeMainComponent={this.props.setTradeMainComponent}
                                       price={this.props.price} setPrice={this.props.setPrice}
                                       marketPrice={this.props.marketPrice}
                                       setMarketPrice={this.props.setMarketPrice}
                                       amount={this.props.amount} setAmount={this.props.setAmount}
                                       amount2={this.props.amount2} setAmount2={this.props.setAmount2}
            />
        } else {
            mainComponent = <OrderHistory goBack={this.selectPortfolio}
                                          exchange={this.props.exchange} exchanges={this.props.exchanges}
                                          setExchange={this.props.setExchange}
            />;
        }

        const exchangeOptions = this.props.exchanges;

        return (
            <div className="wrapper">
                <SideBar/>
                <div className="cont">
                    <div style={{display: 'flex'}}>
                        <Button
                            className = {(selectedComponent === PORTFOLIO) ?
                                "exAcc nav-item notRounded active" : "exAcc nav-item notRounded"}
                            id='exchange' onClick={this.selectPortfolio}>
                            Exchange
                        </Button>
                        <Select className ="react-select-ex" classNamePrefix="react-select"
                                options={exchangeOptions}
                                onChange={this.props.setExchange}
                                value={this.props.exchange}
                                styles={selectMenuStyles}
                        />
                        <Button
                            className={(selectedComponent === ORDERS) ?
                                "exAcc nav-item notRounded active" : "exAcc nav-item notRounded"}
                            onClick={this.selectOrderHistory} id='order' >
                            Order History
                        </Button>
                    </div>
                    <div className='justify-content-center'>
                        {mainComponent}
                    </div>
                </div>
            </div>
        )
    }
}
