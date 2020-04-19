import React from 'react';
import CurrencyBox from "./currencyBox";
import {roundTo2} from "../../lib/helper";
import '../../styles/App.scss'
export default function Swap(props) {

    const handleAmountChange = (val) => {
        props.setAmount(val);
        props.setAmount2(val * props.price);
    };

    const handleAmount2Change = (val) => {
        props.setAmount2(val);
        props.setAmount(val/props.price);
    };

    return(
        <div className="container">
            <h2>{props.title}</h2>
                <div className="form-row mb-4" onClick={props.fetch}>
                    <div className="col">
                        <CurrencyBox
                            coin={props.coin}
                            setCoin={props.setCoin}
                            coins={props.coins} amount={props.amount}
                            setAmount={handleAmountChange} placeholder={props.amount}
                            label={'You will need:'}
                        />
                    </div>
                    <div className="col">
                        <h2>⇄</h2>
                        <div id='middle-col'>
                        1 {props.coin} = {roundTo2(props.marketPrice)} {props.coin2}
                        <p> available: {roundTo2(props.balance) +" "+props.coin}</p>
                        </div>
                    </div>
                    <div className="col">
                        <CurrencyBox
                            coin={props.coin2}
                            setCoin={props.setCoin2}
                            coins={props.coins} amount={props.amount2}
                            setAmount={handleAmount2Change} placeholder={props.price*props.amount}
                            label={props.label} value={props.amount2}
                        />
                    </div>
                </div>
        </div>
    )
}