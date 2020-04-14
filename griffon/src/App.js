import React from 'react';
import './styles/App.scss';

import Splash from './screens/splash';
import Wallet from './screens/wallet';
import CreateNew from './screens/createnew';
import Recover from './screens/recover';

import Settings from './screens/settings';
import Exchange from './screens/exchange';
import Transfer from './screens/transfer';
import OrderHistory from './screens/orderHistory';
import Order from './screens/order';
import Orders from './screens/orders';
import Buy from './screens/Buy';
import ExchangeAccess from './screens/ExchangeAccess';
import $ from 'jquery';
import {getIcon} from "./components/walletComponents/Logos";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      coins: null,
    }
  }

  // will update the coins to wallet coins
  fetchWalletCoins = () => {
    console.log("fetching coins");
    const url = "http://localhost:8080/all-coins";
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: this.updateCoins,
    });
  };

  // will update the coins to selected exchange coins
  fetchExchangeCoins = (exchangeName) => {
    console.log("fetching coins");
    const url = "http://localhost:8080/exchange-currencies?exchange="+exchangeName;
    $.ajax({
      url: url,
      //dataType: "json",
      success: this.updateCoins,
    });
  };


  // sets the coins member to data passed by a ajax call and adds icon property
  updateCoins = (data) => {
    this.setState({
      coins: null,
    });
    console.log("updating coins");
    console.log(data);
    let coins = data;
    for(let i = 0; i < data.length; i++) {
      coins[i].icon = getIcon(coins[i].code);
    }
    this.setState({
      coins: coins,
    });
    console.log(this.state.coins);
  };

  render() {

    const coins = this.state.coins;

    return (
      <Router>
        <div className="App">
        <Switch>
          <Route path="/" exact component={Splash}/>

          <Route path="/wallet" render=
              {(props) => <Wallet {...props} coins={coins} fetch={this.fetchWalletCoins}/>}
          />

          <Route path='/ExchangeAccess' render =
              {(props) => <ExchangeAccess coins={coins} fetch={this.fetchExchangeCoins}/>}
          />

          <Route path="/exchange" render=
              {(props) => <Exchange {...props}/>}
          />

          <Route path="/createnew" render={(props) => <CreateNew {...props} />}/>
          <Route path="/recover" render={(props) => <Recover {...props} />}/>
          <Route path="/settings" render={(props) => <Settings {...props} />}/>
          <Route path="/transfer" render={(props) => <Transfer {...props} />}/>
          <Route path="/OrderHistory" render={(props) => <OrderHistory {...props} />}/>
          <Route path="/order" render={(props) => <Order {...props} />}/>
          <Route path="/orders" render={(props) => <Orders {...props} />}/>
          <Route path="/Buy" render={(props) => <Buy {...props} />}/>
        </Switch>
        </div>
      </Router>
    );
  }
}
