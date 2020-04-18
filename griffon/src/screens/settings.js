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
  isError: false, // used for conditional rendering of the feedback message
};

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state=initialState;
    this.select = this.select.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Password = this.Password.bind(this);
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
    if(this.state.new.length<7){
      newError="Make sure your Password is at least 8 characters long"
    }
    if(this.state.confirm !== this.state.new){
      confirmError="Please make sure your passwords match!";
    }

    if (currentError || confirmError || newError){
      this.setState({currentError, confirmError, newError});
      this.setState({
        isError: true,
      });
      return false;
    }

    this.setState({
      isError: false,
    });
    return true;
  }; //want to end here
  handleSubmit=event=>{
    event.preventDefault();
    const isValid = this.validate();
    if(isValid){
      localStorage.setItem('pass', this.state.confirm)

      this.setState(initialState);
      this.setState({confirmError: 'Password changed!'})
      ;
    }
  };
  select (event) {
    this.setState({selected:event.target.name})
  }

  Password() {
    const isError = this.state.isError;
    return (
        <div>
          <Card id="pword" body className="text-center bg-dark text-white ">
            <form onSubmit={this.handleSubmit}>
              <h1>Change Password</h1>
              <div>
                <p>Enter your current Password:</p>
                <input type='password' id="inp" name="current" placeholder="Current password" value={this.state.current} onChange={this.handleChange}/>
              </div>
              <div className={'error-message'}>{this.state.currentError}</div>
              <div>
                <p>Enter your new Password:</p>
                <input type='password' id="inp" name="new" placeholder="New password" value={this.state.new} onChange={this.handleChange}/>
              </div>
              <div className={'error-message'}>{this.state.newError}</div>
              <div>
                <p>Confirm your new Password:</p>
                <input type='password' id="inp" name="confirm" placeholder="Confirm password" value={this.state.confirm} onChange={this.handleChange}/>
              </div>
              <div className={(isError) ? 'error-message' : 'success-message'}>
                {this.state.confirmError}
              </div>
              <div className="password">
                <Button type="submit" size="md" className="btn btn-primary">Change Password</Button>
              </div>
            </form>
          </Card>
        </div>
    );
  }

  render () {

    const Topbar = () => (
        <Navbar color="dark" dark expand="md">
          <NavbarBrand id="brand">Settings</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem  >
              <NavLink  href="# " onClick={this.select} name="password">
                Password
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="# "  onClick={this.select} name="publickeys">
                Public Keys
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="# " onClick={this.select} name="recovery">
                Recovery Phrase
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="# " onClick={this.select} name="addex">
                Add Exchange
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink    href="# " onClick={this.select} name="help">
                Help
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
    );

    let component;
    if (this.state.selected === "publickeys") {
      console.log(this.props);
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
            <Topbar/>
            {component}
          </div>
        </div>
    );
  }
}
