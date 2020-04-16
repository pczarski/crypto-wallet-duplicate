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
            // used to render headers
            coins: [
                {
                    logo:<img src = {Logos[0].logo} alt = {"bitcoin"}></img>,
                    name:"Bitcoin",
                    balance:"", //roundTo2(getCurr("BTC").balance),
                    address:"",//getCurr("BTC").currentPublicKey,
                    price:"",
                },
            ]
        }

    }
    renderTableHeader(){
        let header = Object.keys(this.state.coins[0]);
        return header.map((key,index)=> {
            return <th scope= "col" key={index}>{key.toUpperCase()}</th>
        })
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
        console.log(this.props);
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