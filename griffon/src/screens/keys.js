import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import {getCurr} from '../lib/backendHandler.js';
import Table from 'react-bootstrap/Table'
// import { Button, Alert } from 'reactstrap';

export default class Keys extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      currency: "Select a currency", // currency name (bitcoin, litecoin, etc. btc by default)
      publickeys: [],
      privatekeys: [],
      gotKeys: false,
      dropdownOpen: false
    }
  }

  getkeys(prev, curr){
      let con = getCurr(curr)
      let keypairs = con.keyPairs
      let privk =[]
      let pubk =[]
      //console.log(keypairs)
      for(let i =0; i<keypairs.length;i++){
        privk.push(keypairs[i].privateKey)
        pubk.push(keypairs[i].publicKey)
      }
      //console.log("go"+privk )
      this.setState(
        {
          gotKeys: true,
          publickeys:pubk,
          privatekeys:privk,
      })
    //  console.log("gotLEMWO"+this.state.gotKeys )
      //console.log(privk)
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
/*rows(element,i){
  //console.log("rows")
  return(<tr  key={i}>
    <td>{i}</td>
     <td >{this.state.publickeys[i]}</td>
     <td >{this.state.privatekeys[i]}</td>
  </tr>)
}*/
  getTable(){
    return this.state.privatekeys.map((element,i)=>{
      return(
        <tr  key={i}>
          <td>{i}</td>
           <td >{this.state.publickeys[i]}</td>
           <td >{this.state.privatekeys[i]}</td>
        </tr>

      )
    })
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

      <div className="wrapper">
           <div className="extra">
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
                 {this.state.gotKeys === true? <
                   Table id="simple-board" size="sm" className="striped bordered hover">

                   <thead>
                   <tr>
                    <th>#</th>
                    <th>Private Keys</th>
                    <th>Public Keys</th>
                   </tr>
                   </thead>
                   <tbody>{this.getTable()}</tbody>
                   </Table>:null}

                </div>
           </div>
         </div>
    );
  }
}
