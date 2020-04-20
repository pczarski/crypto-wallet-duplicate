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
            <div id="order-box">
            <div className="form-row mb-4" onClick={props.fetch}>
                <div className="col">
                    <div id='left-currency-box'>
                        <CurrencyBox
                            coin={props.coin}
                            setCoin={props.setCoin}
                            coins={props.coins} amount={props.amount}
                            setAmount={handleAmountChange} placeholder={props.amount}
                            label={'Amount:'}
                        />
                    </div>
                </div>
                <div className="col">
                    <div id ='middle-col-alt'>
                        <Label>Price</Label>
                        <Input type='text' className='form-control form-control'
                               placeholder={props.marketPrice}
                               onChange={handlePriceChange}
                               value={props.price} id="inp"
                        />

                        <p style={{paddingTop: '5%'}}
                        > 1 {props.coin} = {roundTo2(props.marketPrice)} {props.coin2} </p>
                        <p> Available: {props.available}</p>
                    </div>
                </div>
                <div className="col right-currency-box">
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
        </div>
    )
}