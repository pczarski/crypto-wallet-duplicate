import React from 'react';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import '../styles/buy.scss';

import {Card , Button,Form, FormGroup, Label, Input } from "reactstrap";
import { addExchange} from '../lib/backendHandler';

import Select from 'react-select';

export default class AddExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: [{label: "Binance"}, {label: "Coinbase"}],
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
    const select = (selectedOption) => {
      this.setState({name: selectedOption.label});
  };
    return (
      <div className="container">
      <h1>Add Exchange</h1>
      <Card id="addExchange" body className="text-center bg-dark text-white ">
        <Form onSubmit={this.handleSubmit}>
          {console.log(this.state)}
          <Select className="react-select-container" classNamePrefix="react-select"  
              options={this.state.exchanges}
              onChange={select}
              value={this.state.name} />
            <Label for="address">Exchange Address</Label>
            <Input type="text" name="address" placeholder="Enter your API Key"  onChange={this.handleInputChange} />
          <Button >Submit</Button>
          <p id="addExchange">{this.state.response}</p>
        </Form>
        </Card>
      </div>
    );
  }
}
