import React from 'react';
import CurrencyBox from "./currencyBox";

export default function Withdraw(props) {
    return(
        <div>
            withdraw {props.coin}
            <CurrencyBox/>
        </div>
    )
}
