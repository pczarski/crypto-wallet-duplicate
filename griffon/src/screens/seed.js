import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

import RecoveryPhrase from "../components/RecoveryPhrase"


import {getSeed} from '../lib/backendHandler.js';
// import { Button, Alert } from 'reactstrap';

export default class Seed extends React.Component {

  getSeed(){
      let seed = getSeed()
      console.log(seed)

      return <p>{seed.seedPhrase}</p>
    }



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
