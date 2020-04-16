import Coins from "../walletComponents/Coins";
import React from "react";
import {COINS} from "../../App";
import Trade from "../../screens/trade";

// controller component to display coins or making orders
export default function Portfolio(props) {
    const selectedComponent = props.selectedComponent;
    let mainComponent;
    if(selectedComponent === COINS) {
        mainComponent = <Coins fetch={props.fetch} coins={props.coins}
                               coinClick={props.coinClick}
        />
    } else {
        mainComponent = <Trade coin={props.coin} coins={props.coins}
                               setCoin={props.coinClick}
                               setMainComponent={props.setMainComponent}
        />
    }

    return(
        <div>
            {mainComponent}
        </div>
    )
}