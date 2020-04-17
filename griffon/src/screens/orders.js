import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';

import {Button} from 'reactstrap';

import Buy from '../components/Buy';
import Withdraw from '../components/Withdraw';
import Deposit from '../components/Deposit';

export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      address:null,
      name: null,
      response: "0",
      choice:''
    }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
          this.handleClick2 = this.handleClick2.bind(this);
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  handleClick(event) {
    this.setState({
      choice:'1'
    });

    event.preventDefault();
  }
  handleClick1(event) {
    this.setState({
      choice:'2'
    });

    event.preventDefault();
  }
  handleClick2(event) {
    this.setState({
      choice:'3'
    });

    event.preventDefault();
  }
  render () {
    let component;
    if (this.state.choice === "1") {
      component = <Buy name={this.state.name}/>;
    }else if (this.state.choice ==="2") {

        component = <Withdraw name={this.state.name}/>;
    }
    else if (this.state.choice ==="3") {

        component = <Deposit name={this.state.name}/>;
    }

    return (
      <div className="wrapper">
      <Nav />
        <div className="cont">
          <h2> Withdraw/Deposit from Exchange</h2>
          <Button onClick={this.handleClick1} >Withdraw</Button><Button onClick={this.handleClick} >Make Order</Button><Button onClick={this.handleClick2} >Deposit</Button>
          
        {component}
        </div>


        {<p>Response: {this.state.response}</p> && (!this.state.response == null)}
      </div>
    );
  }
}
