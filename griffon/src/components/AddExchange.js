import React from 'react';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import '../styles/buy.scss';

import {  Button,Form, FormGroup, Label, Input } from "reactstrap";
import { addExchange} from '../lib/backendHandler';

// TO DO CHECK EMPTY/ VALID

export default class AddExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address:null,
      name: null,
      response: ""
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
    this.setState({
      response: resp.exchangeName
    });
    event.preventDefault();
  }

  render () {
    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Exchange Name</Label>
            <Input type="text" name="name" placeholder="Enter your Exchange Name"  onChange={this.handleInputChange} />
            <Label for="address">Exchange Address</Label>
            <Input type="text" name="address" placeholder="Enter your Exchange Address"  onChange={this.handleInputChange} />
          </FormGroup>
          <Button >Submit</Button>
          <p>{this.state.response}</p>
        </Form>
      </div>
    );
  }
}
