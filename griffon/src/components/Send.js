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
      amount: '',
      address: '',
      response: '',
      tooltipOpen: false
    };

    this.handleAddrChange = this.handleAddrChange.bind(this);
    this.handleAmChange = this.handleAmChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSendAsAvail = this.setSendAsAvail.bind(this);

  }
  componentDidMount() {
    if (!(sessionStorage.getItem('sendState') == null || sessionStorage.getItem('sendState') == 'null')) {
      const rehydrate = JSON.parse(sessionStorage.getItem('sendState'))
      this.setState({amount: rehydrate.amount, address: rehydrate.address})
    }
  }
  componentWillUnmount() {
    if (this.state.amount.length === 0 && this.state.address.length === 0){
      sessionStorage.setItem('sendState', null)
    }
    else if (this.state.amount !== '' || this.state.address !== ''){
      sessionStorage.setItem('sendState', JSON.stringify(this.state))
    }
  }

  handleAddrChange(event) {
    this.setState({
      address: event.target.value
    });
  }
  handleAmChange(event) {
    this.setState({
      amount: event.target.value
    });

  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps.curr !== this.props.curr) {
      this.setState({balance: getBalance(this.props.curr)}, this.props.reset)
    }
  }

  handleSubmit(event) {
    if (!(this.state.address.length > 0)) {
      this.setState({response: 'Address unsupported'})
    }
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
    <div className="container">
      <Card body className="text-center bg-dark text-white ">
      <h2>Send {this.props.curr}</h2>
      <CardBody>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="exampleEmail" placeholder="Address or domain" onChange={this.handleAddrChange} value={this.state.address} />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input type="text" name="amount" placeholder="0.00" onChange={this.handleAmChange} value={this.state.amount}/>
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
