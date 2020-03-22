import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import Popup from '../components/Popup';

import { Button } from 'reactstrap';


function Wallet() {
  return (
    <div className="wrapper">
        <Nav />
        <div className="content">
        <Link to="/">
            <button type="button" className="btn btn-primary">Go back</button>
        </Link>
      <h1>hdsad</h1>
        </div>
        <Popup/>
    </div>
  );
}

export default Wallet;
