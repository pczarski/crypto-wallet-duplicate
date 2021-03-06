import React from 'react';
import '../styles/App.scss';
import '../styles/splash.scss';

import Logo from '../assets/Logo.png';

import {Link, Redirect} from 'react-router-dom';

import {Button, Form, FormGroup, Input, FormFeedback} from 'reactstrap';

export default class Splash extends React.Component {
  constructor(props){
    super(props);
    this.state={
      firstLaunch: true,
      password: '',
      redirToWall: null,
      incor: null
    };

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
    this.setState({password: e.target.value})
  }
  handleSubmit(event) {
    
    event.preventDefault();
    if (localStorage.getItem('pass') === document.getElementById("inp").value && document.getElementById("inp").value.length > 0) {
      this.setState({redirToWall: true})
    }
    else {
      this.setState({redirToWall: false, incor: true})
    }
    
  }
  
  render () {
    if (this.state.redirToWall === true) {
      return <Redirect to='/wallet' />
    }

  
    return (
      <div className="wrapper">
        <div className="container">
          <div style={{paddingTop:'5%'}}>
            <img id='logo' src ={Logo} alt = 'logo'/>
          </div>
        <h1 className="title-text" style={{fontSize: '5em'}}>Griffon</h1>
          <div style={{maxWidth: '800px', marginLeft: '15%'}}>
          {!this.state.firstLaunch &&
          <div className="old">
          <Form onSubmit={this.handleSubmit} id="form">
            <FormGroup>
              <Input value={this.state.password} onChange={this.handleChange} invalid={this.state.incor} style={{height: '5vh'}} type="password" name="password" id="inp" placeholder="Enter your password" />
              <FormFeedback tooltip>Password incorrect!</FormFeedback><p></p>
              <Button type="submit" color="primary" size="lg">Open wallet</Button>
                <Link to="/recover">
                  <Button size="lg" >Recover wallet from seed phrase</Button>
                </Link>
                <Link to="/createnew">
                  <Button size="lg">Create a new wallet</Button>
                </Link>
            </FormGroup>
          </Form>
          </div>
          }
          {this.state.firstLaunch && 
          <div className="new">
            <Link to="/createnew">
              <Button type="button" color="primary" size="lg" className="mr-5 btn btn-primary">Create a new wallet</Button>
            </Link>
            <Link to="/recover">
              <Button type="button" className="btn btn-primary" size="lg">Recover wallet from seed phrase</Button>
            </Link>
          </div>
          }
          </div>
        </div>
       </div>
    );
  }
}
