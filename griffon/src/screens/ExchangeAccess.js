import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import { Button, Nav } from 'reactstrap';
import SideBar from '../components/Nav.js';
import Coins from '../components/walletComponents/Coins.js'
import Select from "../components/common/select";

export default class ExchangeAccess extends Component
{
    //creating array of coins
    constructor(props){
        super(props);
        this.state = {}
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

    render(){
        return (
            <div className="wrapper">
                <SideBar/>
                <div className="container">

                    <Select items={Object.keys(this.props.exchanges)}
                            onSelect={this.props.setExchange}
                            selectedItem={this.props.exchange}
                    />
                    <div id="order history">
                        TODO: placeholder for a tab for selecting order history based on the current exchange
                    </div>

                    <div className="content">
                        <Coins fetch={this.props.fetch} coins={this.props.coins} />
                        <Link to="/exchange">

                            <Button className = "button">Exchange a Currency</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }



}