import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";

// import getIcons from '../components/Icons';


import ETH from "../../node_modules/cryptocurrency-icons/svg/icon/eth.svg";
import DASH from "../../node_modules/cryptocurrency-icons/svg/icon/dash.svg";
import LTC from "../../node_modules/cryptocurrency-icons/svg/icon/ltc.svg";
import BTC from "../../node_modules/cryptocurrency-icons/svg/icon/btc.svg";
import USDT from "../../node_modules/cryptocurrency-icons/svg/icon/usdt.svg";

import Receive from '../components/Receive';
import Send from '../components/Send';
import Nav from '../components/Nav';

export default class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      images: [],
      // icons: [ETH, DASH, LTC, BTC, USDT],
      dropdownOpen: false,
      selected: "BTC",
      change: false
    }

  }
  componentDidMount() {
    // this.setState({images: getIcons()})
  }

  send() {
  }

  receive() {

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
      selected: e.target.innerText,
      change: true
      });
  }
  renderIcon() {
    switch(this.state.selected) {
      case "BTC":
        return BTC;
      case "ETH":
        return ETH;
      case "USDT":
        return USDT;
      case "LTC":
        return LTC;
      case "DASH":
        return DASH;      
      default:
        return null;
    }
  }

  render () {
  const DropdownList = () => (
    <div>
      {this.state.supportedCurr.map(curr => 
      <DropdownItem onClick={this.select} key={curr}> {curr} </DropdownItem>
      )}
    </div>
  );
  return (
    <div className="wrapper">
    
      <div className="container">
        <h2>Send or Receive from Wallet</h2>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <img src={this.renderIcon()} alt=""/>
          <DropdownToggle caret>
            {this.state.selected}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownList/>
          </DropdownMenu>
        </Dropdown>
        <Button className="btn btn-primary" size="lg" onClick={
    this.send()}>Send Currency</Button> 
        <Button className="btn btn-primary" size="lg">Receive Currency</Button> 
        <Send/>
        <Receive curr={this.state.selected} />
        <Link to="/">
          <button type="button" className="btn btn-primary">Go back</button>
        </Link>
      </div>
    </div>
  );
  }
}
