import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Route, Switch} from 'react-router-dom';
import { Button, Nav } from 'reactstrap';
import SideBar from '../components/Nav.js';
import Coins from '../components/walletComponents/Coins.js'
import Select from "../components/common/select";
import OrderHistory from "./orderHistory";

const COINS = 0;
const ORDERS = 1;
export default class ExchangeAccess extends Component
{
    //creating array of coins
    constructor(props){
        super(props);
        this.state = {
            mainComponent: COINS,
        }
    }

    handleSelect() {
        const e = document.getElementById("select-exchange");
        console.log(e.options[e.selectedIndex].value);
        console.log("selecting");
        this.props.setExchange(e.options[e.selectedIndex].value);
    };

    renderSelect = () => {
        const exchanges = Object.keys(this.props.exchanges).map((name) => {
            return(
                <option value={name} onSelect={() => this.handleSelect}>
                    {name}
                </option>
            );
        });

        return(
            <div>
                <select id="select-exchange" onSelectCapture={() => this.handleSelect}>
                    {exchanges}
                </select>
            </div>
        );
    };

    selectOrderHistory = () => {
        this.setState({
            mainComponent: ORDERS,
        });
    };

    selectCoins = () => {
        this.setState({
            mainComponent: COINS,
        });
    };

    render(){
        const selectedComponent = this.state.mainComponent;
        let mainComponent;

        // controlling display
        if (selectedComponent === COINS) {
            mainComponent = <Coins fetch={this.props.fetch} coins={this.props.coins} />;
        } else {
            mainComponent = <OrderHistory goBack={this.selectCoins}/>;
        }

        return (
            <div className="wrapper">
                <SideBar/>
                <div className="container">

                    <Select items={Object.keys(this.props.exchanges)}
                            onSelect={this.props.setExchange}
                            selectedItem={this.props.exchange}
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