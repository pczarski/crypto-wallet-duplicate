import React from 'react';

import '../styles/App.scss';
import '../styles/style.css';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Griffon from '../griffin.jpg'
import Typical from 'react-typical'

import {makeWallet} from "../lib/backendHandler.js"

export default class CreateNew extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {

  }
  makeWallet() {

  }
  async handleClick(e) {
    e.preventDefault();
    console.log('wallet made');
    localStorage.setItem('hasWallet', true);
    const wallet = makeWallet("currency", "name", "Bitcoin");

    console.log(wallet)

    //
  }

  render () {
    return (
      <body>


    <header id="header">
      <div class="d-flex flex-column">

        <div class="profile">
          <img src={Griffon} alt="" class="img-fluid rounded-circle"/>
          <h1 class="text-light"><a href="index.html">Griffon</a></h1>

        </div>

        <nav class="nav-menu">
          <ul>
          <Link to="/">  <li ><a href=""><i class="bx bx-home"></i> <span>Home</span></a></li></Link>
            <Link to="/createnew"><li class="active"><a href=""><i class="bx bx-wallet"></i> <span>Create Wallet</span></a></li></Link>
            <Link to="/recover"><li><a href=""><i class="bx bx-key"></i> <span>Recover Wallet</span></a></li></Link>
            <Link to="/wallet"><li><a href=""><i class="bx bx-wallet-alt"></i>Wallet</a></li></Link>
          </ul>
        </nav>
        <button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>

      </div>
    </header>
    <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
      <div class="hero-container" data-aos="fade-in">

        <h1>Create New Wallet</h1>
          <Link to="/wallet">
            <Button type="button" className="btn btn-primary bt3" onClick={this.handleClick}>Create new wallet</Button>
        </Link>


      </div>
    </section>






  </body>
    );
  }
}
