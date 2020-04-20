import Coins from "../walletComponents/Coins";
import React from "react";
import {COINS} from "../../App";
import Trade from "./trade";

// controller component to display coins or making orders
export default function Portfolio(props) {
    const selectedComponent = props.selectedComponent;
    let mainComponent;
    if(selectedComponent === COINS) {
        mainComponent = <Coins fetch={props.fetch} coins={props.coins}
                               coinClick={props.setCoin}
        />
    } else {
        mainComponent = <Trade coin={props.coin} coins={props.coins}
                               exchange={props.exchange}
                               setCoin={props.setCoin} coin2={props.coin2}
                               setCoin2={props.setCoin2}
                               goBack={props.setMainComponent}
                               mainComponent={props.tradeMainComponent}
                               setMainComponent={props.setTradeMainComponent}
                               price={props.price} setPrice={props.setPrice}
                               marketPrice={props.marketPrice}
                               amount={props.amount} setAmount={props.setAmount}
                               amount2={props.amount2} setAmount2={props.setAmount2}
                               walletCoins={props.walletCoins}
        />
    }

    return(
        <div>
            {mainComponent}
        </div>
    )
}