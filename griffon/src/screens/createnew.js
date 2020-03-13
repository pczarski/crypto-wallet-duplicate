import React from 'react';

import '../styles/App.scss';

import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

function CreateNew() {
  return (
    <div className="wrapper">
        <h1>This the create new Wallet</h1>
        <Link to="/wallet">
            <Button type="button" className="btn btn-primary" onClick={localStorage.setItem('hasWallet', true)}>Create new wallet</Button>
        </Link>
        <Link to="/">
            <Button type="button" className="btn btn-primary">Go back</Button>
        </Link>
    </div>
  );
}

export default CreateNew;
