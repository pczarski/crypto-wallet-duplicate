import React from 'react';
import Select from 'react-select';
import {getCoinByCode} from "../../lib/helper";
import '../../styles/App.scss';
import {selectMenuStyles, selectStyles} from "../../styles/selectStyles";

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
    if(!props.coins || !props.coin){
        return ("");
    }
    return(
        <div>
            <Select
                styles={selectStyles}
                value={selected}
                onChange={handleChange}
                options={options}
                components={{
                    IndicatorSeparator: () => null
                }}
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

