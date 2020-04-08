import React, {useState} from 'react';

import Logos from "./Logos";

import Accordion from "./Accordion.js"
function Coins(){

    const [coins,setCoins] = useState([

        {
            name:"bitcoin",
            properties:'send / receive and other things',
            open:true,
            logo:<img src = {Logos[0].logo}></img>,
            balance:32,
            address: "PLACEHOLDER FOR ADDRESS"

        },
        {
            name:"eth",
            properties:'send / receive and other things',
            open:false,
            logo:<img src = {Logos[1].logo}></img>,
            balance:32,
            address: "PLACEHOLDER FOR ADDRESS"

        },
        {
            name:"lite",
            properties:'send / receive and other things',
            open:false,
            logo:<img src = {Logos[2].logo}></img>,
            balance:32,
            address: "PLACEHOLDER FOR ADDRESS"

        },
        {
            name:"dash ",
            properties:'send / receive and other things',
            open:false,
            logo:<img src = {Logos[3].logo}></img>,
            balance:32,
            address: "PLACEHOLDER FOR ADDRESS"


        }
        


    ]);

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
    return(
            <div className="coins">
                {coins.map((coin,i) => (
                    <div>
                        <Accordion coin={coin} index={i} toggleCoins={toggleCoins}/>
                    </div>
                ))}

            </div>
    );

}
export default Coins