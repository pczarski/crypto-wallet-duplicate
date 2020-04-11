import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';

//private key
// import { Button, Alert } from 'reactstrap';

export default class PrivKey extends React.Component {
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
               <Link to="/pubkeys">
                     <li>>Public Keys</li>
               </Link>
               <li id="active">Private Keys</li>
           </ul>
           </nav>
           <div className="extra">

           </div>
         </div>
    );
  }
}
