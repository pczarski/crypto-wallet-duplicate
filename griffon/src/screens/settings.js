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
  Card,
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
  currentError:null,
  newError:null,
  confirmError:null,
  selected: null,
  confirmError:null

}

export default class Settings extends React.Component {

  constructor() {
    super();
    this.state=initialState
    this.select = this.select.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.Password = this.Password.bind(this);
    this.state.selected = "password";
  }
  handleChange(event) {

   this.setState({
     [event.target.name]:  event.target.value
   });
 };

  validate=()=>{
    // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    let password1= localStorage.getItem('pass');
    console.log(password1);
    let currentError="";
    let newError="";
    let confirmError="";



if (this.state.current != (password1)) {
  currentError="Please make sure your password is correct"
}

if(this.state.new.search(/\d/) === -1){
  newError="Make sure your Password contains atleast 1 number"
}
if(this.state.new.search(/[a-z]/) === -1){
  newError="Make sure your Password contains atleast 1 lowercase letter"
}
if(this.state.new.search(/[A-Z]/) === -1){
  newError="Make sure your Password contains atleast 1 uppercase letter"
}
if(this.state.new.search(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/) !== -1){
  newError="Password cannot contain symbols"
}
if(this.state.new.length<7){
  newError="Make sure your Password is at least 8 characters long"
}
if(this.state.confirm !== this.state.new){
  confirmError="Please make sure your passwords match!";
}

    if (currentError || confirmError || newError){
      this.setState({currentError, confirmError, newError})
      return false;
    }

    return true;
  } //want to end here
  handleSubmit=event=>{
    event.preventDefault();
    const isValid = this.validate();
    if(isValid){
      localStorage.setItem('pass', this.state.confirm)

      this.setState(initialState);
          this.setState({confirmError: 'Password changed!'})
    ;
  }
}
  select (event) {
    this.setState({selected:event.target.name})
  }

  Password() {
    return (
      <div>
      <Card id="pword" body className="text-center bg-dark text-white ">
        <form onSubmit={this.handleSubmit}>
          <h1>Change Password</h1>
          <div>
            <p>Enter your current Password:</p>
            <input type='password' id="inp" name="current" placeholder="Current password" value={this.state.current} onChange={this.handleChange}/>
          </div>
          <div style={{ color:"#f73636"}}>{this.state.currentError}</div>
          <div>
            <p>Enter your new Password:</p>
            <input type='password' id="inp" name="new" placeholder="New password" value={this.state.new} onChange={this.handleChange}/>
          </div>
          <div style={{ color:"#f73636"}}>{this.state.newError}</div>
            <div>
              <p>Confirm your new Password:</p>
              <input type='password' id="inp" name="confirm" placeholder="Confirm password" value={this.state.confirm} onChange={this.handleChange}/>
            </div>
          <div style={{ color:"#f73636"}}>{this.state.confirmError}</div>
         <div className="password">
          <Button type="submit" size="md" className="btn btn-primary">Change Password</Button>
        </div>
        </form>
        </Card>
      </div>
    );
  }

  render () {

    

    let component;
    if (this.state.selected === "publickeys") {
      component = <Keys coin={this.props.coin}
                        coins={this.props.coins}
                        handleCoinClick={this.props.handleCoinClick}
                        />;
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
          <div style={{display: 'flex'}}>
          <Button
              name="password"
              onClick={this.select}
              className= {(this.state.selected === "password") ?
                  "exAcc nav-item notRounded active" : "exAcc nav-item notRounded"}
              id='order' >
              Change Password
          </Button>

              <Button
                  name="publickeys"
                  onClick={this.select}
                  className= {(this.state.selected === "publickeys") ?
                      "exAcc nav-item notRounded active" : "exAcc nav-item notRounded"}
                  id='order' >
                  Keys
              </Button>
              <Button
                  name="recovery"
                  onClick={this.select}
                  className= {(this.state.selected === "recovery") ?
                      "exAcc nav-item notRounded active" : "exAcc nav-item notRounded"}
                  id='order' >
                  Recovery Phrase
              </Button>
              <Button
                  name="addex"
                  onClick={this.select}
                  className= {(this.state.selected === "addex") ?
                      "exAcc nav-item notRounded active" : "exAcc nav-item notRounded"}
                  id='order' >
                  Add Exchange
              </Button>
              <Button
                  name="help"
                  onClick={this.select}
                  className= {(this.state.selected === "help") ?
                      "exAcc nav-item notRounded active" : "exAcc nav-item notRounded"}
                  id='order' >
                  Help
              </Button>

          </div>
            {component}
          </div>
        </div>
    );
  }
}
