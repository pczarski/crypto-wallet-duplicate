import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/coin.css';

// used to render headers
const headers = [ "name", "balance", "address", "price"];

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
            return <th className='header' scope= "col" key={index}>{key.toUpperCase()}</th>
        })
    };

    renderCoinsToTable(){
        if(this.props.coins == null) {
            return <tr></tr>;
        }
        return this.props.coins.map((coin) => {
            return (
                <tr key = {coin.code} onClick={() => this.props.coinClick(coin.code)}>
                    <td>
                        <img style={{paddingRight: '20px'}} id="" src={coin.icon} alt={coin.name}/>{coin.name}
                    </td>
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
                <table className= "tabld">
                    
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