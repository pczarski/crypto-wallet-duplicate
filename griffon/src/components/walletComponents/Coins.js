import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

// used to render headers
const headers = ["search...", "name", "balance", "address", "price"];

export default class Coins extends Component
{
    //creating array of coins
    constructor(props){
        super(props);
        this.state = {
        }

    }
    renderTableHeader(){
        return headers.map((key,index)=> {
            return <th scope= "col" key={index}>{key.toUpperCase()}</th>
        })
    };

    renderCoinsToTable(){
        if(this.props.coins == null) {
            return <tr></tr>;
        }
        return this.props.coins.map((coin) => {
            return (
                <tr key = {coin.code} onClick={() => this.props.coinClick(coin.code)}>
                    <th scope ="row"><img src={coin.icon}/></th>
                    <td>{coin.name}</td>
                    <td>{coin.balance} {coin.code}</td>
                    <td>{coin.currentPublicKey}</td>
                    <td>{coin.price}</td>
                </tr>
            );
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
                    <thead>
                    <tr>{this.renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                    {this.renderCoinsToTable()}
                    </tbody>
                </table>
            </div>
        )
    }



}