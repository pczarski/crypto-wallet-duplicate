import React from 'react';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

import SelectCurr from '../components/common/currencySelect'

import {getCurr} from '../lib/backendHandler.js';


export default class Keys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supportedCurr: this.props.coins,
      currency: this.props.coin, // currency name (bitcoin, litecoin, etc. btc by default)
      keyPairs: getCurr("BTC").keyPairs,
      publickeys: [],
      privatekeys: [],
      gotKeys: false,
      dropdownOpen: false
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.coin !== this.props.coin){
      this.setState({
        keyPairs: getCurr(this.props.coin).keyPairs
      })
    }
  }

  getTable(){
    return Object.keys(this.state.keyPairs).map((item, i) => {
        return (
          <tr key={i}>
            <td>{item}</td>
            <td>{this.state.keyPairs[item].publicKey}</td>
            <td>{this.state.keyPairs[item].privateKey}</td>
            <td>{this.state.keyPairs[item].balance}</td>
          </tr>
          )
        });
      }



  render () {
    return ( 
      <div>
        <h1 style={{color: '#b9bbbe'}}>Keys</h1>
        {this.props.coins !== null && <SelectCurr coin={this.props.coin} coins={this.props.coins} setCoin={this.props.handleCoinClick}/>}
        <div>
                 <table>
                   <thead>
                   <tr>
                    <th className='header'>#</th>
                    <th className='header'>Private Keys</th>
                    <th className='header'>Public Keys</th>
                    <th className='header'>Balance</th>
                   </tr>
                   </thead>
                   <tbody>
                    {this.getTable()}
                    </tbody>
                   </table>
                </div>
           </div>
    );
  }
}
