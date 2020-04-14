import React from 'react';

import '../styles/App.scss';

import {Link, Redirect} from 'react-router-dom';
import {
  Card, CardBody, Button, Form, Input, CardText,  Modal, ModalHeader, ModalBody, ModalFooter 
} from 'reactstrap';

import {makeWallet} from "../lib/backendHandler.js"


export default class CreateNew extends React.Component {
  constructor(props){
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.state = {
      seed: null, 
      modal: false,
      pass: '',
      repeat: '',
      pval: null,
      pinval: null,
      redirToWall: false,
      feedback: 'Password must be atleast 8 characters long, and contain atleast 1 capital letter.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(makeWallet(''))
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
    if (e.target.name === 'pass') {
      this.setState({pval: this.passwordValidation()});
    }
  }
    // TO DO: MODAL TO SHOW SEED PHRASE, THEN CONTINUE, // SET PASSWORD FIRST, REPEAT TWICE

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.passwordValidation())
    this.checkMatch()
  }


  toggle() {
    this.setState({modal: !this.state.modal})
  }

  passwordValidation() {
    let password = this.state.pass
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    // console.log)
    if (password.length < 6) {
      this.setState({feedback: "Password must be atleast 8 characters long."})
      return false
    } else if (password.length > 50) {
      this.setState({feedback: "Password must be shorter than 50 characters long."})
      return false
    } else if (password.search(/\d/) === -1) {
      this.setState({feedback: "Password must contain atleast 1 number."});
      return false
    } else if (password.search(/[a-z]/) === -1) {
      this.setState({feedback: "Password must be atleast 1 lowercase character."})
      return false
    } else if (password.search(/[A-Z]/) === -1) {
      this.setState({feedback: "Password must be atleast 1 uppercase character."})
      return false
    } else if (password.search(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/) !== -1) {
      this.setState({feedback: "Password cannot contain symbols."})
      return false
    } else if ((password.search(reg) === 0)) {
      this.setState({feedback: ""})
      return true
    }
  }

  checkMatch() {
    if (this.passwordValidation()) {
      if (this.state.pass === this.state.repeat) {
        localStorage.setItem('pass', this.state.repeat)
        this.setState({seed: makeWallet('').seedPhrase})
        this.toggle()
      } else {
        this.setState({feedback: "Please confirm your passwords are written correctly."})
      }
      
    }
  }
  select (  ) {
    this.setState({redirToWall: true})
  }

  render () {
  if (this.state.redirToWall === true) {
    
    return <Redirect to='/wallet' />
  }
  const Confirm = () => (
  <Modal isOpen={this.state.modal} toggle={this.toggle} className='name'>
    <ModalHeader toggle={this.toggle}>Your seed phrase</ModalHeader>
    <ModalBody>
    Please write down your 12-word seed phrase and keep the copy in a secure place.
    <br/>
    <b>{this.state.seed}</b>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={this.select}>Continue</Button>
      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
  )
    return (
      <div className="wrapper">
        <Confirm />
        <div className="container">
          <h1>Create new Wallet</h1>
          <Card body className="text-center">
            <CardBody>
              <Form className="needs-validation " onSubmit={this.handleSubmit}>
                <div className="vertical-input-group">
                <div className="input-group">
                  <Input valid={this.state.pval} type="password" name="pass" id="password" placeholder="Password" value={this.state.pass} onChange={this.handleChange} className="form-control"/>
                </div>
                <div className="input-group"></div>
                  <Input type="password" name="repeat" id="password" placeholder="Repeat password" value={this.state.repeat} onChange={this.handleChange} className="form-control"/>
                </div>
                <CardText>{this.state.feedback}</CardText>
                <Button type="submit" className="btn btn-primary" onClick={this.handleClick}>Create new wallet</Button>
              </Form>
            </CardBody>
          </Card>
          <div className='d-flex flex-row justify-content-around'>
            <Link to="/">
              <Button type="button" className="btn btn-primary">Go back</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
