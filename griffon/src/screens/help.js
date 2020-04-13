import React from 'react';
import Navig from '../components/Nav';

import {Link} from 'react-router-dom';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/help.scss';
import '../styles/settings.scss';

import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default class Help extends React.Component {
  render () {
    const Topbar = () => (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>Settings</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem  >
            <NavLink onClick={this.select} name="security">
            Security Guidelines            
          </NavLink>
         </NavItem>
        </Nav>
      </Navbar>
  );
    return (
            <div className="wrapper">
                <Navig/>
                 <div>
                <Topbar />
                 <h1> Security Guidelines </h1>
                 <p>Using our app provides an extra layer of security, as it is a desktop app which can be accessed while offline.
                 This means that we do not know anything about your password, 12-word recovery phrase, private keys, or even your public addresses.
                 With the power of controlling your own bank, comes the added responsibility of protecting your bank. The following procedures will teach you how to protect your new “crypto-bank” and strengthen your security profile. As you wouldn’t want your actual bank to be a place where anyone could just walk in and take whatever they want, you shouldn’t let your wallet and computer be like that either:  </p>
                 <ul>
                 <li>Write down your 12 word recovery phrase on paper</li>
                 <li>Print your recovery phrases on your home printer</li>
                 <li>Keep your recovery phrase in a safe and reliable place, where only you know</li>
                 <li>Make sure your password is unique, i.e. Unlike any of your other passwords, contains atleast 16 characters, use a range of cases, numbers and special characters.</li>
                 </ul>
                 </div>
               </div>
    );
  }
}
