import React from 'react';
import '../styles/App.scss';

import {getRequest} from '../lib/backendHandler.js';


import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from "reactstrap"


class Balance extends React.Component {

  
  constructor(props) {
    super(props);

    this.supp = {
      code: ['BTC', 'ETH', 'XRP', 'GBP', 'USD', 'EUR'],
      name: ['Bitcoin', 'Ethereum', 'Ripple', 'Pound Sterling', 'United States Dollar', 'Euro']
    }

    this.state = {
      currencyCode: this.supp.code[0],
      balance: null,
      dropDownOpen: false,
      dropdownvalue: null
    }
    
    let req = getRequest("currency", "name", "Bitcoin");
    console.log(req)
    this.reqToState(req)
 }

 reqToState(req){
    console.log(req.balance)
    this.setState({
      currencyCode: req.name,
      balance: req.balance
    });
    console.log(this.state.balance)
 }

 toggle = () => {
     this.setState({
        dropDownOpen: !this.state.dropDownOpen,
     })
 }
 
 handleChange = (code) => {
     this.setState({
         currencyCode: code
     })
 }

  render () {
    
    return (
    <div className="balance">
        <h1>Griffon</h1>
        <div>
          <h5>
            <br/>
          </h5>
          <p>{this.state.balance}</p>
        </div>
        <div className="currSel">
          <ButtonDropdown >
          <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle} >
              <DropdownToggle color="primary" caret className="dropdown-toggle">
                {this.state.currencyCode}
              </DropdownToggle>
              <DropdownMenu className="currency-dropdown">
                <DropdownItem onClick={() => this.handleChange(this.supp.code[0])} dropdownvalue={this.supp.code[0]}>{this.supp.code[0]}</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange(this.supp.code[1])} dropdownvalue={this.supp.code[1]}>{this.supp.code[1]}</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange(this.supp.code[2])} dropdownvalue={this.supp.code[2]}>{this.supp.code[2]}</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange(this.supp.code[3])} dropdownvalue={this.supp.code[3]}>{this.supp.code[3]}</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
          </ButtonDropdown>
        </div>
    </div>
    )
  }
}

export default Balance;
