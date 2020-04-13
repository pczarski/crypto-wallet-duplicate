import React, {Component} from 'react';

import Logos from "./Logos";

import { getCurr } from '../../lib/backendHandler';
import { roundTo2 } from '../../lib/helper';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Coins extends Component
{
    //creating array of coins
    constructor(props){
        super(props);
        this.state = {
            coins: [
                {

                    logo:<img src = {Logos[0].logo} alt = {"bitcoin"}></img>,
                    name:"Bitcoin",
                    balance:"", //roundTo2(getCurr("BTC").balance),
                    address:"",//getCurr("BTC").currentPublicKey,
                    price:"",
                },
                // {
                //
                //     logo:<img src = {Logos[1].logo} alt = {"bitcoin"}></img>,
                //     name:"Ethereum",
                //     balance:roundTo2(getCurr("ETH").balance),
                //     address:getCurr("ETH").currentPublicKey
                // },
                // {
                //
                //     logo:<img src = {Logos[2].logo} alt = {"bitcoin"}></img>,
                //     name:"Litecoin",
                //     balance:roundTo2(getCurr("LTC").balance),
                //     address:getCurr("LTC").currentPublicKey
                // },
                // {
                //
                //     logo:<img src = {Logos[3].logo} alt = {"dash"}></img>,
                //     name:"Dash",
                //     balance:roundTo2(getCurr("DASH").balance),
                //     address:getCurr("DASH").currentPublicKey
                // },
                // {
                //
                //     logo:<img src = {Logos[4].logo} alt = {"dash"}></img>,
                //     name:"Tether",
                //     balance:roundTo2(getCurr("USDT").balance),
                //     address:getCurr("USDT").currentPublicKey
                // }

            ]
        }

    }
    renderTableHeader(){
        let header = Object.keys(this.state.coins[0]);
        return header.map((key,index)=> {
            return <th scope= "col" key={index}>{key.toUpperCase()}</th>
        })
    }
    renderTableData(){
        return this.state.coins.map((coins, index) =>{
            const {logo,name,balance,address} = coins;
            return (
                <tr key = {name}>
                    <th scope ="row">{logo}</th>
                    <td>{name}</td>
                    <td>{balance}</td>
                    <td>{address}</td>
                </tr>
            )
        });
    }

    renderCoinsToTable(){
        if(this.props.coins == null) {
            return "";
        }
        return this.props.coins.map((coin) => {
            return (
                <tr key = {coin.code}>
                    <th scope ="row"><img src={coin.icon}/></th>
                    <td>{coin.name}</td>
                    <td>{coin.balance} {coin.code}</td>
                    <td>{coin.currentPublicKey}</td>
                    <td>{coin.price}</td>
                </tr>
            )
        });
    }

    componentDidMount() {
        // update the coin values
        this.props.fetch();
    }

    render(){
        return (
            <div>
                <table className= "table table-striped table-hover table-dark">
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderCoinsToTable()}
                    </tbody>
                </table>
            </div>
        )
    }



}