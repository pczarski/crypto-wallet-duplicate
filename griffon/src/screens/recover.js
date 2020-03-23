import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';
import {makeWallet} from "../lib/backendHandler.js";

import {Input} from 'reactstrap';
// to fix :
// onclick, recover wallet
// some css
export default class Recover extends React.Component {

  render () {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>recover Wallet</h1>
        <form className="needs-validation">
          <Input type="textarea" name="text" id="exampleText" />
          
            <button type="submit" disabled className="btn btn-primary" >Submit</button>
        </form>
        <Link to="/">
            <button type="button" className="btn btn-primary">Go back</button>
        </Link>
      </div>
    </div>
  );
  }
}
