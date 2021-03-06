import React from 'react';
import '../styles/App.scss';
import '../styles/OrderHistory.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import {getOrderHistory,cancelOrder} from '../lib/backendHandler.js';
import {Table} from 'reactstrap';
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
      supportedEx: this.props.exchanges.map(element => element.value),
      displayOptions:["ALL","COMPLETE","INCOMPLETE","CANCELED"],
      currentDisplay:"ALL",
      exchange: this.props.exchange.value,
      completedOrders: [],
      incompleteOrders: [],
      cancelledOrders: [],
      allOrders:[],
      dropdownOpen: false,
      dropdownDisplayOpen: false,
      cancel:false,
      ordersToCancel:[],
      selectedDetail: null,
      //gotExchange: fals
    }

  }
  componentDidMount(){
    this.getOrders()
    this.interval = setInterval(() => this.getOrders(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  /*
    toggleCancel() {
    this.setState(
      {cancel: !this.state.cancel});
    }*/

  toCancelOrder(){
    const toCancel = this.state.ordersToCancel
    //console.log("in cancel orders: 1)"+toCancel+" 2) "+this.state.incompleteOrders.length)
    this.state.incompleteOrders.map((element,i)=>{
      //console.log(element.id)
      let index = toCancel.indexOf(element.id.toString())
      //console.log("index: " + index)
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
    allOrders = getOrderHistory(this.state.exchange);
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

          /*<Table size="sm" key={i}>*/
          <tbody key={i}>
          <tr  key={element.id}  onClick={() => this.fetchDetails(element.id)}>
            <td>{element.id}</td>
            <td >{element.currency1}</td>
            <td >{element.currency2}</td>
            <td >{element.type}</td>
            <td className={getColor(element.status)}
            >{element.status}</td>
            <td >{element.date}</td>
            {element.status === "COMPLETE"||element.status === "CANCELED"?<td><input type="checkbox" disabled={true} /></td> :<td><input type="checkbox" onChange={this.handleInputChange} name={element.id} /></td>}
          </tr>
          <tr id={element.id}  className="collapse">
            <td colSpan="7">
              <small>
                <div className="column">
                  <p><b>Ininitial Amount: </b>{element.initialAmount}</p>
                  <b>Unit Price: </b>{element.unitPrice}
                </div>
                <div className="column">
                  <p><b>Amount Complete: </b>{element.amountComplete}</p>
                  <b>Percent Complete: </b>{element.percentComplete}
                </div>
              </small>
            </td>
          </tr>
          </tbody>

          /*</Table>*/



      )
    })
  }
  fetchDetails(id) {
    //console.log(document.getElementById(id))
    if (document.getElementById(id)) {

      if (document.getElementById(id).className == "collapse") {
        document.getElementById(id).className = "expand";
      }
      else {
        document.getElementById(id).className = "collapse";
      }
    }

    //this.expand()

  }

  async handleInputChange(event) {
    const target = event.target;
    var arr=this.state.ordersToCancel
    var index = arr.indexOf(target.name)//finds the index of the arg, if arg not in arr return a no <0
    if (target.checked === true){
      if (index<0){arr.push(target.name)}//if target.id not in arr
    }
    else{
      if (index>=0){arr.splice(index,1)}//if target.id is in arr removes it
    }
    await this.setState({
      ordersToCancel: arr
    })
    //console.log(this.state.ordersToCancel)
  }

  render () {
    //console.log(this.props.exchanges)
    return (
        <div className="">
          <Nav/>

          <div className="currSel">
            <div className="Dropdowns" style={{display: 'inherit'}}>
              <h5 className="tableInput" style={{paddingLeft: '1%', paddingRight: '1%', paddingTop: '5px'}}>Exchange </h5>
              <Dropdown className="tableInputSelect tableInput" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {this.state.exchange}
                </DropdownToggle>
                <DropdownMenu styles={{backgroundColor: '#36393f'}}>
                  {this.getDropdownItems(1)}
                </DropdownMenu>
              </Dropdown>
              <h5 className="tableInput" style={{paddingLeft: '1%', paddingRight: '1%',  paddingTop: '5px'}}>Display</h5>
              <Dropdown className="tableInputSelect tableInput" isOpen={this.state.dropdownDisplayOpen} toggle={this.toggleDisplay}>
                <DropdownToggle caret>
                  {this.state.currentDisplay}
                </DropdownToggle>
                <DropdownMenu>
                  {this.getDropdownItems(2)}
                </DropdownMenu>
              </Dropdown>
                <Button className="btn btn-primary tableInput"  id="cancelBtn" size="lg" onClick={this.toCancelOrder} >Cancel Selected Orders</Button>
              </div>
          </div>
            <table>
              <thead>
              <tr>
                <th className ="header">ID</th>
                <th className ="header">Currency1</th>
                <th className ="header">Currency2</th>
                <th className ="header">Type</th>
                <th className ="header">Status</th>
                <th className ="header">Date</th>
                <th className ="header">Cancel</th>
              </tr>
              </thead>
              {this.getTable()}
            </table>
          </div>



    );
  }
}

function getColor(type) {
    if(type === "IN_PROGRESS" || type === "NEW") {
      return 'success-message';
    }
    if(type === "CANCELED") {
      return 'error-message';
    } return '';
}
