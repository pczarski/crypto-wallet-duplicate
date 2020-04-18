import React from 'react';
import CurrencyBox from "./currencyBox";
import {roundTo2} from "../../lib/helper";

export default function WithdrawDeposit(props) {
    return(
        <div className="container">
            {props.title} {props.coin}
            <CurrencyBox
                coin={props.coin}
                setCoin={props.setCoin}
                coins={props.coins}
                setAmount={props.setAmount}
                placeholder={props.amount}
                label={'amount: '}
                value={props.amount}
            />
            <p> available: {roundTo2(props.balance) +" "+props.coin}</p>
        </div>
    )
}
