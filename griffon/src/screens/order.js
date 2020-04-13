import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import {Link} from 'react-router-dom';
import { getCurr } from '../lib/backendHandler.js';
import { getBalance } from '../lib/backendHandler.js';
import { roundTo2 } from '../lib/helper.js';
import { Button } from 'reactstrap';
import Logos from "../components/walletComponents/Logos.js";
import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

// import { Button, Alert } from 'reactstrap';

export default class Order extends React.Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      images: [],
      dropdownOpen: false,
      selected: "BTC",
      change: false,
      choice: 0
    }

  }
  componentDidMount() {
    // this.setState({images: getIcons()})
  }

  handleClick(e) {
    console.log(e.target.value)
    this.setState({
      choice: e.target.value
    });
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      selected: e.target.innerText,
      change: true
      });
  }

  renderIcon() {
    switch(this.state.selected) {
      case "BTC":
        return bitcoinLogo;
      case "ETH":
        return ethLogo;
      case "USDT":
        return bitcoinLogo;
      case "LTC":
        return liteLogo;
      case "DASH":
        return dashLogo;
      default:
        return null;
    }
  }

  render () {
  const DropdownList = () => (
    <div>
      {this.state.supportedCurr.map(curr =>
      <DropdownItem onClick={this.select} key={curr}> {curr} </DropdownItem>
      )}
    </div>
  );


}
  render () {
    return (
                  <div className="wrapper">
                      <Nav/>
                      <nav className="navbar 1">
                      <h1>Exchange</h1>
                       <ul id="nav1">
                       <Link to ="exchange">
                           <li >Instant Exchange</li>
                           </Link>
                           <Link to ="order">
                           <li id="active">Place Order</li>
                           </Link>
                       </ul>
                       </nav>
                       <div className="extra1">
                       <div className="cryptoicons">
                       <img className="img1"src={this.renderIcon()} alt= "Bitcoin"></img> <img className="img2"src={ethLogo} alt= "Etherium"></img>

                       </div>
                       <div className="convert">
                       <input className="input1" type='number' name="current" placeholder="0.00" />
                       <select id="select2">
                       <option value="1">BTC</option>
                       <option value="2">Dash</option>
                       <option value="3">LTC</option>
                       <option value="4">ETH</option>

                      </select>
                    <input className="bob"type="button" value="swap"/>
                    <select id="select1">
                    <option value="1">ETH</option>
                    <option value="2">Dash</option>
                    <option value="3">LTC</option>
                    <option value="4">BTC</option>

                    </select>
                    <input className="input2" type='number' name="current" placeholder="0.00" />
                       </div>
                        <div className="Available">
                        <p className="Available1">Available Balance: {getBalance("BTC")} BTC</p>


                        <input className="exchange2"type="button" value="Place Order"/></div>

                       </div>
                     </div>
    );
  }
}
// import React, {Component} from 'react';
//
// import Logos from "./Logos";
//
//
//
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// export default class Coins extends Component
// {
//     //creating array of coins
//     constructor(props){
        // super(props)
        //         this.state = {
        //         coins: [
        //         {
        //
        //             logo:<img src = {Logos[0].logo} alt = {"bitcoin"}></img>,
        //             name:"Bitcoin",
        //             balance:roundTo2(getCurr("BTC").balance),
        //             address:getCurr("BTC").currentPublicKey
        //         },
        //         {
        //
        //             logo:<img src = {Logos[1].logo} alt = {"bitcoin"}></img>,
        //             name:"Ethereum",
        //             balance:roundTo2(getCurr("ETH").balance),
        //             address:getCurr("ETH").currentPublicKey
        //         },
        //         {
        //
        //             logo:<img src = {Logos[2].logo} alt = {"bitcoin"}></img>,
        //             name:"Litecoin",
        //             balance:roundTo2(getCurr("LTC").balance),
        //             address:getCurr("LTC").currentPublicKey
        //         },
        //         {
        //
        //             logo:<img src = {Logos[3].logo} alt = {"dash"}></img>,
        //             name:"Dash",
        //             balance:roundTo2(getCurr("DASH").balance),
        //             address:getCurr("DASH").currentPublicKey
        //         },
        //         {
        //
        //             logo:<img src = {Logos[4].logo} alt = {"dash"}></img>,
        //             name:"Tether",
        //             balance:roundTo2(getCurr("USDT").balance),
        //             address:getCurr("USDT").currentPublicKey
        //         }
        //
        //         ]
        //         }
        //
        //     }
//             renderTableHeader(){
//                 let header = Object.keys(this.state.coins[0])
//                 return header.map((key,index)=> {
//                 return <th scope= "col" key={index}>{key.toUpperCase()}</th>
//                 })
//             }
//             renderTableData(){
//                 return this.state.coins.map((coins, index) =>{
//                     const {logo,name,balance,address} = coins
//                     return (
//                         <tr key = {name}>
//                             <th scope ="row">{logo}</th>
//                             <td>{name}</td>
//                             <td>{balance}</td>
//                             <td>{address}</td>
//                         </tr>
//                     )
//                 })
//             }
//             render(){
//                 return (
//                     <div>
//                         <table className= "table table-striped table-hover table-dark">
//                             <tbody>
//                                 <tr>{this.renderTableHeader()}</tr>
//                                 {this.renderTableData()}
//                             </tbody>
//                         </table>
//                     </div>
//                 )
//             }
//
//
//
// }
