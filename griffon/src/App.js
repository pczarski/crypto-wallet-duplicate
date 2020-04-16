import React from 'react';
import './styles/App.scss';

import Splash from './screens/splash';
import Wallet from './screens/wallet';
import CreateNew from './screens/createnew';
import Recover from './screens/recover';

import Settings from './screens/settings';
import Exchange from './screens/exchange';
import Transfer from './screens/transfer';
import Order from './screens/order';
import Orders from './screens/orders';

import ExchangeAccess from './screens/ExchangeAccess';
import $ from 'jquery';
import {getIcon} from "./components/walletComponents/Logos";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// a dictionary to store all the supported exchanges, so that we can easily dynamically add more later on
// please use if you need to have a list of all the exchanges. Object.keys(exchangeList) will return ['Binance', 'Coinbase']
const exchangeList = {"Binance": "Binance", "Coinbase": "Coinbase"};
export const PORTFOLIO = 0;
export const ORDERS = 1;
export const COINS = 2;
export const TRADE = 3;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Keep all the states the need to be shared across the app here, and pass them as props where necessary
    this.state =  {
      // - to render coins info on wallet and exchange
      walletCoins: null,
      exchangeCoins: null,

      // to save the selected exchange access
      exchangeAccess: exchangeList.Binance,

      // to save whether the user was on coins tab or order history tab
      exchangeMainComponent: PORTFOLIO,

      walletCoin: "BTC",
      exchangeCoin: "BTC",

      // exchange Access portfolio
      selectedInPortfolio: COINS,
    }
  }

  /** wallet functions: **/

  // will update the coins to wallet coins
  fetchWalletCoins = () => {
    const url = "http://localhost:8080/all-coins";
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: this.updateWalletCoins,
    });
  };

  // sets the coins state member to data passed by an ajax call and adds icon property
  updateWalletCoins = (data) => {
    this.setState({
      walletCoins: null,
    });
    let coins = data;
    for(let i = 0; i < data.length; i++) {
      coins[i].icon = getIcon(coins[i].code);
    }
    this.setState({
      walletCoins: coins,
    });
  };

  updateWalletCoin = (coin) => {
    this.setState({
      walletCoin: coin,
    });
  };

  /** Exchange functions **/

  // will update the state to the passed exchange
  setExchange = (exchangeName) => {
    this.setState({
      exchangeAccess: exchangeList[exchangeName],
    });
    console.log(this.state.exchangeAccess);
    this.fetchExchangeCoins();
  };

  // will update the coins to selected exchange coins
  fetchExchangeCoins = () => {
    const exchangeName = this.state.exchangeAccess;
    const url = "http://localhost:8080/exchange-currencies?exchange="+exchangeName;
    $.ajax({
      url: url,
      //dataType: "json",
      success: this.updateExchangeCoins,
    });
  };

  // sets the coins state member to data passed by an ajax call and adds icon property
  updateExchangeCoins = (data) => {
    let coins = data;
    for(let i = 0; i < data.length; i++) {
      coins[i].icon = getIcon(coins[i].code);
    }
    this.setState({
      exchangeCoins: coins,
    });
  };

  updateExchangeCoin = (coin) => {
    this.setState({
      exchangeCoin: coin,
    });
    this.updateSelectedInPortfolio(TRADE)
  };

  // updates the exchange main component
  setExchangeMainComponent = (option) => {
    this.setState({
      exchangeMainComponent: option,
    })
  };

  updateSelectedInPortfolio = (option) => {
    this.setState({
      selectedInPortfolio: option,
    });
  };

  render() {

    const walletCoin = this.state.walletCoin;
    const walletCoins = this.state.walletCoins;

    const exchangeCoins = this.state.exchangeCoins;
    const exchangeCoin = this.state.exchangeCoin;
    const selectedInPortfolio = this.state.selectedInPortfolio;

    return (
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" exact component={Splash}/>

              <Route path="/wallet" render={
                (props) => <Wallet
                    {...props} coins={walletCoins}
                    fetch={this.fetchWalletCoins /* for updating to wallet coins once component renders*/}
                    handleCoinClick={this.updateWalletCoin}
                  />}/>

              <Route path="/transfer" render={
                (props) => <Transfer
                    {...props} coin={walletCoin}
                    coins={walletCoins}
                    handleCoinClick={this.updateWalletCoin}
                />}/>

              <Route path='/ExchangeAccess' render={
                (props) => <ExchangeAccess
                      {...props} coin = {exchangeCoin}
                      coins={exchangeCoins} fetch={this.fetchExchangeCoins /* for updating state.coins to exchange coins*/}
                      setExchange = {this.setExchange} exchanges={exchangeList /* for rendering a list of exchanges*/}
                      exchange={this.state.exchangeAccess /* so that we can show which exchange was selected in the dropdown*/ }
                      mainComponent={this.state.exchangeMainComponent /*so that the user continues on the tab they left off*/}
                      setMainComponent={this.setExchangeMainComponent}
                      handleCoinClick={this.updateExchangeCoin}
                      selectedInPortfolio={selectedInPortfolio}
                      setSelectedInPortfolio={this.updateSelectedInPortfolio}
                  />}/>

              <Route path="/exchange" render={
                (props) => <Exchange
                    {...props} coin={exchangeCoin}
                    coins={exchangeCoins}
                />}/>

              <Route path="/orders" render={
                (props) => <Orders
                    {...props} coin={exchangeCoin}
                    coins={exchangeCoins}
                />}/>

              <Route path="/createnew" render={(props) => <CreateNew {...props} />}/>
              <Route path="/recover" render={(props) => <Recover {...props} />}/>
              <Route path="/settings" render={(props) => <Settings {...props} />}/>
              {/*TODO: all those should be integrated in the exchange instead of being separate pages*/}
              <Route path="/order" render={(props) => <Order {...props} />}/>
            </Switch>
          </div>
        </Router>
    );
  }
}
