import React from 'react';
import '../styles/App.scss';

import {Converter} from 'easy-currencies';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner} from "reactstrap";

import { roundTo2,  } from '../lib/helper';
import {getValIn} from '../lib/backendHandler'
import Logo from '../assets/Logo.png';
import '../styles/balance.css';

export default class Balance extends React.Component {
  
  constructor(props) {
    super(props);    

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      currency: "BTC", // currency name (bitcoin, litecoin, etc. btc by default)
      totalBal: '0', 
      dropdownOpen: false
    }
  }
  
  componentDidMount(){
    this.setState({totalBal: getValIn("BTC").value})
  }

  async getTotalBal (prev, curr) {
    let converter = new Converter("AlphaVantage", "5FNUAE4662ZHQRRF");
    let totalBal = 0;
    totalBal = await converter.convert(this.state.totalBal, prev, curr);
    this.setState({totalBal: totalBal}
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
    if (e.target.innerText === "GBP" || e.target.innerText === "USD") {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
        currency: e.target.innerText,
        totalBal: this.getTotalBal(prev, e.target.innerText)
    });
    } else if (!(e.target.innerText === prev)) {      
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
        currency: e.target.innerText,
        totalBal: getValIn(e.target.innerText).value
    });}
  }

  render () {
    return (
    <div className="balance">
        <img id='logo' src ={Logo} alt = 'logo'></img>
        
        <h1 style={{fontFamily: 'Abel', color: 'turquoise'}}>Griffon</h1>
        <div>
          <h5>
            <br/>
          </h5>{isNaN(this.state.totalBal) || this.state.totalBal === '0' ? 
            <Spinner color="light" /> :
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
