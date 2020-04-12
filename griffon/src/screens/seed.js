import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';


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
          <nav className="navbar 1">
          <h1>Settings</h1>
           <ul id="nav1">
       <Link to="/">
               <li >Home</li></Link>
                <Link to="/settings">
               <li >Change Password</li></Link>
               <Link to="/keys">
                     <li>>View Keys</li>
               </Link>
               <li id="active">View SeedPhrase</li>

           </ul>
           </nav>
           <div className="extra">
             <h1>Seed Phrase</h1>

              <div>
                {this.getSeed()}
              </div>
           </div>
         </div>
    );
  }
}
