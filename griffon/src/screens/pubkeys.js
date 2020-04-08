import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';


import { Button, Alert } from 'reactstrap';

export default class PubKey extends React.Component {
  render () {
    return (

      <div className="wrapper">
          <Nav/>
          <nav class="navbar 1">
          <h1>Settings</h1>
           <ul id="nav1">
       <Link to="/">
               <li ><a href="#">Home</a></li></Link>
                <Link to="/settings">
               <li ><a href="#">Change Password</a></li></Link>
               <li id="active"><a href="#">Public Keys</a></li>

           </ul>
           </nav>
           <div className="extra">
           </div>


         </div>
    );
  }
}
