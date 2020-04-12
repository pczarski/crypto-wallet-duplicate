import React from 'react';
import Nav from '../components/Nav';

import Topbar from '../components/Topbar';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

// import RecoveryPhrase from '../components/RecoveryPhrase';

import {Link} from 'react-router-dom';

import { Button } from 'reactstrap';

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
  constructor() {
    super();
}
  state=initialState;
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
  render () {
    return (
      <div className="wrapper">
          <Nav/>
          <nav className="navbar 1">
          <h1>Settings</h1>
           <ul id="nav1">
            <li id="active">Change Password</li>
            <Link to="/pubkeys">
              <li>>Public Keys</li>
            </Link>
           </ul>
           </nav>
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


         </div>
    );
  }
}
