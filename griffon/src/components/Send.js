import React from 'react';
import '../styles/App.scss';

import { Button, Form, FormGroup, Label, Input, Tooltip, Card, CardBody, CardText} from 'reactstrap';

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
      amount: '',
      response: '',
      tooltipOpen: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSendAsAvail = this.setSendAsAvail.bind(this);

  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps.curr !== this.props.curr) {
    this.setState({balance: getBalance(this.props.curr), amount: '', address: ''})
    }
  }

  handleSubmit(event) {
    if (this.state.amount > 0) {
      let resp = sendCurr(this.props.curr, this.state.amount, this.state.address).response
      console.log(resp)
      this.setState({
        balance: getBalance(this.props.curr),
        response: resp
      });
      
    } else {
      this.setState({response: 'Insufficient amount'})
    }
      event.preventDefault();
    }

  toggle = () => {
    this.setState({tooltipOpen: !this.state.tooltipOpen})
  }

  setSendAsAvail () {
    this.setState({amount: this.state.balance})
  }

  render () {
    return (
    <div className="container" style={{}}>
      <Card body className="text-center bg-dark text-white ">
      <h2>Send {this.props.curr}</h2>
      <CardBody>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Input type="text" name="address" id="exampleEmail" placeholder="Address or domain" onChange={this.handleInputChange}  />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input type="text" name="amount" placeholder="0.00" onChange={this.handleInputChange} value={this.state.amount}/>
        </FormGroup>
        <legend>Available: <span id="allAvailable" onClick={this.setSendAsAvail}>{this.state.balance}</span></legend>
        <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="allAvailable" toggle={this.toggle}>
        Send all available currency
      </Tooltip>
        <Button type="submit">Submit</Button>
      </Form>
      </CardBody>
      <CardText>{this.state.response}</CardText>
      </Card>
      <p></p>
    </div>
    )
  }
}
