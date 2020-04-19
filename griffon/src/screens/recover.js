import React from 'react';
import '../styles/App.scss';
import {Link, Redirect} from 'react-router-dom';

import {makeWallet} from "../lib/backendHandler.js";

import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, Input, CardBody, Form, CardText } from 'reactstrap';

import {cardStyles, popupHeaderStyles, popupStyles} from "../styles/selectStyles";
// to fix :
// , recover wallet, validation, check 12 words
// some css
export default class Recover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: '',
      walletMade: false,
      feedback: '',
      response: '',
      modal: false,
      pass: '',
      repeat: '',
      pval: null,
      pinval: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
    if (e.target.name === 'pass') {
      this.setState({pval: this.passwordValidation()});
    }
    console.log(this.state)
  }
  passwordValidation() {
    let password = this.state.pass
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    // console.log)
    if (password.length < 6) {
      this.setState({response: "Password must be at least 8 characters long."});
      return false
    } else if (password.length > 50) {
      this.setState({response: "Password must be shorter than 50 characters long."})
      return false
    } else if (password.search(/\d/) === -1) {
      this.setState({response: "Password must contain at least 1 number."});
      return false
    } else if (password.search(/[a-z]/) === -1) {
      this.setState({response: "Password must be at least 1 lowercase character."})
      return false
    } else if (password.search(/[A-Z]/) === -1) {
      this.setState({response: "Password must be at least 1 uppercase character."})
      return false
    } else if (password.search(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/) !== -1) {
      this.setState({response: "Password cannot contain symbols."})
      return false
    } else if ((password.search(reg) === 0)) {
      this.setState({response: ""});
      return true
    }
  }
  checkMatch() {
    console.log(this.state)
    if (this.state.pass === this.state.repeat) {
      localStorage.setItem('pass', this.state.repeat)
      const wallet = makeWallet(this.state.seed)
      console.log(wallet)
      this.setState({walletMade: true})
      this.toggle()
    } else {
      this.setState({feedback: "Please confirm your passwords are written correctly."})
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.seed !== '') {
      this.setState({modal: true});
    }
    else {
      this.setState({feedback: 'Enter a valid seed'})
    }
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }
  render () {
    if (this.state.walletMade === true) {
      return <Redirect to='/wallet' />
    }
    return (

        <div className="wrapper">
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle} style={popupHeaderStyles}>Set a password</ModalHeader>
            <Card className="text-center" id="norad" style={cardStyles}>
              <CardBody>
                <Form className="needs-validation ">
                  <div className="vertical-input-group">
                    <div className="input-group" style={{paddingBottom: '5%'}}>
                      <Input valid={this.state.pval} type="password" name="pass" id="inp" placeholder="Password" style={{height: '5vh'}} value={this.state.pass} onChange={this.handleChange} className="form-control"/>
                    </div>
                    <div className="input-group"></div>
                    <Input type="password" name="repeat" id="inp" placeholder="Repeat password" style={{height: '5vh'}} value={this.state.repeat} onChange={this.handleChange} className="form-control"/>
                  </div>
                  <CardText>
                    <p className={'error-message'}>
                      {this.state.response}
                    </p>
                  </CardText>
                </Form>
              </CardBody>
            </Card>
            <ModalFooter style={popupHeaderStyles}>
              <Button color="success"
                      onClick={this.checkMatch}>Continue</Button>
              <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <div className="container">
            <Card body className="text-center" style={cardStyles}>
              <h3 style={{paddingBottom:'4%'}}>Recover Wallet</h3>
              <form className="needs-validation" onSubmit={this.handleSubmit}>
                <Input
                    type="textarea" name="seed" id="seed" placeholder="Enter your 12-word recovery phrase"  value={this.state.seed} onChange={this.handleChange} style={{border: 'none', color: '#d2d3d5', background: '#40444b'}}/>
                <div style={{paddingTop: '3%'}}>
                  <button type="submit" className="mt-3 btn btn-primary"
                  >Submit</button>
                </div>
              </form>
              <p className={(this.state.feedback === 'Enter a valid seed' || this.state.feedback === 'Please confirm your passwords are written correctly.') ? 'error-message': 'success-message'}
                 style={{marginTop: '20px'}}>{this.state.feedback}</p>
            </Card>
            <div className='d-flex flex-row justify-content-around mt-5'>
              <Link to="/">
                <Button type="button" className="btn btn-primary gbackbutton ">Go back</Button>
              </Link>
            </div>
          </div>
        </div>
    );
  }
}
