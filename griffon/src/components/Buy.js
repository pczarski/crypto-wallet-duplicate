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
        type:null,
        currencyFrom:null,
        currencyTo:null,
        amount:null,
        price:null,
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
       <Input type="text"   onChange={this.handleInputChange}className="form-control" name="type"placeholder="What Type of Order do you want to make" />
       </div>
   </div>
   <div className="form-row mb-4">
   <div className="col">
  <Label>From:</Label>
   <Input type="text" className="form-control mb-4" name="currencyFrom" onChange={this.handleInputChange}placeholder="What currency are you converting from"/></div><p id="arrow" onClick=""> <a id="test" href="#">&#8644;</a></p>
   <div className="col">
   <Label>To:</Label>
     <Input  type="text"  className="form-control" name="currencyTo" onChange={this.handleInputChange} placeholder="What currency are you converting to" />
   </div></div>
   <div className="form-row mb-4">
   <div className="col">
  <Label>Amount:</Label>
   <Input type="text" className="form-control mb-4"name="amount" onChange={this.handleInputChange} placeholder="Amount"/>
   </div>
   <div className="col">
   <Label>Price:</Label>
   <Input type="text" className="form-control mb-4" name="price" onChange={this.handleInputChange} placeholder="0.00"/> </div>
   </div>
   <div className="form-row mb-4">
       <Button className="btn btn-info my-4 btn-block" type="submit">Submit</Button>
           </div>
           {<p>Response: {this.state.response}</p> && (!this.state.response == null)}
   </Form>
   </div>
    );
  }
}
