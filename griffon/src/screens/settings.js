import React from 'react';
import Navig from '../components/Nav';

import RecoveryPhrase from '../components/RecoveryPhrase';
import AddEx from '../components/AddExchange';

import Keys from '../screens/keys';
import Help from '../components/Help';

import '../styles/nav.scss';
import '../styles/App.scss';

import '../styles/bal.scss';
import '../styles/settings.scss';

// import RecoveryPhrase from '../components/RecoveryPhrase';

import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const initialState ={
  current:"",
  new:"",
  confirm:"",
  currentError:"",
  newError:"",
  confirmError:"",
  selected: null

}

export default class Settings extends React.Component {

  constructor() {
    super();
    this.state=initialState
    this.select = this.select.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.Password = this.Password.bind(this);
}
  handleChange(event) {
    console.log(this.state)
   this.setState({
     [event.target.name]:  event.target.value
   });
 };

  validate=()=>{
    // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    let password1= localStorage.getItem('password');
    let currentError="";
    let newError="";
    let confirmError="";
    if(!this.state.current === (password1)){
      currentError="Password is not correct!";
    }
    if(this.state.confirm!==""){
    if(this.state.confirm !== this.state.new){
      confirmError="Please make sure your passwords match!";

    }
    }
    if(this.state.new === "" || this.state.new.length <8){
      newError="Password should contain atleast 8 characters, one capital letter and one digit";
  }


    if (currentError || confirmError || newError){
      this.setState({currentError, confirmError, newError})
      return false;
    }

    return true;
  }
  handleSubmit=event=>{
    event.preventDefault();
    const isValid = this.validate();
    if(isValid){
      localStorage.setItem('pass', this.state.confirm)
      this.setState(initialState);
      this.setState({confirmError: 'Password changed!'});
  }
}
  select (event) {
    this.setState({selected:event.target.name})
  }

  Password() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Change Password</h1>
          <div>
            <p>Enter your current Password:</p>
            <input type='password' name="current" placeholder="Current password" value={this.state.current} onChange={this.handleChange}/>
          </div>
          <div style={{ color:"#f73636"}}>{this.state.currentError}</div>
          <div>
            <p>Enter your new Password:</p>
            <input type='password' name="new" placeholder="New password" value={this.state.new} onChange={this.handleChange}/>
          </div>
          <div style={{ color:"#f73636"}}>{this.state.newError}</div>
            <div>
              <p>Confirm your new Password:</p>
              <input type='password' name="confirm" placeholder="Confirm password" value={this.state.confirm} onChange={this.handleChange}/>
            </div>
          <div style={{ color:"#f73636"}}>{this.state.confirmError}</div>
         <div className="password">
          <Button type="submit" size="md" className="btn btn-primary">Change Password</Button>
        </div>
        </form>
      </div>
    );
  }

  render () {

    const Topbar = () => (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>Settings</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem  >
            <NavLink onClick={this.select} name="password">
              Password
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.select} name="publickeys">
              Public Keys
            </NavLink>
          </NavItem>
          <NavItem >
            <NavLink onClick={this.select} name="recovery">
              Recovery Phrase
            </NavLink>
          </NavItem>
          <NavItem >
            <NavLink onClick={this.select} name="addex">
              Add Exchange
            </NavLink>
          </NavItem>
          <NavItem >
            <NavLink onClick={this.select} name="help">
              Help
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
  );

  let component;
  if (this.state.selected === "publickeys") {
    component = <Keys/>;
  } else if (this.state.selected === "recovery") {
    component = <RecoveryPhrase/>;
  }
  else if (this.state.selected === "help") {
    component = <Help/>;
  } else if (this.state.selected === "addex"){
    component = <AddEx />;
  } else {
    component = this.Password();
  }
  return (
    <div className="wrapper">
      <Navig/>
      <div className="cont">
      <Topbar/>
      {component}
      </div>
    </div>
    );
  }
}
