import React from 'react';
import CurrencySelect from "../common/currencySelect";

export default function Deposit(props) {
    return(
        <div>
            deposit {props.coin}
            <CurrencySelect/>
        </div>
    )
}