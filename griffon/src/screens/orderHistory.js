import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";

// import getIcons from '../components/Icons';
import {getOrderHistory} from '../lib/backendHandler.js';
import Table from 'react-bootstrap/Table'

import Receive from '../components/Receive';
import Send from '../components/Send';
import Nav from '../components/Nav';
//id,currency1,currency2,initialAmount,amountComplete,unitPrice,type,status,percentComplete,date

export default class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.state = {
      supportedEx: ["Binance"],
      displayOptions:["ALL","COMPLETE","INCOMPLETE"],
      currentDisplay:"Select a Display",
      images: [],
      exchange: "Select an Exchange",
      completedOrders: [],
      incompleteOders: [],
      orders:[],
      gotOrders: false,
      dropdownOpen: false,
      //selected: "BTC",
      change: false
    }

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

  getOrders(prev, exch){
      let allOrders = getOrderHistory(exch)
      let incomplete =[]
      let complete =[]
      let orders =[]
      console.log(allOrders)
      for(let i =0; i<allOrders.length;i++){
        orders.push(allOrders[i].status)
        incomplete.push(allOrders[i].status)
        complete.push(allOrders[i].status)
      }
      /*
      this.state.con.map((element,i)=>{
        orders.push(element)
        if {element.status} ==="COMPLETE"? complete.push(element): incomplete.push(element)

      })*/

      this.setState(
        {
          gotOrders: true,
          incompleteOders:incomplete,
          completedOrders:complete,
        }
      )
    //  console.log("gotLEMWO"+this.state.gotKeys )
      console.log(complete)
    }
  select(e) {
    const prev = this.state.exchange;
    if (!(e.target.innerText === prev)) {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
        exchange: e.target.innerText,
        gotOrders: false
      });
      this.getOrders(prev, e.target.innerText)
    }
  }

  getTable(){
    let display= null;
    if (this.state.currentDisplay === "COMPLETE"){
      display = this.state.completedOrders
    }
    else if(this.state.currentDisplay === "INCOMPLETE"){
      display = this.state.incompletedOrders
    }
    else if(this.state.currentDisplay === "ALL"){
      display = this.state.orders
    }
    else{
      return
    }
    return display.map((element,i)=>{
      return(
        <tr  key={i}>
          <td>{i}</td>
           //<td >{this.state.publickeys[i]}</td>
           <td >{display[i]}</td>
        </tr>

      )
    })
  }
  getDropdownItems(item){
    item ===1? item=this.state.supportedEx: item=this.state.displayOptions
    return item.map((element,i)=>{
      return(
        <DropdownItem key={element} onClick={this.select}>{item[i]}</DropdownItem>
      )
    })
  }

  render () {
  const DropdownList = () => (
    <div>
      {this.state.supportedEx.map(exch =>
      <DropdownItem onClick={this.select} key={exch}> {exch} </DropdownItem>
      )}
    </div>
  );
  return (
    <div className="wrapper">
    <Nav/>
      <div className="container">
        <h2>Order History</h2>
        <div className="currSel">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.state.exchange}
            </DropdownToggle>
            <DropdownMenu>
               {this.getDropdownItems(1)}

            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={this.state.dropdownDisplayOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.state.currentDisplay}
            </DropdownToggle>
            <DropdownMenu>
               {this.getDropdownItems(2)}

            </DropdownMenu>
          </Dropdown>
          </div>

        <Button className="btn btn-primary" size="lg" onClick={
    this.send()}>Cancel an Order</Button>
        <Button className="btn btn-primary" size="lg">View  in-progress Orders</Button>
        <div className="table">

          <  Table id="simple-board" size="sm" className="striped bordered hover">

            <thead>
            <tr>
             <th>ID</th>
             <th>Currency1</th>
             <th>Currency2</th>
             <th>Type</th>
             <th>Status</th>
             <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {this.state.gotOrders === true?
            this.getTable()
            :null}
            </tbody>
            </Table>

         </div>
        <Link to="/">
          <button type="button" className="btn btn-primary">Go back</button>
        </Link>
      </div>
    </div>
  );
  }
}
