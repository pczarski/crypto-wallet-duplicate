import React, {useState} from 'react';

import Logos from "./Logos";

import Accordion from "./Accordion.js"
import { getCurr } from '../../lib/backendHandler';
import { roundTo2 } from '../../lib/helper';

function Coins(){
    //creating array of coins
    const [coins,setCoins] = useState([

        {
            name:"Bitcoin",
            properties:'send / receive and other things',
            open:true,
            logo:<img src = {Logos[0].logo} alt = {"bitcoin"}></img>,
            balance:roundTo2(getCurr("BTC").balance),
            address:getCurr("BTC").currentPublicKey
        },
        {
            name:"Ethereum",
            properties:'send / receive and other things',
            open:false,
            logo:<img src = {Logos[1].logo} alt = {"bitcoin"}></img>,
            balance:roundTo2(getCurr("ETH").balance),
            address:getCurr("ETH").currentPublicKey
        },
        {
            name:"Litecoin",
            properties:'send / receive and other things',
            open:false,
            logo:<img src = {Logos[2].logo} alt = {"bitcoin"}></img>,
            balance:roundTo2(getCurr("LTC").balance),
            address:getCurr("LTC").currentPublicKey
        },
        {
            name:"Dash",
            properties:'send / receive and other things',
            open:false,
            logo:<img src = {Logos[3].logo} alt = {"dash"}></img>,
            balance:roundTo2(getCurr("DASH").balance),
            address:getCurr("DASH").currentPublicKey
        },
        {
            name:"Tether",
            properties: 'send / receive and other things',
            open:false,
            logo:<img src = {Logos[4].logo} alt = {"dash"}></img>,
            balance:roundTo2(getCurr("USDT").balance),
            address:getCurr("USDT").currentPublicKey
        }
        
    ]);
    //checks to see if coins are open in order to actually make the accordion work
    const toggleCoins = index=> {
        setCoins(coins.map((coin,i) =>{
            if (i ===index) {
                coin.open = !coin.open
            }else{
                coin.open =false;
            }
            return coin;
        }))
    }
    //maps coins to coin object and passes them to Accordion.js so that it can handle the formatting and rendering
    return(
            <div className="coins">
                {coins.map((coin,i) => (
                    <Accordion key={coin + i} coin={coin} index={i} toggleCoins={toggleCoins}/>
                ))}

            </div>
    );

}
export default Coins