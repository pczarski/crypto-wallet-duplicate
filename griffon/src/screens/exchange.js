import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import {Link} from 'react-router-dom';



export default class Exchange extends React.Component {
  render () {

    return (
        <div className="wrapper">
          <Nav/>
          <div className="container">
            <h1>
              Hello
            </h1>
          </div>
        </div>
    );
  }
}
