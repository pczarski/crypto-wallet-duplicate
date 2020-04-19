import React from 'react';

import '../styles/App.scss';

import {Card } from "reactstrap";
import { cardStyles } from '../styles/selectStyles';

export default class Help extends React.Component {
  render () {

    return (
      <div>
        <Card id="help" body style={cardStyles}>
        <h2> Security Guidelines </h2>
        <p>Using our app provides an extra layer of security, as it is a desktop app which can be accessed while offline.
           This means that we do not know anything about your password, 12-word recovery phrase, private keys, or even your public addresses.
           With the power of controlling your own bank, comes the added responsibility of protecting your bank. The following procedures will teach you how to protect your new “crypto-bank” and strengthen your security profile. As you wouldn’t want your actual bank to be a place where anyone could just walk in and take whatever they want, you shouldn’t let your wallet and computer be like that either:  </p>

          <p>&#8226;  Write down your 12 word recovery phrase on paper</p>
          <p>&#8226;  Print your recovery phrases on your home printer</p>
          <p>&#8226;  Keep your recovery phrase in a safe and reliable place, where only you know</p>
          <p>&#8226;  Make sure your password is unique, i.e. Unlike any of your other passwords, contains atleast 8 characters, use a range of cases, numbers and special characters.</p>

        </Card>
      </div>
    );
  }
}
