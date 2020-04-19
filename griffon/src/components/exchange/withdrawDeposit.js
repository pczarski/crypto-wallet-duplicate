import React from 'react';
import CurrencyBox from "./currencyBox";
import {roundTo2} from "../../lib/helper";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function WithdrawDeposit(props) {
    return(
        <div className="container">
            <div className ="withdraw-deposit d-flex justify-content-center">
            <CurrencyBox 
                coin={props.coin}
                setCoin={props.setCoin}
                coins={props.coins}
                setAmount={props.setAmount}
                placeholder={props.amount}
                label={'Amount: '}
                value={props.amount}
            />
            </div>
            <p> Available: {roundTo2(props.balance) +" "+props.coin}</p>
        </div>
    )
}
