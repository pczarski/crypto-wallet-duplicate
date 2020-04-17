import React from 'react';
import CurrencySelect from "../common/currencySelect";

export default function Buy(props) {

    return(
        <div>
            buy {props.coin} (-- {props.coin2}
            <CurrencySelect/>
            <CurrencySelect/>
        </div>
    );
}