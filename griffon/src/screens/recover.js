import React from 'react';
import '../styles/App.scss';
import {Link} from 'react-router-dom';

// import {makeWallet} from "../lib/backendHandler.js";

// import validator from 'validator';

// import {hashPassword, verifyPassword} from "../lib/hash.js"

import {Input} from 'reactstrap';

// to fix :
// , recover wallet, validation, check 12 words
// some css
export default class Recover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({seed: e.target.value});
  }

  handleSubmit(e) {
    // submit should pass this to a new wallet, and make it
    e.preventDefault();

  }
  render () {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>recover Wallet</h1>
        <form className="needs-validation" onSubmit={this.handleSubmit}>
          <Input type="textarea" name="text" id="seed"  value={this.state.seed} onChange={this.handleChange}/>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        <Link to="/">
          <button type="button" className="btn btn-primary">Go back</button>
        </Link>
      </div>
    </div>
  );
  }
}
