import React from 'react';
import Navig from '../components/Nav';
import RecoveryPhrase from '../components/RecoveryPhrase';

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
  confirmError:""

}
const userpass="Password123";

export default class Settings extends React.Component {

  state=initialState;
  constructor() {
    super();
    this.state={selected: null}
    this.select = this.select.bind(this);
}
  handleChange = event=>{
    const isCheckbox = event.target.type === "checkbox";
   this.setState({
     [event.target.name]: isCheckbox
       ? event.target.checked
       : event.target.value
   });
 };
  validate=()=>{
    // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    let password1= userpass;
    let currentError="";
    let newError="";
    let confirmError="";
    if(!this.state.current.includes(password1)){
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
    console.log(this.state)
    this.setState(initialState);
  }
}
  select (event) {
    this.setState({selected:event.target.name})
    console.log(this.state.selected)
  }

  render () {
    const Password = () => (
      <div className="extra">
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
    const PubKey = () => (
      <div>
        <h1>Public Key</h1>
        <Keys/>
        </div>
    );
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
            <NavLink onClick={this.select} name="help">
              Help
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
  );

  let component;
  if (this.state.selected === "publickeys") {
    component = <PubKey />;
  } else if (this.state.selected === "recovery") {
    component = <RecoveryPhrase/>;
  }
  else if (this.state.selected === "help") {
    component = <Help/>;
  } else {
    component = <Password/>;
  }
  return (
    <div className="wrapper">

      <Navig/>

      <div className="container">
          <div className="content">
      <Topbar/>
      {component}
      </div>
      </div>
    </div>
    );
  }
}
