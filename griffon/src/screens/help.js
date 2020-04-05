import React from 'react';
import Nav from '../components/Nav';

import {Link} from 'react-router-dom';
import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/help.scss';
import '../styles/settings.scss';

import { Button, Alert } from 'reactstrap';

export default class Help extends React.Component {
  render () {
    return (

            <div className="wrapper">
                <Nav/>
                <nav class="navbar 1">
                <h1>Help</h1>
                 <ul id="nav1">
             <Link to="/">
                     <li ><a href="#">Home</a></li></Link>
                     <li id="active"><a href="#">Security Guidelines</a></li>


                 </ul>
                 </nav>
                 <div className="extra1">
                 <h1> Security Guidelines </h1>
                 <p>Using our app provides an extra layer of security, as it is a desktop app which can be accessed while offline.


                 This means that we do not know anything about your password, 12-word recovery phrase, private keys, or even your public addresses.

                 With the power of controlling your own bank, comes the added responsibility of protecting your bank. The following procedures will teach you how to protect your new “crypto-bank” and strengthen your security profile. As you wouldn’t want your actual bank to be a place where anyone could just walk in and take whatever they want, you shouldn’t let your wallet and computer be like that either: </p>
                 <ul className="rules">
                 <li>Write down your 12 word recovery phrase on paper</li>
                 <li>Print your recovery phrases on your home printer</li>
                 <li>Keep your recovery phrase in a safe and reliable place, where only you know</li>
                 <li>Make sure your Griffon password is unique, i.e. Unlike any of your other passwords, contains atleast 16 characters, use a range of cases, numbers and special characters.</li>



                 </ul>



                 </div>


               </div>
    );
  }
}
