import React from 'react';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

import SelectCurr from '../components/common/currencySelect'

import {getCurr} from '../lib/backendHandler.js';
import {Table} from 'reactstrap';

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
        <h1>Keys</h1>
        {this.props.coins !== null && <SelectCurr coin={this.props.coin} coins={this.props.coins} setCoin={this.props.handleCoinClick}/>}
        <div>
                 <Table id="simple-board" size="sm" className="table table-striped table-hover table-dark">
                   <thead>
                   <tr>
                    <th>#</th>
                    <th>Private Keys</th>
                    <th>Public Keys</th>
                    <th>Balance</th>
                   </tr>
                   </thead>
                   <tbody>
                    {this.getTable()}
                    </tbody>
                   </Table>
                </div>
           </div>
    );
  }
}
