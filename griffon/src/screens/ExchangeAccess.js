import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';
import SideBar from '../components/Nav.js';
import Select from "../components/common/select";
import OrderHistory from "./orderHistory";
import {ORDERS, PORTFOLIO} from "../App";
import Portfolio from "../components/exchange/portfolio";

export default class ExchangeAccess extends Component
{
    // todo: not keeping an states, consider converting to a function component
    constructor(props){
        super(props);
    }

    // will update the main component to order history
    selectOrderHistory = () => {
        this.props.setMainComponent(ORDERS);
    };

    // will update the main component to the exchange access wallet
    selectCoins = () => {
        this.props.setMainComponent(PORTFOLIO);
    };

    handleCoinClick = (coin) => {
        console.log(coin);
        this.props.handleCoinClick(coin);
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
            mainComponent = <Portfolio fetch={this.props.fetch} coin={this.props.coin}
                                       coins={this.props.coins} coinClick={this.handleCoinClick}
                                       selectedComponent={this.props.selectedInPortfolio}
                                       setMainComponent={this.props.setSelectedInPortfolio}
            />
        } else {
            mainComponent = <OrderHistory goBack={this.selectCoins}
                                          exchange={this.props.exchange} exchanges={this.props.exchanges}
                                          setExchange={this.props.setExchange}
            />;
        }

        return (
            <div className="wrapper">
                <SideBar/>
                <div className="cont">

                    <Select items={Object.keys(this.props.exchanges) /*to dynamically render the list of exchanges*/}
                            onSelect={this.props.setExchange /* to update to the selected exchange*/}
                            selectedItem={this.props.exchange/*to show what we have selected right away as opposed to use a statically selected default*/}
                    />
                    <div id="order history">
                        <Button onClick={this.selectOrderHistory} className="btn btn-primary" size="lg" block>View Order History</Button>
                    </div>

                    <div className="content">
                        {mainComponent}
                        <Link to="/exchange">

                            <Button className = "button">Exchange a Currency</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }



}