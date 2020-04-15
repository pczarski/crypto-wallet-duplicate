import React from 'react';
import '../styles/App.scss';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import {sendCurr, getBalance} from '../lib/backendHandler';

// TO DO:
// VALIDATION, can't be empty
//

export default class Send extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: getBalance(this.props.curr),
      address: null,
      amount: null,
      response: "0"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  handleSubmit(event) {
    let resp = sendCurr(this.props.curr, this.state.amount, this.state.address).response
    console.log(resp)
    this.setState({
      balance: getBalance(this.props.curr),
      response: resp
    });
    event.preventDefault();
  }
  render () {
    return (
    <div>
      <h2>Send {this.props.curr}</h2>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Input type="text" name="address" id="exampleEmail" placeholder="Address or domain" onChange={this.handleInputChange}  />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input type="text" name="amount" placeholder="0" onChange={this.handleInputChange} />
        </FormGroup>
        <legend>Available {this.state.balance}</legend>
        <Button>Submit</Button>

      </Form>

      {<p>Response: {this.state.response}</p> && (!this.state.response == null)}
    </div>
    )
  }
}
