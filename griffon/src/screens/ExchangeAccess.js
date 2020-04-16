import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Route, Switch} from 'react-router-dom';
import { Button, Nav } from 'reactstrap';
import SideBar from '../components/Nav.js';
import Coins from '../components/walletComponents/Coins.js'
import Select from "../components/common/select";
import OrderHistory from "./orderHistory";
import {ORDERS, COINS} from "../App";
import Buy from '../components/Buy';
import Withdraw from '../components/Withdraw';
import Deposit from '../components/Deposit';

export default class ExchangeAccess extends Component
{
    constructor(props){
        super(props);
        this.state={
          choice:0
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
          this.handleClick2 = this.handleClick2.bind(this);
    }
    handleClick(event) {
      this.setState({
        choice:'2'
      });

      event.preventDefault();
    }handleClick1(event) {
      this.setState({
        choice:'1'
      });

      event.preventDefault();
    }handleClick2(event) {
      this.setState({
        choice:'3'
      });

      event.preventDefault();
    }

    // will update the main component to order history
    selectOrderHistory = () => {
        this.props.setMainComponent(ORDERS);
    };

    // will update the main component to the exchange access wallet
    selectCoins = () => {
        this.props.setMainComponent(COINS);
    };

    render() {
        // use the mainComponent prop which is taken from App.js's state
        const selectedComponent = this.props.mainComponent;
        let mainComponent;

        // controlling the main display
        if (selectedComponent === COINS) {
            mainComponent = <Coins fetch={this.props.fetch} coins={this.props.coins} />;
        } else {
            mainComponent = <OrderHistory goBack={this.selectCoins} exchange={this.props.exchange} exchanges={this.props.exchanges} setExchange={this.props.setExchange}/>;
        }
        let component;
        if (this.state.choice === "1") {
          component = <Buy name={this.props.exchange}/>;
        }else if (this.state.choice ==="2") {

            component = <Withdraw name={this.props.exchange}/>;
        }
        else if (this.state.choice ==="3") {

            component = <Deposit name={this.props.exchange}/>;
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

                            <Button  onClick={this.handleClick} className = "button">Withdraw from Exchange</Button> <Button  onClick={this.handleClick1} className = "button">Make an order</Button> <Button  onClick={this.handleClick2}className = "button">Deposit to Exchange</Button>
                        </Link>
                        {component}
                    </div>
                </div>
            </div>
        )
    }



}
