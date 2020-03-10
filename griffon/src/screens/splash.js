import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';

function Splash() {
  return (
    <div className="wrapper">
        <h1>Cryptocurrency Wallet</h1>
        <Link to="/createnew">
            <button type="button" className="btn btn-primary">Create a new wallet</button>
        </Link>
        <Link to="/recover">
            <button type="button" className="btn btn-primary">Recover wallet from seed phrase</button>
        </Link>
    </div>
  );
}

export default Splash;
