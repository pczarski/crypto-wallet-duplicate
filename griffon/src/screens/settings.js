import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/settings.scss';


import { Button, Alert } from 'reactstrap';

export default class Settings extends React.Component {
  render () {
    return (

      <div className="wrapper">
          <Nav/>
          <nav class="navbar 1">
          <h1>Settings</h1>
           <ul id="nav1">
       <Link to="/">
               <li ><a href="#">Home</a></li></Link>
               <li><a href="#">Change Password</a></li>
               <li><a href="#">Public Keys</a></li>

           </ul>
           </nav>
           <div className="extra">
         <form>

         <h1>Change Password</h1>
         <div>
         <p>Enter your current Password:</p>
         <input type='text' name="password" placeholder="Current password"/>
         </div>
         <div>
         <p>Enter your new Password:</p>
         <input type='text' name="password" placeholder="New password"/>
         </div>
         <div>
         <p>Confirm your new Password:</p>
         <input type='text' name="password" placeholder="Confirm password"/>

         </div>
         <div className="password">
         <Button type="button" size="md" className="btn btn-primary">Change Password</Button>
         </div>
         </form>
           </div>


         </div>
    );
  }
}
