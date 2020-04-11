import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import {getCurr} from '../lib/backendHandler.js';
// import { Button, Alert } from 'reactstrap';

export default class PubKey extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      currency: "Select a currency", // currency name (bitcoin, litecoin, etc. btc by default)
      publick: [],
      privatek: [],
      gotKeys: false,
      dropdownOpen: false
    }
  }

  getkeys(prev, curr){
      let con = getCurr(curr)
      let keypairs = con.keyPairs
      console.log(keypairs)
      this.setState({publickeys:con})
      this.setState({gotKeys: true})
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
        gotKeys: false
      });
      this.getkeys(prev, e.target.innerText)
    }
  }


  render () {
    return (

      <div className="wrapper">
          <Nav/>
          <nav className="navbar 1">
          <h1>Settings</h1>
           <ul id="nav1">
       <Link to="/">
               <li >Home</li></Link>
                <Link to="/settings">
               <li >Change Password</li></Link>
               <li id="active">Public Keys</li>
               <Link to="/privkeys">
              <li >Private Keys</li></Link>
           </ul>
           </nav>
           <div className="extra">
           <h1>Keys</h1>
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
           <div>
             <table>
               <thead>
                <tr>#</tr>
                <tr>Private Keys</tr>
                <tr>Public Keys</tr>
               </thead>
             </table>
             </div>
           </div>
         </div>
    );
  }
}
