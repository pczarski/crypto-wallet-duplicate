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
       <nav class="navbar ">
       <h1>Settings</h1>
		<ul id="nav1">
    <Link to="/wallet">
			<li ><a href="#">Home</a></li>
    </Link>
			<li><a href="#">Change Password</a></li>
			<li><a href="#">Private Keys</a></li>

		</ul>
        </nav>


      </div>
    );
  }
}
