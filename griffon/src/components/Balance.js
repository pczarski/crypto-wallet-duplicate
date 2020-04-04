import React from 'react';
import '../styles/App.scss';

import {getRequest, getBalance} from '../lib/backendHandler.js';


// import { Convert } from "easy-currencies";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";


export default class Balance extends React.Component {
  
  constructor(props) {
    super(props);    

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "Dash"],
      currency: null, // currency name (bitcoin, litecoin, etc. btc by default)
      balance: null,
      totalBal: null,
      dropdownOpen: false
    }

  }

  componentDidMount () {
  
    let req = getRequest("currency", "name", "Bitcoin");
    console.log(req)
    this.setState({
      balance: req.balance,
      currency: req.name
    })

  }
  getTotalBal (curr) {
    let totalBal = 0;
    for (let i of this.state.supportedCurr) {
      // getBalance, convert to target CURR
      totalBal+= getBalance(i)
    }

  }
  toggle(e) {
    e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(e) {
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
          <p>{Math.floor(this.state.balance * 100) / 100 }</p>
        </div>
        <div className="currSel">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.state.currency}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.select}>BTC</DropdownItem>
            <DropdownItem onClick={this.select}>ETH</DropdownItem>
            <DropdownItem onClick={this.select}>LTC</DropdownItem>
            <DropdownItem onClick={this.select}>GBP</DropdownItem>
            <DropdownItem onClick={this.select}>USD</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
    </div>
    )
  }
}
