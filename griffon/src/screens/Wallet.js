import React from 'react';
import '../styles/App.css';
import {Link} from 'react-router-dom';


function Wallet() {
  return (
    <div className="App">
        <h1>This the Wallet</h1>
        <Link to="/">
            <button type="button" className="btn btn-primary">Go back</button>
        </Link>
    </div>
  );
}

export default Wallet;
