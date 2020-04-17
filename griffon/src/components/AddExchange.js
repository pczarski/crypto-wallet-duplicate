import React from 'react';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import '../styles/buy.scss';

import {Card, Select , Button,Form, FormGroup, Label, Input } from "reactstrap";
import { addExchange} from '../lib/backendHandler';

// TO DO CHECK EMPTY/ VALID

export default class AddExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address:null,
      name: "Binance",
      response: ""
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
    let resp = addExchange( this.state.name, this.state.address);
    if(resp.exchangeName==="Coinbase"){
      this.setState({
        response: "Coinbase has been added as an Exchange"
      });
    }else if(resp.exchangeName==="Binance"){
      this.setState({
        response: "Binance has been added as an Exchange"
      });
    }


    event.preventDefault();
  }

  render () {
    return (
      <div className="container">
      <Card id="addExchange" body className="text-center bg-dark text-white ">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Exchange Name</Label>
            <Input  onChange={this.handleInputChange}  type="select" name="name" id="exampleSelect">
            <option>Binance</option>
            <option>Coinbase</option>

          </Input>
            <Label for="address">Exchange Address</Label>
            <Input type="text" name="address" placeholder="Enter your API Key"  onChange={this.handleInputChange} />
          </FormGroup>
          <Button >Submit</Button>
          <p id="addExchange">{this.state.response}</p>
        </Form>
        </Card>
      </div>
    );
  }
}
