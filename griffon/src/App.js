import React from 'react';
import './styles/App.css';
import Splash from './screens/splash';
import Wallet from './screens/Wallet';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateNew from './screens/createnew';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/" exact component={Splash}/>
        <Route path="/Wallet" component={Wallet}/>
        <Route path="/createnew" component={CreateNew}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
