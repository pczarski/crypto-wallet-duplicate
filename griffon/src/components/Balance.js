import React from 'react';
import '../styles/App.scss';

import {Converter} from 'easy-currencies';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner} from "reactstrap";


import Select from 'react-select';
import {selectStyles} from "../styles/selectStyles";

import GBP from "../../node_modules/cryptocurrency-icons/svg/white/gbp.svg";
import USD from "../../node_modules/cryptocurrency-icons/svg/white/usd.svg";

import {getIcon} from '../components/walletComponents/Logos';

import { roundTo2,  } from '../lib/helper';
import {getValIn, getCurr} from '../lib/backendHandler'
import Logo from '../assets/Logo.png';
import '../styles/balance.css';



function getCurrencyLabel(name){
  switch (name) {
    case 'BTC':
      return (
          <div>
            <img src={getIcon(name)}/> {name}
          </div>
      );
    case 'LTC':
      return (
          <div>
            <img src={getIcon(name)}/> {name}
          </div>
      );
    case 'DASH':
      return (
          <div>
            <img src={getIcon(name)}/> {name}
          </div>
      );
    case 'USDT':
      return (
          <div>
            <img src={getIcon(name)}/> {name}
          </div>
      );
    case 'ETH':
      return (
          <div>
            <img src={getIcon(name)}/> {name}
          </div>
      );
    case 'GBP':
        return (
            <div>
              <img src={GBP}/> {name}
            </div>
        );
    case 'USD':
      return (
          <div>
            <img src={USD}/> {name}
          </div>
      );
    default:
          return null;

  }
}


export default class Balance extends React.Component {
  

  
  constructor(props) {
    super(props);    
    this.state = {
      supportedCurr: [
      {value: "BTC", label: getCurrencyLabel('BTC')},
      {value: "LTC", label: getCurrencyLabel('LTC')},
      {value: "DASH", label: getCurrencyLabel('DASH')},
      {value: "USDT", label: getCurrencyLabel('USDT')},
      {value: 'GBP', label: getCurrencyLabel('GBP')},
      {value: 'USD', label: getCurrencyLabel('USD')},
      ],
      currency: "BTC",
      obj: {value: "BTC", label: getCurrencyLabel('BTC')},
      totalBal: '0', 
    }
  }

  componentDidMount(){
    this.setState({
      totalBal: getValIn("BTC").value
    })
  }

  async getTotalBal (prev, curr) {
    let converter = new Converter("AlphaVantage", "5FNUAE4662ZHQRRF");
    let totalBal = 0;
    totalBal = await converter.convert(this.state.totalBal, prev, curr);
    this.setState({totalBal: totalBal}
    )
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.currency !== this.state.currency) {
      if (this.state.currency === "GBP" || this.state.currency === "USD") {
        this.getTotalBal(prevState.currency, this.state.currency)
      } else {
        this.setState({totalBal: getValIn(this.state.currency).value})
      }
    }
  }

  render () {
    const choose = (selectedOption) => {
      this.setState({
        currency: selectedOption.value,
        obj: this.state.supportedCurr.find(a => a.value === selectedOption.value)
      })

    };
    return (
    <div className="balance">
        <img id='logo' src ={Logo} alt = 'logo'></img>
        <h1 className="title-text">Griffon</h1>
        <div>
          {isNaN(this.state.totalBal) || this.state.totalBal === '0' ? 
            <Spinner color="light" /> :
            <p>
              {roundTo2(this.state.totalBal) + ""}
            </p>
            }
        </div>
        <div className="currSel">
        <Select className ="react-select-ex currency-select" classNamePrefix="react-select"
          options={this.state.supportedCurr}
          onChange={choose}
          value={this.state.obj}
          styles={selectStyles}
          components={{
            IndicatorSeparator: () => null
          }}
        />
        </div>
    </div>
    )
  }
}
