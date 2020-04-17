import React from 'react';
import CurrencySelect from "../common/currencySelect";

export default function Sell(props) {

    console.log(props);
    return(
        <div>
            sell {props.coin} --) {props.coin2}
            <CurrencySelect coin={props.coin} coins={props.coins}
                            setCoin={props.setCoin}
            />
        </div>
    )
}