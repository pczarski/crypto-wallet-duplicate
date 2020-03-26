import React from 'react';
import '../styles/App.scss';

import {getRequest} from '../lib/backendHandler.js';


// import { Convert } from "easy-currencies";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";


export default class Balance extends React.Component {
  
  constructor(props) {
    super(props);    

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      currency: null,
      balance: null,
      dropdownOpen: false,
      value: "GBP"
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

  toggle(e) {
    e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: e.target.innerText
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
            {this.state.value}
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
