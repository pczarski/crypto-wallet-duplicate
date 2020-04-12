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

export default class PubKey extends React.Component {
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
      console.log(keypairs)
      for(let i =0; i<keypairs.length;i++){
        privk.push(keypairs[i].privateKey)
        pubk.push(keypairs[i].publicKey)
      }
      console.log(privk)
      this.setState(
        {
          gotKeys: true,
          publickeys:pubk,
          privatekeys:privk,
      })
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

  getTable(){
    return (<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
  </Table>)

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
               {console.log("RENDER"+this.gotKeys)}
               {this.gotKeys === true? this.getTable():null}

            </div>
           </div>
         </div>
    );
  }
}
