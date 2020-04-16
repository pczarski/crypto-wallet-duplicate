import React from 'react';
import CurrencyBox from "./currencyBox";

export default function Buy(props) {

    return(
        <div>
            buy {props.coin} (-- {props.coin2}
            <CurrencyBox/>
            <CurrencyBox/>
        </div>
    );
}