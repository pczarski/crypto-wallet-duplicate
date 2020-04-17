import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import '../styles/buy.scss';
import {Link} from 'react-router-dom';
import AddExchange from '../components/AddExchange';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,Form, FormGroup, Label, Input } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { makeOrder} from '../lib/backendHandler';

import name from '../screens/orders.js'
export default class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:"Buy",
            currencyFrom:"BTC",
            currencyTo:"ETH",
            amount:null,
            price:null,
            response:"0"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    handleSubmit(event) {


        let resp = makeOrder( this.state.type, this.props.name, this.state.currencyFrom, this.state.currencyTo, this.state.amount, this.state.price);
        console.log(resp);
        this.setState({

            response: resp
        });
        event.preventDefault();
    }
    render () {
        return (
            <div className="container">
                <Form  onSubmit={this.handleSubmit}id="form1"className="text-center  p-5" action="#!">
                    <p className="h4 mb-4">Make Order</p>
                    <div className="form-row mb-4 ">
                        <div className="col">
                            <label >Type:</label>
                            <Input type="select"   onChange={this.handleInputChange}className="form-control" name="type"placeholder="What type of order would you like to make?" >
                              <option>Buy</option>
                              <option>Sell</option>

                            </Input>
                        </div>
                    </div>
                    <div className="form-row mb-4">
                        <div className="col">
                            <Label>From:</Label>
                            <Input type="select"   onChange={this.handleInputChange}className="form-control" name="currencyFrom"placeholder="What currency are you converting from?" >
                              <option>BTC</option>
                              <option>ETH</option>
                              <option>LTC</option>
                              <option>USDT</option>
                              <option>DASH</option>
                            </Input>
                            </div>
                            <div className="col">
                            <Label>To:</Label>
                            <Input type="select"   onChange={this.handleInputChange}className="form-control" name="currencyTo"placeholder="What currency are you converting to?" >
                              <option>ETH</option>
                              <option>BTC</option>
                              <option>LTC</option>
                              <option>USDT</option>
                              <option>DASH</option>
                            </Input>
                        </div>
                        </div>
                        <div className="form-row mb-4">
                            <div className="col">
                                <Label>Amount:</Label>
                                <Input type="text"   onChange={this.handleInputChange}className="form-control" name="amount"placeholder="Amount"/ >

                                </div>
                                <div className="col">
                                    <Label>Price:</Label>
                                    <Input type="text"   onChange={this.handleInputChange}className="form-control" name="price"placeholder="0.00"/ >

                                    </div>
                            </div>

                            <Button> Submit </Button>



                    {<p>Response: {this.state.response}</p> && (!this.state.response == null)}
                </Form>
          </div>
        );
    }
}
