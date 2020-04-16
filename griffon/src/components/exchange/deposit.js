import React from 'react';
import CurrencyBox from "./currencyBox";

export default function Deposit(props) {
    return(
        <div>
            deposit {props.coin}
            <CurrencyBox/>
        </div>
    )
}