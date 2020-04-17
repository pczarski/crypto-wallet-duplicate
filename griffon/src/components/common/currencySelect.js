import React from 'react';
import Select from 'react-select';
import {getCoinByCode} from "../../lib/helper";

/** required props:
 * coin: example "BTC" (just the code)
 * coins: list of coins fetched by fetchExchangeCoins of fetchWalletCoins in app.js
 * setCoin: function that will save the selection of coin
**/

export default function CurrencySelect(props) {
    const selected = getOption(getCoinByCode(props.coin, props.coins));
    //{value: props.coin, label: props.coin};
    const handleChange = (selectedOption) => {
        props.setCoin(selectedOption.value);
    };
    const options = props.coins.map( coin => getOption(coin));
    return(
        <div>
            <Select
                value={selected}
                onChange={handleChange}
                options={options}
            />
        </div>
    )
}

function getOption(coin) {
    return {value: coin.code, label: getLabel(coin)};
}

function getLabel(coin) {
    return (
        <div>
            <img src={coin.icon}/> {coin.code}
        </div>
        );
}