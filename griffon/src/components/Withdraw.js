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
import { withdrawExchange} from '../lib/backendHandler';

import name from '../screens/orders.js'

export default class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currency:null,
        amount:null,
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


    let resp = withdrawExchange( this.props.name, this.state.currency, this.state.amount);
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
   <p className="h4 mb-4">Withdraw from Exchange</p>
   <div className="form-row mb-4 ">
       <div className="col">
       <Label >Currency:</Label>
       <Input type="text"   onChange={this.handleInputChange}className="form-control" name="currency"placeholder="What currency do you want to withdraw?" />
       </div>
       <div className="col">
       <Label >Amount:</Label>
       <Input type="text"   onChange={this.handleInputChange}className="form-control" name="amount"placeholder="What amount do you want to withdraw?" />
       </div>
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
