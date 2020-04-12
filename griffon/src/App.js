import React from 'react';
import './styles/App.scss';

import Splash from './screens/splash';
import Wallet from './screens/wallet';
import CreateNew from './screens/createnew';
import Recover from './screens/recover';
import Help from './screens/help';
import Settings from './screens/settings';
import Exchange from './screens/exchange';
import Transfer from './screens/transfer';
import OrderHistory from './screens/orderHistory';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


export default class App extends React.Component {
  render() {

    return (
      <Router>
        <div className="App">
        <Switch>
          <Route path="/" exact component={Splash}/>
          <Route path="/wallet" render={(props) => <Wallet {...props} />}/>
          <Route path="/createnew" render={(props) => <CreateNew {...props} />}/>
          <Route path="/recover" render={(props) => <Recover {...props} />}/>
          <Route path="/exchange" render={(props) => <Exchange {...props} />}/>
          <Route path="/help" render={(props) => <Help {...props} />}/>
          <Route path="/settings" render={(props) => <Settings {...props} />}/>
          <Route path="/transfer" render={(props) => <Transfer {...props} />}/>
          <Route path='/ExchangeAccess' render ={(props) => <ExchangeAccess {...props}/>}/>
          <Route path="/OrderHistory" render={(props) => <OrderHistory {...props} />}/>
        </Switch>
        </div>
      </Router>
    );
  }
}
