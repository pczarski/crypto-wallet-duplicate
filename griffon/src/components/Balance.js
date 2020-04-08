import React from 'react';
import '../styles/App.scss';

import {getCurr} from '../lib/backendHandler.js';

import { Converter } from "easy-currencies";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import { roundTo2 } from '../lib/helper.js';



export default class Balance extends React.Component {
  
  constructor(props) {
    super(props);    

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      currency: "Select a currency", // currency name (bitcoin, litecoin, etc. btc by default)
      balance: null,
      totalBal: null, 
      totalComp: false,
      dropdownOpen: false
    }
  }

  componentDidMount () {
  }

  async getTotalBal (prev, curr) {
    let converter = new Converter("AlphaVantage", "5FNUAE4662ZHQRRF");
    let totalBal = 0;
    if (this.state.totalBal !== null) {
      totalBal = await converter.convert(this.state.totalBal, prev, curr);  
      console.log( totalBal) 
    } else {
      for (let i = 0; i<this.state.supportedCurr.length; i++) {
        let value;
        let req = await getCurr(this.state.supportedCurr[i])
        if (curr === this.state.supportedCurr[i]) { value = req.balance
        } else {
          value = await converter.convert(req.balance, this.state.supportedCurr[i], curr);  
        }
        console.log(req, value, totalBal) 
        totalBal += value
      }
    }
    this.setState(
      {
        totalBal: totalBal, 
        totalComp: true
      }
    )
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(e) {
    const prev = this.state.currency;
    if (!(e.target.innerText === prev)) {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
        currency: e.target.innerText,
        totalComp: false
      });
      this.getTotalBal(prev, e.target.innerText)
    }
  }

  render () {
    return (
    <div className="balance">
        <h1>Griffon</h1>
        <div>
          <h5>
            <br/>
          </h5>
          {this.state.totalComp === true && !isNaN(this.state.totalBal) &&
            <p>
              {roundTo2(this.state.totalBal) + ""}
            </p>
          }
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
