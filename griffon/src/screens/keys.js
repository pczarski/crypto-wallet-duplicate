import React from 'react';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import {getCurr} from '../lib/backendHandler.js';
import {Table} from 'reactstrap';
// import { Button, Alert } from 'reactstrap';

export default class Keys extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      currency: "BTC", // currency name (bitcoin, litecoin, etc. btc by default)
      keyPairs: getCurr("BTC").keyPairs,
      publickeys: [],
      privatekeys: [],
      gotKeys: false,
      dropdownOpen: false
    }
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
        keyPairs: getCurr(e.target.innerText).keyPairs,
        gotKeys: false
      });
      this.getTable()
    }
  }
  getTable(){
    return Object.keys(this.state.keyPairs).map((item, i) => {
        return (
          <tr key={i}>
            <td>{item}</td>
            <td>{this.state.keyPairs[item].publicKey}</td>
            <td>{this.state.keyPairs[item].privateKey}</td>
            <td>{this.state.keyPairs[item].balance}</td>
          </tr>
          )
        });
      }
  getDropdownItems(){
    return this.state.supportedCurr.map((element,i)=>{
      return(
        <DropdownItem key={element} onClick={this.select}>{this.state.supportedCurr[i]}</DropdownItem>
      )
    })
  }


  render () {
    return (
      <div>
             <h1>Keys</h1>
             <div className="currSel">
               <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                 <DropdownToggle caret>
                   {this.state.currency}
                 </DropdownToggle>
                 <DropdownMenu>
                    {this.getDropdownItems()}
                 </DropdownMenu>
               </Dropdown>
               </div>
               <div>
                 <Table id="simple-board" size="sm" className="table table-striped table-hover table-dark">
                   <thead>
                   <tr>
                    <th>#</th>
                    <th>Private Keys</th>
                    <th>Public Keys</th>
                    <th>Balance</th>
                   </tr>
                   </thead>
                   <tbody>
                    {this.getTable()}
                    </tbody>
                   </Table>
                </div>
           </div>
    );
  }
}
