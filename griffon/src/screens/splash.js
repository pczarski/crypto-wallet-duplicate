import React from 'react';
import '../styles/App.scss';

import {Link, Redirect} from 'react-router-dom';

import {Button, Form, FormGroup, Input, FormFeedback} from 'reactstrap';

export default class Splash extends React.Component {
  constructor(){
    super();
    this.state={
      firstLaunch: true,
      password: '',
      redirToWall: null,
      incor: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    if (localStorage.getItem('firstLaunch') === 'false') {
      this.setState({firstLaunch: false})
    } else {
      this.setState({firstLaunch: true})
      localStorage.setItem('firstLaunch', 'false')
    }
  }
  
  handleChange(e) {
    // console.log(e.target.value)
    this.setState({password: e.target.value})
  }
  handleSubmit(event) {
    if (localStorage.getItem('pass') === document.getElementById("password").value) {
      this.setState({redirToWall: true})
    }
    else {
      this.setState({redirToWall: false, incor: true})
    }
    
    event.preventDefault();
  }
  
  render () {
    if (this.state.redirToWall === true) {
      return <Redirect to='/wallet' />
    }

  
    return (
      <div className="wrapper">
        <div className="container">
          <h1>griffon</h1>
          <div>
          {!this.state.firstLaunch &&
          <Form onSubmit={this.handleSubmit} id="form">
            <FormGroup>
              <Input value={this.state.password} onChange={this.handleChange} invalid={this.state.incor} type="password" name="password" id="password" placeholder="Enter your password" />
              <FormFeedback>Password incorrect!</FormFeedback>
              <Button type="submit" size="lg" className="btn btn-primary">Open wallet</Button>
            </FormGroup>
          </Form>
          }
          <Link to="/recover">
            <Button type="button" size="lg" className="btn btn-primary">Recover wallet from seed phrase</Button>
          </Link>
          <Link to="/createnew">
            <Button type="button" size="lg" className="btn btn-primary">Create a new wallet</Button>
          </Link>
          </div>
        </div>
      // </div>
    );
  }
}
