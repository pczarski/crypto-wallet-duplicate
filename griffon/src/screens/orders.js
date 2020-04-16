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
import Withdraw from '../components/Withdraw';
import Deposit from '../components/Deposit';
import { addExchange} from '../lib/backendHandler';
export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      address:null,
      name: null,
      response: "0",
      choice:''
    }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
          this.handleClick2 = this.handleClick2.bind(this);
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

    });

    event.preventDefault();
  }
  handleClick(event) {
    this.setState({
      choice:'1'
    });

    event.preventDefault();
  }
  handleClick1(event) {
    this.setState({
      choice:'2'
    });

    event.preventDefault();
  }
  handleClick2(event) {
    this.setState({
      choice:'3'
    });

    event.preventDefault();
  }
  render () {
    let component;
    if (this.state.choice === "1") {
      component = <Buy name={this.state.name}/>;
    }else if (this.state.choice ==="2") {

        component = <Withdraw name={this.state.name}/>;
    }
    else if (this.state.choice ==="3") {

        component = <Deposit name={this.state.name}/>;
    }

    return (
      <div className="wrapper">
      <Nav />
        <div id="box"className="container">
          <h2>Add Exchange or Withdraw/Deposit</h2>

        <Form >

          <FormGroup>
            <Label for="name">Exchange Name</Label>
            <Input type="text" name="name" placeholder="Enter your Exchange Name"  onChange={this.handleInputChange} />
            <Label for="address">Exchange Address</Label>
            <Input type="text" name="address" placeholder="Enter your Exchange Address"  onChange={this.handleInputChange} />
          </FormGroup>

          <Button onClick={this.handleSubmit} >Submit</Button>
          <div>
          <Button onClick={this.handleClick1} >Withdraw</Button><Button onClick={this.handleClick} >Make Order</Button><Button onClick={this.handleClick2} >Deposit</Button></div>


    {<p>Response: {this.state.response}</p> && (!this.state.response == null)}
        </Form>


        {component}
          </div>
        </div>

    );
  }
}
