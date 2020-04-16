import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import { Button, Nav } from 'reactstrap';
import SideBar from '../components/Nav.js';
import Coins from '../components/walletComponents/Coins.js'
import Select from "../components/common/select";
import OrderHistory from "./orderHistory";
import {ORDERS, COINS} from "../App";

export default class ExchangeAccess extends Component
{
    constructor(props){
        super(props);
        this.state = {
            goToOrders: false,
        }
    }

    // will update the main component to order history
    selectOrderHistory = () => {
        this.props.setMainComponent(ORDERS);
    };

    // will update the main component to the exchange access wallet
    selectCoins = () => {
        this.props.setMainComponent(COINS);
    };

    handleCoinClick = (coin) => {
        this.props.handleCoinClick(coin);
        this.setState({
            goToOrders: true,
        });
    };

    render() {
        const orders = this.state.goToOrders;
        if(orders) {
            return (
                <Redirect to='/orders'/>
            )
        }

        // use the mainComponent prop which is taken from App.js's state
        const selectedComponent = this.props.mainComponent;
        let mainComponent;

        // controlling the main display
        if (selectedComponent === COINS) {
            mainComponent = <Coins fetch={this.props.fetch} coins={this.props.coins} coinClick={this.handleCoinClick}/>;
        } else {
            mainComponent = <OrderHistory goBack={this.selectCoins} exchange={this.props.exchange} exchanges={this.props.exchanges} setExchange={this.props.setExchange}/>;
        }

        return (
            <div className="wrapper">
                <SideBar/>
                <div className="container">

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