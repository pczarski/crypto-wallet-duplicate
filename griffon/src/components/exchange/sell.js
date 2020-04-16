import React from 'react';
import CurrencyBox from "./currencyBox";

export default function Sell(props) {

    return(
        <div>
            sell {props.coin} --) {props.coin2}
            <CurrencyBox/>
            <CurrencyBox/>
        </div>
    )
}