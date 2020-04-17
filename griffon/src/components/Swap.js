import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import '../styles/buy.scss';
import {Link} from 'react-router-dom';
import AddExchange from '../components/AddExchange';
import { Button,Form, FormGroup, Label, Input } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { swapOrder} from '../lib/backendHandler';

import name from '../screens/orders.js'

export default class Swap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currencyFrom:'BTC',
        currencyTo:'ETH',
        amount:'0',
        response:"0"
    }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }
  handleSubmit(event) {

// http://localhost:8080/swap?exchange=Binance&currency1=BTC&currency2=ETH&amount=0.5
//exchange, currencyFrom, currencyTo, amount
    let resp = swapOrder( this.props.name, this.state.currencyFrom, this.state.currencyTo,this.state.amount);
    console.log( this.props.name, this.state.currencyFrom, this.state.currencyTo,this.state.amount)
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
   <p className="h4 mb-4">Make Swap order</p>
   <div className="form-row mb-4 ">
       <div className="col">
       <Label >Currency From:</Label>
       <Input type="select"   onChange={this.handleInputChange}className="form-control" name="currencyFrom"placeholder="Currency From" >
         <option>BTC</option>
         <option>ETH</option>
         <option>LTC</option>
         <option>USDT</option>
         <option>DASH</option>
       </Input>
       </div>
       <div className="col">
       <Label >Currency To:</Label>
       <Input type="select"   onChange={this.handleInputChange}className="form-control" name="currencyTo"placeholder="Currency To" >
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
    <Label >Amount:</Label>
      <Input type="text"   onChange={this.handleInputChange}className="form-control" name="amount"placeholder="Enter Amount:" />
       <Button className="btn btn-info my-4 btn-block" type="submit">Submit</Button>
           </div>
           {<p>Response: {this.state.response}</p> && (!this.state.response == null)} </div>
   </Form>
   </div>
    );
  }
}
