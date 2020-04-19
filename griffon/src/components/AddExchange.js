import React from 'react';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

import {Card , Button,Form, Label, Input } from "reactstrap";
import { addExchange} from '../lib/backendHandler';

import Select from 'react-select';
import {selectStyles} from "../styles/selectStyles";

import BinanceIcon from '../assets/binance.png';
import CoinbaseIcon from '../assets/coinbase.png';

function getExchangeLabel(name){
  switch (name) {
    case 'Binance':
      return (
          <div>
            <img src={BinanceIcon}/> {name}
          </div>
      );
    case 'Coinbase':
      return (
          <div>
            <img src={CoinbaseIcon}/> {name}
          </div>
      );
    default:
          return null;

  }
}
export default class AddExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: [{value: "Binance", label: getExchangeLabel("Binance")}, {value: "Coinbase", label: getExchangeLabel("Coinbase")}],
      address:null,
      name: "Binance",
      obj: {value: "Binance", label: getExchangeLabel("Binance")},
      response: ""
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
    event.preventDefault();
    if (this.state.address === null) {
      this.setState({
        response: "Enter a valid API key"
      });
      return
    }
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
  }

  render () {
    const select = (selectedOption) => {
      this.setState({
        name: selectedOption.value,
        obj: this.state.exchanges.find(a => a.value === selectedOption.value)
      })
  };
    return (
      <div className="container">
      <Card id="addExchange" body className="text-center bg-dark text-white ">
        
      <h1>Add Exchange</h1>
        <Form onSubmit={this.handleSubmit}>
          <Select className="react-select-container" id='addex'classNamePrefix="react-select"  
              options={this.state.exchanges}
              onChange={select} value={this.state.obj} styles={selectStyles}/>
            <Label for="address">Exchange Address</Label>
            <Input type="text" name="address" placeholder="Enter your API Key" id="inp" onChange={this.handleInputChange} />
          <Button className="mt-2">Submit</Button>
          <p id="addExchange">{this.state.response}</p>
        </Form>
        </Card>
      </div>
    );
  }
}
