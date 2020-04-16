import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import {Link, Redirect} from 'react-router-dom';
import {COINS} from "../App";



export default class Exchange extends React.Component {

    goBack = () => {
        this.props.setMainComponent(COINS);
    };

    render () {
        if(this.props.coins === null){
            // we shouldn't be here
            return(<Redirect to='/ExchangeAccess'/>);
        }
        const selectedCoin = this.props.coin;
        return (
            <div className="wrapper">
                <Nav/>
                <div className="container">
                    <div>
                        TODO: dropdown here: {selectedCoin}
                    </div>
                    <button onClick={this.goBack}>
                        go back todo: make an X instead
                    </button>
                </div>
            </div>
        );
    }
}
