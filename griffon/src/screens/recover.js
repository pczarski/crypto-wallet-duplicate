import React from 'react';
import '../styles/App.scss';
import '../styles/recover.scss';
import Griffon from '../griffin.jpg'
import Typical from 'react-typical'
import {Link} from 'react-router-dom';
import {makeWallet} from "../lib/backendHandler.js";

import {Input} from 'reactstrap';
// to fix :
// onclick, recover wallet
// some css
export default class Recover extends React.Component {

  render () {
  return (
  <header id="header">
    <div class="d-flex flex-column">

      <div class="profile">
        <img src={Griffon} alt="" class="img-fluid rounded-circle"/>
        <h1 class="text-light"><a href="index.html">Griffon</a></h1>

      </div>

      <nav class="nav-menu">
        <ul>
        <Link to="/">  <li ><a href=""><i class="bx bx-home"></i> <span>Home</span></a></li></Link>
          <Link to="/createnew"><li><a href=""><i class="bx bx-wallet"></i> <span>Create Wallet</span></a></li></Link>
          <Link to="/recover"><li class="active"><a href=""><i class="bx bx-key"></i> <span>Recover Wallet</span></a></li></Link>
          <Link to="/wallet"><li><a href=""><i class="bx bx-wallet-alt"></i>Wallet</a></li></Link>
        </ul>
      </nav>
      <button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>

    </div>
  </header>
  <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
    <div class="hero-container" data-aos="fade-in">
    <h1>Recover Wallet</h1>
          <form >
              <textarea className="form-control" placeholder="Enter your 12 word seed phrase"></textarea>
              <div className="btn-area">
              <button type="submit"  className="btn btn-primary bt1 margin-left">Submit</button>
              <Link to="/">
                  <button type="button" className="btn btn-secondary bt2">Go back</button>
              </Link>
              </div>
          </form>
    </div>
  </section>

  );
  }
}
