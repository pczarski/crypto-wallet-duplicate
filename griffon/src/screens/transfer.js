import React from 'react';
import '../styles/App.scss';
import { Button } from "reactstrap";

import CurrSel from '../components/common/currencySelect'

import Transactions from '../components/Transactions';
import Receive from '../components/Receive';
import Send from '../components/Send';
import Nav from '../components/Nav';
import { Redirect } from 'react-router-dom';
import MenuButton from "../components/common/menuButton";

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

  handleClick = (e) => {
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
  };

  render () {
    if(this.props.coins == null || this.state.redirToWall === true){
      // if wallet wasn't rendered, we shouldn't even be here
      return <Redirect to="/wallet"/>
    }

    let component;
    if (this.state.choice === "1") {
      component = <Send
          curr={this.props.coin}
      />;

    } else  if (this.state.choice === "2") {
      component = <Receive curr={this.props.coin}/>
    } else {
      component = <Transactions curr={this.props.coin} />;
    }

    const active = this.state.choice;
    return (
        <div className="wrapper">
          <Nav/>
          <div className="cont">

            <Button close type="button" size='md'
                    id="back" className="btn btn-primary m-2" onClick={this.handleClick} value="0" style={{}}/>

            <div style=
                     {{display: 'flex',
                       'paddingTop':'32px',
                     }}
            >
              <div style={{width: '200px', marginLeft: '1%'}}>
                <CurrSel className ="react-select-ex" classNamePrefix="react-select"
                         coin={this.props.coin} coins={this.props.coins} setCoin={this.props.handleCoinClick}/>
              </div>

              <div value="1"
                  style={{'marginRight': '5%', 'marginLeft': '5%',}}>
                <MenuButton
                    text={'Send Currency'}
                    active={(active === "1")}
                    onClick={this.handleClick}
                    value="1"
                />
              </div>

              <div style={{}}>
                <MenuButton
                    text={'Receive Currency'}
                    active={(active === "2")}
                    onClick={this.handleClick}
                    value="2"
                />
              </div>
            </div>

            <div style={{'paddingTop':'32px',}}>
              {component}
            </div>


          </div>
        </div>
    );
  }
}


