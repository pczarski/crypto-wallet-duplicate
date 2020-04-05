import React from 'react';
import '../styles/App.scss';

import {getRequest, getCurr} from '../lib/backendHandler.js';

import { Converter } from "easy-currencies";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import { roundTo2 } from '../lib/helper.js';



export default class Balance extends React.Component {
  
  constructor(props) {
    super(props);    

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "Dash"],
      supportedCurrNames: ["Bitcoin", "Ethereum", "Litecoin", "Dash"],
      currency: null, // currency name (bitcoin, litecoin, etc. btc by default)
      balance: null,
      totalBal: null, 
      dropdownOpen: false
    }
    
    this.getTotalBal("BTC")
  }
  componentDidMount () {
    let req = getRequest("currency", "name", "Bitcoin");
    this.setState({
      currency: "BTC",
      balance: req.balance
    })
  }

  async getTotalBal (curr) {
    let converter = new Converter("AlphaVantage", "5FNUAE4662ZHQRRF");
    let totalBal = 0;
    for (let i = 0; i<this.state.supportedCurr.length; i++) {
      let req = await getCurr(this.state.supportedCurrNames[i])
      let value = await converter.convert(req.balance, this.state.supportedCurr[i], curr);
      // console.log(req, value, totalBal)
      totalBal += value
    }
    this.setState({totalBal: totalBal})
    // TO DO: WAIT FOR RESPONSE
  }
  toggle(e) {
    e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(e) {
    console.log(e.target.innerText)
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      currency: e.target.innerText
    });
  }

  render () {
    return (
    <div className="balance">
        <h1>Griffon</h1>
        <div>
          <h5>
            <br/>
          </h5>
          <p>{roundTo2(this.state.totalBal) + ""}</p>
        </div>
        <div className="currSel">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.state.currency}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.select}>{this.state.supportedCurr[0]}</DropdownItem>
            <DropdownItem onClick={this.select}>{this.state.supportedCurr[1]}</DropdownItem>
            <DropdownItem onClick={this.select}>{this.state.supportedCurr[2]}</DropdownItem>
            <DropdownItem onClick={this.select}>GBP</DropdownItem>
            <DropdownItem onClick={this.select}>USD</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
    </div>
    )
  }
}
