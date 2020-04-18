import React from 'react';
import CurrencyBox from "./currencyBox";
import {roundTo2} from "../../lib/helper";

export default function WithdrawDeposit(props) {
    return(
        <div className="container">
            <h2>{props.title} {props.coin}</h2>
            <CurrencyBox
                coin={props.coin}
                setCoin={props.setCoin}
                coins={props.coins}
                setAmount={props.setAmount}
                placeholder={props.amount}
                label={'Amount: '}
                value={props.amount}
            />
            <p> Available: {roundTo2(props.balance) +" "+props.coin}</p>
        </div>
    )
}
