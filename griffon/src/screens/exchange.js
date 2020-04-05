import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';


import { Button, Alert } from 'reactstrap';

export default class Exchange extends React.Component {
  render () {
    return (

                  <div className="wrapper">
                      <Nav/>
                      <nav class="navbar 1">
                      <h1>Exchange</h1>
                       <ul id="nav1">
                   <Link to="/">
                           <li id="active"><a href="#">Instant Exchange</a></li></Link>
                           <li ><a href="#">Order History</a></li>


                       </ul>
                       </nav>
                       <div className="extra1">
                       <div className="currency1">
                       </div>
                       <div className="currency2">
                       asdasdasd
                       </div>




                       </div>


                     </div>
    );
  }
}
