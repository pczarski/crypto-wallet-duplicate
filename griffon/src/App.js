import React from 'react';
import './styles/App.scss';

import Splash from './screens/splash';
import Wallet from './screens/wallet';
import CreateNew from './screens/createnew';
import Recover from './screens/recover';

import Settings from './screens/settings';
import Trade from './components/exchange/trade';
import Transfer from './screens/transfer';

import ExchangeAccess from './screens/ExchangeAccess';
import $ from 'jquery';
import {getIcon} from "./components/walletComponents/Logos";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import BinanceIcon from './assets/binance.png';
import CoinbaseIcon from './assets/coinbase.png';

// a dictionary to store all the supported exchanges, so that we can easily dynamically add more later on
// please use if you need to have a list of all the exchanges. Object.keys(exchangeList) will return ['Binance', 'Coinbase']
const exchangeList = [
  {value: 'Binance', label: getExchangeLabel('Binance')},
  {value: 'Coinbase', label: getExchangeLabel('Coinbase')},
];

function getExchangeLabel(name){
  switch (name) {
    case 'Binance':
      return (
          <div>
            <img src={BinanceIcon}/> {name}
          </div>
      );
    case 'Coinbase':
      return (
          <div>
            <img src={CoinbaseIcon}/> {name}
          </div>
      );
    default:
          return null;

  }
}

// used to control what's displayed in exchange access page and it's children components
export const PORTFOLIO = 0;
export const ORDERS = 1;
export const COINS = 2;
export const TRADE = 3;

// used to control trade display
export const BUY = 4;
export const SELL = 5;
export const WITHDRAW = 6;
export const DEPOSIT = 7;
export const SWAP = 8;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    //this.setExchange = this.setExchange.bind(this);
    // Keep all the states the need to be shared across the app here, and pass them as props where necessary
    this.state =  {
      // - to render coins info on wallet and exchange
      walletCoins: null,
      exchangeCoins: null,

      // to save the selected exchange access
      exchangeAccess: exchangeList[0],

      // to save whether the user was on coins tab or order history tab
      exchangeMainComponent: PORTFOLIO,

      walletCoin: "BTC",
      exchangeCoin: "BTC",
      exchangeCoin2: "ETH",

      // exchange Access portfolio
      selectedInPortfolio: COINS,

      tradeMainComponent: SWAP,

      price: 0,
      marketPrice: 0,

      amount: 0,
      amount2: 0,
    };
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

  // sets the walletCoins state member to data passed by an ajax call and adds icon property
  updateWalletCoins = (data) => {
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

  // will update the state to the passed exchange and fetch coins once done
  setExchange = (selectedExchange) => {
    this.setState({
      exchangeAccess: selectedExchange,
    }, this.fetchExchangeCoins);
  };


  // will update the exchangeCoins to selected exchange coins
  fetchExchangeCoins = () => {
    const exchangeName = this.state.exchangeAccess.value;
    const url = "http://localhost:8080/exchange-currencies?exchange="+exchangeName;
    $.ajax({
      url: url,
      //dataType: "json",
      success: this.updateExchangeCoins,
    });
  };

  // sets the coins state member to data passed by an ajax call and adds the icon property
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
    }, this.fetchPriceIn);
    this.updateSelectedInPortfolio(TRADE)
  };

  updateExchangeCoin2 = (coin) => {
    this.setState({
      exchangeCoin2: coin,
    }, this.fetchPriceIn);
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

  updateSelectedInTrade = (option) => {
    this.setState({
      tradeMainComponent: option,
    })
  };

  setPrice = (price) => {
    this.setState({
      price: price,
    });
  };

  setAmount = (amount) => {
    this.setState({
      amount: amount,
    });
  };

  setAmount2 = (amount) => {
    this.setState({
      amount2: amount
    });
  };

  fetchPriceIn = () => {
    const url =
        "http://localhost:8080/exchange-price-in?exchange="+
        this.state.exchangeAccess.value+"&base="+this.state.exchangeCoin+
        "&in="+this.state.exchangeCoin2;
    console.log(url);
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: this.setMarketPrice,
    });
  };

  setMarketPrice = (newPrice) => {
    this.setState({
      marketPrice: newPrice.value,
    },() => this.setPrice(this.state.marketPrice));
  };


  render() {

    const walletCoin = this.state.walletCoin;
    const walletCoins = this.state.walletCoins;

    const exchangeCoins = this.state.exchangeCoins;
    const exchangeCoin = this.state.exchangeCoin;
    const exchangeCoin2 = this.state.exchangeCoin2;
    const selectedInPortfolio = this.state.selectedInPortfolio;
    const tradeMainComponent = this.state.tradeMainComponent;
    const price = this.state.price;
    const marketPrice = this.state.marketPrice;
    const amount = this.state.amount;
    const amount2 = this.state.amount2;

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
                      {...props} coin = {exchangeCoin} coin2 = {exchangeCoin2}
                      coins={exchangeCoins} fetch={this.fetchExchangeCoins /* for updating state.coins to exchange coins*/}
                      setExchange = {this.setExchange}
                      exchanges={exchangeList /* for rendering a list of exchanges*/}
                      exchange={this.state.exchangeAccess /* so that we can show which exchange was selected in the dropdown*/ }
                      mainComponent={this.state.exchangeMainComponent /*so that the user continues on the tab they left off*/}
                      setMainComponent={this.setExchangeMainComponent}
                      handleCoinClick={this.updateExchangeCoin}
                      selectedInPortfolio={selectedInPortfolio}
                      setSelectedInPortfolio={this.updateSelectedInPortfolio}
                      tradeMainComponent={tradeMainComponent}
                      setTradeMainComponent={this.updateSelectedInTrade}
                      setCoin2={this.updateExchangeCoin2}
                      price={price} setPrice={this.setPrice}
                      marketPrice={marketPrice}
                      setMarketPrice={this.setMarketPrice}
                      amount={amount} setAmount={this.setAmount}
                      amount2={amount2} setAmount2={this.setAmount2}
                      walletCoins={walletCoins}
                  />}/>

              <Route path="/exchange" render={
                (props) => <Trade
                    {...props} coin={exchangeCoin}
                    coins={exchangeCoins}
                />}/>

              <Route path="/createnew" render={(props) => <CreateNew {...props} />}/>
              <Route path="/recover" render={(props) => <Recover {...props} />}/>
              <Route path="/settings" render={
                (props) => <Settings 
                {...props} coin={walletCoin}
                coins={walletCoins}
                handleCoinClick={this.updateWalletCoin}/>}
                />
              {/*TODO: all those should be integrated in the exchange instead of being separate pages*/}
            </Switch>
          </div>
        </Router>
    );
  }
}
