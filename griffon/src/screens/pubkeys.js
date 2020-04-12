import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

import RecoveryPhrase from "../components/RecoveryPhrase"


// import { Button, Alert } from 'reactstrap';

export default class PubKey extends React.Component {
  render () {
    return (

      <div className="wrapper">
        
        <Nav/>
        <div className="container">
        <RecoveryPhrase/>
         </div>
        </div>
    );
  }
}
