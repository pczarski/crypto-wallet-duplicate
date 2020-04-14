import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";

// import getIcons from '../components/Icons';
import {getOrderHistory,makeOrder,getAllOrderHistory,cancelOrder} from '../lib/backendHandler.js';
import Table from 'react-bootstrap/Table';

import Receive from '../components/Receive';
import Send from '../components/Send';
import Nav from '../components/Nav';
//id,currency1,currency2,initialAmount,amountComplete,unitPrice,type,status,percentComplete,date
//console.log(makeOrder("Sell", "Binance", "ETH", "BTC", "5.0", "10.0"))
export default class OrderHistory extends React.Component {
  constructor(props) {

    super(props);
    //makeOrder("Sell", "Binance", "ETH", "BTC", "5.0", "10.0")
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.selectDisplay = this.selectDisplay.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      supportedEx: ["ALL","Binance"],
      displayOptions:["ALL","COMPLETE","INCOMPLETE"],
      currentDisplay:"ALL",
      exchange: "Select an exchange",
      completedOrders: [],
      incompleteOrders: [],
      allOrders:[],
      gotOrders: false,
      dropdownOpen: false,
      dropdownDisplayOpen: false,
      cancel:false,
      ordersToCancel:[]
      //selected: "BTC",
      //gotExchange: fals
    }

  }

  toggleCancel() {
  this.setState(
    {cancel: !this.state.cancel});
  }

  toCancelOrder(){
    console.log("orderto cancel "+this.state.ordersToCancel[0] + "got orders " + this.state.gotOrders)
    for(let i =0; i<this.state.incomplete.length;i++){
      window.alert("Only incomplete orders will be deleted")
      console.log(this.state.incomplete)
      for(let x =0; x<this.state.ordersToCancel.length;i++)
      {
        if (this.state.incomplete[x].id ===this.state.ordersToCancel[i]){
          cancelOrder(this.state.incomplete[x].exchange,this.state.incomplete[x].id)
        }

      }
    console.log("selected orders cancelled")
    return this.state.getOrders ===false? null:null
  }
}


  toggle(e) {
    e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  async select(e) {
    const exch = this.state.exchange;
    if (e.target.innerText !== exch) {
      //After an exchange option has been chosen, if the currentExchange does not equal the selected exchange option
      //changes currentExchange to selected option
    //  console.log("e.target.innerText !== exch")

      await this.setState({
        dropdownOpen: !this.state.dropdownOpen,
        exchange: e.target.innerText,
        gotOrders: false,
        //gotExchange: true
      })
      //console.log("SELECTED EXCHANGE: "+ this.state.exchange )
      this.getOrders()//get orders for the current exchange
    }
  }
  toggleDisplay(e) {
    e.preventDefault();
    this.setState({
      dropdownDisplayOpen: !this.state.dropdownDisplayOpen
    });
  }
  async selectDisplay(e) {
    const prev = this.state.currentDisplay;
    if (!(e.target.innerText === prev)) {
      //After an display option has been chosen, if the currentDisplay does not equal the selected display option
      await this.setState({
        dropdownDisplayOpen: !this.state.dropdownDisplayOpen,
        currentDisplay: e.target.innerText,
      });
      //this.getOrders()
    }
  }
  getDropdownItems(item){
    let select =null;
    if(item ===1){
      return this.state.supportedEx.map((element,i)=>{
        return(
          <DropdownItem key={element} onClick={this.select}>{this.state.supportedEx[i]}</DropdownItem>
        )
      })
    }
    else{
      return this.state.displayOptions.map((element,i)=>{
        return(
          <DropdownItem key={element} onClick={this.selectDisplay}>{this.state.displayOptions[i]}</DropdownItem>
        )
      })
    }
  }

  getOrders(){
      let allOrders =[]
      //console.log("DISPLAY OPTION: "+ this.state.currentDisplay)
      this.state.exchange === this.state.supportedEx[0]? allOrders = getAllOrderHistory():allOrders = getOrderHistory(this.state.exchange);
      //returns all orders from specified exchange
      let incomplete =[]
      let complete =[]
      let orders =[]
      /*
      console.log("CURRENT EXCHANGE: "+ this.state.exchange)
      console.log("CURRENT DISPLAY: "+ this.state.currentDisplay)
      console.log("ALLORDERS: "+ allOrders.length)
      */
      for(let i =0; i<allOrders.length;i++){
        orders.push(allOrders[i])
        allOrders[i].status ==="COMPLETE"? complete.push(allOrders[i]):incomplete.push(allOrders[i])
      }
      /*
      console.log("COMPLETE: " +complete.length)
      console.log("INCOMPLETE: " +incomplete.length)
      console.log("ALL: " +orders.length)*/

      this.setState(
        {
          gotOrders: true,
          incompleteOrders:incomplete,
          completedOrders:complete,
          allOrders:orders
        }
      )

    }

  getTable(){
    let display= [];
    if (this.state.currentDisplay === this.state.displayOptions[0]){
      display = this.state.allOrders
      //console.log("DISPLAY ALLORDERS: " +display)
    }
    else if(this.state.currentDisplay === this.state.displayOptions[1]){
      display = this.state.completedOrders
      //console.log("DISPLAY COMPLETE: " +display)
    }
    else if(this.state.currentDisplay === this.state.displayOptions[2]){
      display = this.state.incompleteOrders
      //console.log("INCOMPLETE: " +display)
    }
    else{
      console.log("display=null")
      return
    }
    //id,currency1,currency2,initialAmount,amountComplete
    //unitPrice,type,status,percentComplete,date
    return  display ===[]? null:display.map((element,i)=>{
      return(
        <tr  key={i}>
          <td>{element.id}</td>
           <td >{element.currency1}</td>
           <td >{element.currency2}</td>
           <td >{element.type}</td>
           <td >{element.status}</td>
           <td >{element.data}</td>
           {this.state.cancel === true? <th><input type="checkbox" onChange={this.handleInputChange} name={element.id}  cancelinfo={[element.exchange,element.id]} /></th>:null}
        </tr>

      )
    })
  }
  async handleInputChange(event) {
    const target = event.target;
    var arr=this.state.ordersToCancel
    var index = arr.indexOf(target.id)//finds the index of the arg, if arg not in arr return a no <0
    if (target.checked === true){
      if (index<0){arr.push(target.id)}//if target.id not in arr
    }
    else{
      if (index>=0){arr.splice(index,1)}//if target.id is in arr removes it
    }
    await this.setState({
      ordersToCancel: arr
    })
    console.log("CHECKED changes ARR: "+this.state.ordersToCancel.length)
  }

  render () {


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
            <h3>Display:</h3>
            <Dropdown isOpen={this.state.dropdownDisplayOpen} toggle={this.toggleDisplay}>
              <DropdownToggle caret>
                {this.state.currentDisplay}
              </DropdownToggle>
              <DropdownMenu>
                 {this.getDropdownItems(2)}

              </DropdownMenu>
            </Dropdown>
            </div>

          <Button className="btn btn-primary" size="lg" onClick={() => this.toggleCancel()}>{this.state.cancel === true?"Exit cancel Orders":"Cancel Orders"}</Button>

          {this.state.cancel === true?<Button className="btn btn-primary" size="lg" onClick={() => this.toCancelOrder()}>Cancel selected Orders</Button>:null}

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
               {this.state.cancel === true? <th>Cancel</th>:null}
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
