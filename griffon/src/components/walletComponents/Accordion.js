import React, {useState} from "react";

import "../../styles/Accordion.css";
import { Table, Row, Col } from "reactstrap";
//This function renders the coins 
function Accordion({coin,index,toggleCoins}){
    //performs a check to see whether coin tab is open.
    //it also uses table formatting in order to display the coin tab.
    return(
        <div className={"coin " + (coin.open ? 'open' : '')} key = {index} onClick={() => toggleCoins(index)}>
            <div className="names">
                <table>
                    <tbody>
                        <tr>
                            
                            <td className ="logo">{coin.logo}</td><td className="name">{coin.name}</td> <td className = "balance">{coin.balance}</td><td className= "address">{coin.address}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div className="properties">
                {coin.properties}
            </div>
        </div>
        
    )

}
export default Accordion




