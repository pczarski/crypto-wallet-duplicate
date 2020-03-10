import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';

function CreateNew() {
  return (
    <div className="wrapper">
        <h1>This the create new Wallet</h1>
        <Link to="/">
            <button type="button" className="btn btn-primary">Go back</button>
        </Link>
    </div>
  );
}

export default CreateNew;
