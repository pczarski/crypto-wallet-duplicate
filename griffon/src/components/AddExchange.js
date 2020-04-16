import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import '../styles/buy.scss';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,Form, FormGroup, Label, Input } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import Buy from '../components/Buy';
import { addExchange} from '../lib/backendHandler';
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";


export default class AddExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      address:null,
      name: null,
      response: "0"
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

      response: resp
    });

    event.preventDefault();
  }
// <Buy name={this.state.name} />;
  render () {
    let component;


    return (


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

    );
  }
}
