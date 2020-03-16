import React from 'react';

import '../styles/App.scss';

import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';



async function getList() {
  let seed = [];
  let str;
  try {
    fetch("https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt").then((data) => {
      return data.text()
    }).then((data) => {
      let list = data.split("\n")
      for (let i = 1; i<12; i++) {
        str += list[Math.floor(Math.random()*list.length)] + " ";
      }
      console.log(str)
    })
  } catch (err) {
    console.log(err)
  }
  // seed.map(item => {return <li>{item[0]}</li>;})
}

export default class CreateNew extends React.Component {
  state = {
    data: [],
    seed: getList()
  };

  componentDidMount() {
    
  }



  render () {

    return (
      <div className="wrapper">
          <h1>This the create new Wallet</h1>
          <ul>
            {console.log(Promise.resolve(this.state.seed).catch())}
            {/* {this.state.seed.map(item => {return <li>{item[0]}</li>;})} */}
          </ul>
            <Link to="/wallet">
              <Button type="button" className="btn btn-primary" onClick={localStorage.setItem('hasWallet', true)}>Create new wallet</Button>
          </Link>
          <Link to="/">
              <Button type="button" className="btn btn-primary">Go back</Button>
          </Link>
      </div>
    );
  }
}
