import React from 'react';
import '../styles/App.scss';
import { Button } from "reactstrap";

import CurrSel from '../components/common/currencySelect'

import Transactions from '../components/Transactions';
import Receive from '../components/Receive';
import Send from '../components/Send';
import Nav from '../components/Nav';
import { Redirect } from 'react-router-dom';

export default class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      dropdownOpen: false,
      selected: this.props.coin,
      change: false,
      choice: 0,
      renderTrans: true,
      redirToWall: false,
    }

  }

  handleClick(e) {
    this.setState({
      choice: e.currentTarget.value
    });
    if (e.target.value == null) {
      this.setState({ 
        renderTrans: true
      });
    } else {
      this.setState({
        renderTrans: false
      });
      return;
    }
    if (this.state.renderTrans === true) {
      this.setState({
        redirToWall: true
      });
    }
  }

  
  render () {
    if(this.props.coins == null || this.state.redirToWall === true){
      // if wallet wasn't rendered, we shouldn't even be here
      return <Redirect to="/wallet"/>
    }

    let component;
    if (this.state.choice === "1") {
      console.log(this.state)
      component = <Send 
                  curr={this.props.coin} 
                  />;
    } else  if (this.state.choice === "2") {
      component = <Receive curr={this.props.coin}/>
    } else {
      component = <Transactions curr={this.props.coin} />;
    }


    return (
      <div className="wrapper">
      <Nav/>
        <div className="cont">
          <Button close type="button" id="back" className="btn btn-primary m-2" onClick={this.handleClick} value="0" style={{position: 'relative', zIndex: '1000'}}/>
          <CurrSel coin={this.props.coin} coins={this.props.coins} setCoin={this.props.handleCoinClick}/>
          <Button className="btn btn-primary" size="lg" onClick={this.handleClick} value="1" style={{width: '50%', float:'left'}}>Send Currency</Button>
          <Button className="btn btn-primary" size="lg" onClick={this.handleClick} value="2" style={{width: '50%'}}>Receive Currency</Button>
          {component}

        </div>
      </div>
    );
  }
}

 
