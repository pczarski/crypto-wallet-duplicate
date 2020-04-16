import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import {getOrderHistory,makeOrder,getAllOrderHistory,cancelOrder} from '../lib/backendHandler.js';
import {Table} from 'react-bootstrap';
import Nav from '../components/Nav';
export default class OrderHistory extends React.Component {
  constructor(props) {

    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.selectDisplay = this.selectDisplay.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.toCancelOrder = this.toCancelOrder.bind(this);
    //makeOrder("Sell", "Binance", "ETH", "BTC", "5.0", "10.0")
    this.state = {
      supportedEx: ["ALL","Binance"],
      displayOptions:["ALL","COMPLETE","INCOMPLETE","CANCELED"],
      currentDisplay:"ALL",
      exchange: "Select an exchange",
      completedOrders: [],
      incompleteOrders: [],
      cancelledOrders: [],
      allOrders:[],
      gotOrders: false,
      dropdownOpen: false,
      dropdownDisplayOpen: false,
      cancel:false,
      ordersToCancel:[],
      selectedDetail: null,
      //gotExchange: fals
    }

  }
/*
  toggleCancel() {
  this.setState(
    {cancel: !this.state.cancel});
  }*/

  toCancelOrder(){
    const toCancel = this.state.ordersToCancel
    console.log("in cancel orders: 1)"+toCancel+" 2) "+this.state.incompleteOrders.length)
    this.state.incompleteOrders.map((element,i)=>{
      console.log(element.id)
      let index = toCancel.indexOf(element.id.toString())
      console.log("index: " + index)
      if (index>=0){cancelOrder(element.exchange,element.id)}//if element.id is in ordersToCancel

      //{this.state.ordersToCancel.includes(element.id)?console.log("includes element "):console.log("Doesnot includes element") }
      /*{
        console.log("includes element is")
        let can = cancelOrder(element.exchange,element.id)
        console.log(can)
      }*/
    })
    this.getOrders()
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
      });
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
      let cancelled =[]
      /*
      console.log("CURRENT EXCHANGE: "+ this.state.exchange)
      console.log("CURRENT DISPLAY: "+ this.state.currentDisplay)
      console.log("ALLORDERS: "+ allOrders.length)
      */
      for(let i =0; i<allOrders.length;i++){
        orders.push(allOrders[i])

        if (allOrders[i].status ==="COMPLETE"){complete.push(allOrders[i])}
        else if(allOrders[i].status ==="CANCELED"){cancelled.push(allOrders[i])}
        else{incomplete.push(allOrders[i])}
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
          allOrders:orders,
          cancelledOrders:cancelled,
        }
      )

    }

  getTable(){
    let display= [];
    if(this.state.currentDisplay === this.state.displayOptions[2]){
      display = this.state.incompleteOrders
      //console.log("INCOMPLETE: " +display)
    }
    else if (this.state.currentDisplay === this.state.displayOptions[0]){
      display = this.state.allOrders
      //console.log("DISPLAY ALLORDERS: " +display)
    }
    else if(this.state.currentDisplay === this.state.displayOptions[1]){
      display = this.state.completedOrders
      //console.log("DISPLAY COMPLETE: " +display)
    }
    else if(this.state.currentDisplay === this.state.displayOptions[3]){
      display = this.state.cancelledOrders
    }

    else{
      console.log("display=null")
      return
    }
    //id,currency1,currency2,initialAmount,amountComplete
    //unitPrice,type,status,percentComplete,date
    return  display ===[]? null:display.map((element,i)=>{
      return(

        <Table key={i}>
        <caption>Info</caption>
        <tr  key={element.id}  onClick={() => this.fetchDetails(element.id)}>
          <td>{element.id}</td>
           <td >{element.currency1}</td>
           <td >{element.currency2}</td>
           <td >{element.type}</td>
           <td >{element.status}</td>
           <td >{element.data}</td>
           {element.status === "COMPLETE"||element.status === "CANCELED"?<td><input type="checkbox" disabled={true} name={element.id} id={element.id} /></td> :<td><input type="checkbox" id={element.id} onChange={this.handleInputChange} name={element.id} /></td>}
        </tr>

        </Table>



      )
    })
  }
  async fetchDetails(id) {
    console.log(id)

    //this.expand()

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
    console.log(this.state.ordersToCancel)
  }

  render () {


    return (
      <div className="wrapper">
      <Nav/>
        <div className="container">
        {this.state.cancel === false?
          <div>
          <h2>Order History</h2>

            {/*TODO: please style this button*/}
            <button onClick={this.props.goBack}>Go back</button>

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
            </div></div>:<div><h2>Cancel Order</h2><p>Select incomplete orders you would like to cancel</p></div>}

          <Button className="btn btn-primary" size="lg" onClick={this.toCancelOrder}>Cancel selected Orders</Button>

          <div className="table">

            <Table id="simple-board" size="sm" className="striped bordered hover">
              <thead>
              <tr>
               <th>ID</th>
               <th>Currency1</th>
               <th>Currency2</th>
               <th>Type</th>
               <th>Status</th>
               <th>Date</th>
               <th>Cancel</th>
              </tr>
              </thead>
            </Table>
              {this.state.gotOrders === true?
              this.getTable():null}

           </div>

        </div>
      </div>
    );
  }
}
