import React from 'react';
import '../styles/App.scss';

import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from "reactstrap"


class Balance extends React.Component {


  constructor(props) {
    super(props);
  }
  
  state = {
    currency: 'BTC',
    dropDownOpen: '',
    dropDownValue: ''
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
    {/* <p>Balance: {localStorage.getItem(balance)}</p> */}
          <ButtonDropdown >
          <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle} >
              <DropdownToggle color="primary" caret className="dropdown-toggle">
                  {this.state.currency}
              </DropdownToggle>
              <DropdownMenu className="currency-dropdown">
                      <DropdownItem onClick={() => this.handleChange('USD')} dropDownValue="USD">USD</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange('EUR')} dropDownValue="EUR">EUR</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange('INR')} dropDownValue="INR">INR</DropdownItem>
                      <DropdownItem onClick={() => this.handleChange('AFT')} dropDownValue="AFT">AFT</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
          </ButtonDropdown>
        </div>
    </div>
    )
  }
}

export default Balance;
