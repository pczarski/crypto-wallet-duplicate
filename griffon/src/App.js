import React from 'react';
import './styles/App.scss';
import Splash from './screens/splash';
import Wallet from './screens/Wallet';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateNew from './screens/createnew';
import Recover from './screens/recover';

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/" exact component={Wallet}/>
        <Route path="/Wallet" component={Wallet}/>
        <Route path="/createnew" component={CreateNew}/>
        <Route path="/recover" component={Recover}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
