import React from 'react';
import CurrencyBox from "./currencyBox";
import { Input, Label} from 'reactstrap';
import {roundTo2} from "../../lib/helper";
export default function Order(props) {
    const handlePriceChange = (e) => {
        const val = e.target.value;
        props.setPrice(val);
        props.setAmount2(props.amount * val);
    };

    const handleAmountChange = (val) => {
        props.setAmount(val);
        props.setAmount2(val * props.price);
    };

    const handleAmount2Change = (val) => {
        props.setAmount2(val);
        props.setPrice(val/props.amount);
    };

    return(
        <div className="container">
            <h2>{props.title}</h2>
                <div className="form-row mb-4" onClick={props.fetch}>
                    <div className="col">
                        <CurrencyBox
                            coin={props.coin}
                            setCoin={props.setCoin}
                            coins={props.coins} amount={props.amount}
                            setAmount={handleAmountChange} placeholder={props.amount}
                            label={'Amount:'}
                        />
                    </div>
                    <div className="col">
                        <div id ='middle-col-alt'>
                            <Label>Price</Label>
                            <Input type='text' className='form-control bg-dark text-white form-control'
                                placeholder={props.marketPrice}
                                onChange={handlePriceChange}
                                value={props.price}
                            />
                        
                        1 {props.coin} = {roundTo2(props.marketPrice)} {props.coin2}
                        <p> Available: {roundTo2(props.balance) +" "+props.coin}</p>
                        </div>
                    </div>
                    <div className="col">
                        <CurrencyBox
                            coin={props.coin2}
                            setCoin={props.setCoin2}
                            coins={props.coins} amount={props.amount2}
                            setAmount={handleAmount2Change} placeholder={props.price*props.amount}
                            label={props.label} value={props.amount2}
                        />
                    </div>
                </div>
        </div>
    )
}