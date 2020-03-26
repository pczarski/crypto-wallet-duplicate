import React from 'react';
import './styles/App.scss';

import Splash from './screens/splash';
import Wallet from './screens/wallet';
import CreateNew from './screens/createnew';
import Recover from './screens/recover';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Exchange from './screens/exchange';




export default class App extends React.Component {
  render() {

    localStorage.setItem('name', null)
    localStorage.setItem('balance', null)

    return (
      <Router>
        <div className="App">
        <Switch>
          <Route path="/" exact component={Splash}/>
          <Route path="/wallet" component={Wallet}/>
          <Route path="/createnew" component={CreateNew}/>
          <Route path="/recover" component={Recover}/>
          <Route path="/exchange" component={Exchange}/>
        </Switch>
        </div>
      </Router>
    );
  }
}
