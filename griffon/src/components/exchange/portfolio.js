import Coins from "../walletComponents/Coins";
import React from "react";
import {COINS} from "../../App";
import Exchange from "../../screens/exchange";

export default function Portfolio(props) {
    const selectedComponent = props.selectedComponent;
    let mainComponent;
    if(selectedComponent === COINS) {
        mainComponent = <Coins fetch={props.fetch} coins={props.coins}
                               coinClick={props.coinClick}
        />
    } else {
        mainComponent = <Exchange coin={props.coin} coins={props.coins}
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