import React from 'react';
import '../styles/App.scss';

import { Button, Form, FormGroup, Label, Input, Tooltip, Card, CardBody, CardText} from 'reactstrap';

import {sendCurr, getBalance} from '../lib/backendHandler';
import {cardStyles} from "../styles/selectStyles";

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
      tooltipOpen: false,
      isError: false,
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
    if (this.state.address.length <= 0) {
      this.setState({response: 'Address unsupported', isError: true,})
    }
    else if (this.state.amount > 0) {
      const req = sendCurr(this.props.curr, this.state.amount, this.state.address);
      let resp = req.response;
      const id = req.id;
      console.log(resp);
      this.setState({
        balance: getBalance(this.props.curr),
        response: resp,
        isError: (id <= 0),
      });
    } else {
      this.setState({response: 'Insufficient amount', isError: true,})
    }
    event.preventDefault();
  }

  toggle = () => {
    this.setState({tooltipOpen: !this.state.tooltipOpen})
  };

  setSendAsAvail () {
    this.setState({amount: this.state.balance})
  }

  render () {
    return (
        <div>
          <Card body className="text-center"
                style={cardStyles}
          >
            <CardBody>
              <div className={'row d-flex justify-content-center'}>
                <div style={{minWidth: '800px'}}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup style={{textAlign: 'left', paddingBottom:'3%'}}>
                      <Label for="address">Address</Label>
                      <Input type="text" name="address" id="exampleEmail" placeholder="Address or domain" onChange={this.handleAddrChange} value={this.state.address} />
                    </FormGroup>
                    <FormGroup style={{textAlign: 'left'}}>
                      <Label for="amount">Amount</Label>
                      <Input type="text" name="amount" placeholder="0.00" onChange={this.handleAmChange} value={this.state.amount}/>
                    </FormGroup>
                    <legend>Available: <span id="allAvailable" onClick={this.setSendAsAvail}>{this.state.balance} {this.props.curr}</span></legend>
                    <Tooltip style={{backgroundColor: '#202225'}}
                             placement="right" isOpen={this.state.tooltipOpen} target="allAvailable" toggle={this.toggle}>
                      Send all available currency
                    </Tooltip >
                    <Button type="submit" size='lg' className='btn-action'>Send</Button>
                  </Form>
                </div>
              </div>
            </CardBody>
            <CardText>
          <span className={(this.state.isError) ? 'error-message' : 'success-message'}
          >{this.state.response}</span>
            </CardText>
          </Card>
          <p></p>
        </div>
    )
  }
}
