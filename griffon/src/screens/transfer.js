import React from 'react';
import '../styles/App.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";


import ETH from "../../node_modules/cryptocurrency-icons/svg/icon/eth.svg";
import DASH from "../../node_modules/cryptocurrency-icons/svg/icon/dash.svg";
import LTC from "../../node_modules/cryptocurrency-icons/svg/icon/ltc.svg";
import BTC from "../../node_modules/cryptocurrency-icons/svg/icon/btc.svg";
import USDT from "../../node_modules/cryptocurrency-icons/svg/icon/usdt.svg";

import Transactions from '../components/Transactions';
import Receive from '../components/Receive';
import Send from '../components/Send';
import Nav from '../components/Nav';
import { Redirect } from 'react-router-dom';

export default class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      images: [],
      dropdownOpen: false,
      selected: "BTC",
      change: false,
      choice: 0
    }

  }
  componentDidMount() {
    // this.setState({images: getIcons()})
  }

  handleClick(e) {
    this.setState({
      choice: e.target.value
    });
    console.log(e.target.value)
    console.log(this.state)
    if (e.target.value === 0) {
      return <Redirect to='/wallet' />
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

  let component;
  if (this.state.choice === "1") {
    component = <Send curr={this.state.selected}/>;
  } else  if (this.state.choice === "2") {
    component = <Receive curr={this.state.selected} />
  } else {
    component = <Transactions curr={this.state.selected} />;
  }

  return (
    <div className="wrapper">
    <Nav/>
      <div className="container">
        <Button type="button" className="btn btn-primary navbar-bottom" onClick={this.handleClick}  value="0" name="hello" close /> 
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
        <Button className="btn btn-primary" size="lg" onClick={this.handleClick} value="1">Send Currency</Button>
        <Button className="btn btn-primary" size="lg" onClick={this.handleClick} value="2">Receive Currency</Button>
        {component}

      </div>
    </div>
  );
  }
}

 
