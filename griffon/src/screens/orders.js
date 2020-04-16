import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,Form, FormGroup, Label, Input } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import Buy from '../components/Buy';
import { addExchange} from '../lib/backendHandler';
export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      address:null,
      name: null,
      response: "0",
      choice:0

    }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }
  handleSubmit(event) {
    let resp = addExchange( this.state.name, this.state.address);
    console.log(resp);
    this.setState({

      response: resp,
      choice:'1'
    });
    event.preventDefault();
  }
  render () {
    let component;
        if (this.state.choice === "1") {
          component = <Buy name={this.state.name}/>;
    }

    return (
      <div className="wrapper">
      <Nav />
        <div id="box"className="container">

        <Form onSubmit={this.handleSubmit}>

          <FormGroup>
            <Label for="name">Exchange Name</Label>
            <Input type="text" name="name" placeholder="Enter your Exchange Name"  onChange={this.handleInputChange} />
            <Label for="address">Exchange Address</Label>
            <Input type="text" name="address" placeholder="Enter your Exchange Address"  onChange={this.handleInputChange} />
          </FormGroup>

          <Button >Submit</Button>

    {<p>Response: {this.state.response}</p> && (!this.state.response == null)}
        </Form>


        {component}
          </div>
        </div>

    );
  }
}











//
//
//
// const DropdownList = () => (
//   <div>
//     {this.state.exchanges.map(curr =>
//     <DropdownItem onClick={this.select} key={curr}> {curr} </DropdownItem>
//     )}
//   </div>
// );
// const Withdraw  = () => (
//
//                <div className="container">
//                <form id="form1"className="text-center  p-5" action="#!">
//  <p className="h4 mb-4">Withdraw Currency</p>
//
//  <div className="form-row mb-4 ">
//      <div className="col">
//      <label >Currency:</label>
//      <select id="Crypto" className="form-control" name="cars" >
//
//  <option value="BTC">Bitcoin</option>
//  <option value="ETH">Etherium</option>
//  <option value="LTC">Litecoin</option>
//  <option value="USTC">Tether</option>
//  <option value="Dash">Dash</option>
// </select>
//      </div>
//      <div className="col">
//      <label >Available Balance:</label>
//           <input type="text"  className="form-control" placeholder="0.00" />
//      </div>
//
//
//  </div>
// <div className="form-row mb-4">
// <label >Withdrawal Address:</label>
// <input type="text"  className="form-control" placeholder="Enter your Withdrawal address" />
// </div>
//  <div className="form-row mb-4">
//
//  <div className="col">
// <label >Enter Amount:</label>
//  <input type="number" className="form-control mb-4" placeholder="0.00"/></div>
//  </div>
//
// <div className="form-row mb-4">
// <div className="col">
//  <button className="btn btn-info my-4 btn-block" type="submit">Continue</button>
//  </div>
//  <div className="col">
//  <Link to= "Buy">
//      <button className="btn btn-info my-4 btn-block" >Back</button></Link>
//      </div>
//      </div>
// </form>
//                </div>

//
// );
// const TopUp  = () => (
//    <div className="container">
//   <form id="form1"className="text-center  p-5" action="#!">
// <p className="h4 mb-4">Send Currency</p>
//
// <div className="form-row mb-4 ">
//     <div className="col">
//     <label >Currency:</label>
//     <select id="Crypto" className="form-control" name="cars" >
//
// <option value="BTC">Bitcoin</option>
// <option value="ETH">Etherium</option>
// <option value="LTC">Litecoin</option>
// <option value="USTC">Tether</option>
// <option value="Dash">Dash</option>
// </select>
//     </div>
//     <div className="col">
//     <label >To:</label>
//          <input type="text"  className="form-control" placeholder="Enter your Public Key address" />
//     </div>
//
//
// </div>
//
// <div className="form-row mb-4">
//
// <div className="col">
// <label >Enter Amount:</label>
// <input type="number" className="form-control mb-4" placeholder="0.00"/></div><p id="arrow" onClick=""> <a id="test" href="#">&#8644;</a></p>
// <div className="col">
// <label >To:</label>
// <input  type="number"  className="form-control" placeholder="0.00" />
// </div></div>
//
// <div className="form-row mb-4">
// <div className="col">
//     <button className="btn btn-info my-4 btn-block" type="submit">Continue</button>
//     </div>
//     <div className="col">
//     <Link to= "Buy">
//         <button className="btn btn-info my-4 btn-block" >Back</button></Link>
//         </div>
//         </div>
// </form>
// </div>
// );
