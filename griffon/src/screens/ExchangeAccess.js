import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import SideBar from '../components/Nav.js';
import Select from 'react-select';
import OrderHistory from "./orderHistory";
import {ORDERS, PORTFOLIO} from "../App";
import Portfolio from "../components/exchange/portfolio";


import '../styles/exchangeAccess.css'
import {selectStyles, buttonActive, buttonHoover} from "../styles/selectStyles";
import MenuButton from "../components/common/menuButton";

export default class ExchangeAccess extends Component
{
    // todo: not keeping an states, consider converting to a function component
    constructor(props) {
        super(props);
        this.state = {
            hover: 0,
        }
    }

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
                    <div style=
                             {{display: 'flex',
                                 'paddingTop':'32px',
                             }}
                    >
                        <div style={{width: '200px'}}>
                            <Select className ="react-select-ex" classNamePrefix="react-select"
                                    options={exchangeOptions}
                                    onChange={this.props.setExchange}
                                    value={this.props.exchange}
                                    styles={selectStyles}
                                    style={{width: '200px'}}
                                    components={{
                                        IndicatorSeparator: () => null
                                    }}
                            />
                        </div>

                        <div style={{
                            'marginRight': '5%', 'marginLeft': '5%',
                        }}>
                            <MenuButton
                                text={'Exchange'}
                                active={(selectedComponent === PORTFOLIO)}
                                onClick={this.selectPortfolio}
                            />
                        </div>

                        <div style={{}}>
                            <MenuButton
                                text={'Order History'}
                                active={(selectedComponent === ORDERS)}
                                onClick={this.selectOrderHistory}
                            />
                        </div>
                    </div>
                    <div className='justify-content-center cont' style={{'paddingTop':'32px',}}>
                        {mainComponent}
                    </div>
                </div>
            </div>
        )
    }
}
