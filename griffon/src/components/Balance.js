import React from 'react';
import '../styles/App.scss';

import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from "reactstrap"


class Balance extends React.Component {


  constructor(props) {
    super(props);
  }
  
  state = {
    currency: 'BTC',
    dropDownOpen: false,
    dropdownvalue: ''
 }
 
 toggle = () => {
     this.setState({
        dropDownOpen: !this.state.dropDownOpen,
     })
 }
 
 handleChange = (code) => {
     this.setState({
         currency: code
     })
 }

  render () {

    return (
    <div className="balance">
        <h1>Griffon</h1>
        <div className="currSel">
          <ButtonDropdown >
          <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle} >
              <DropdownToggle color="primary" caret className="dropdown-toggle">
                  {this.state.currency}
              </DropdownToggle>
              <DropdownMenu className="currency-dropdown">
                      <DropdownItem onClick={() => this.handleChange('USD')} dropdownvalue=''>USD</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange('EUR')} dropdownvalue="EUR">EUR</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange('INR')} dropdownvalue="INR">INR</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange('AFT')} dropdownvalue="AFT">AFT</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
          </ButtonDropdown>
        </div>
    </div>
    )
  }
}

export default Balance;
