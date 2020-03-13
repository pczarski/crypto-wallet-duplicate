import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';

function Recover() {
  return (
    <div className="wrapper">
        <h1>This the recover Wallet</h1>
        <form className="needs-validation">
            <textarea className="form-control" placeholder="Enter your 12 word seed phrase"></textarea>
            <button type="submit" disabled className="btn btn-primary">Submit</button>
        </form>
        <Link to="/">
            <button type="button" className="btn btn-primary">Go back</button>
        </Link>
    </div>
  );
}

export default Recover;
