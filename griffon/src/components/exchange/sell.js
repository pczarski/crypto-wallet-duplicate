import React from 'react';
import CurrencyBox from "./currencyBox";
import {Form, Input, Label} from 'reactstrap';
import {roundTo2} from "../../lib/helper";
export default function Sell(props) {
    const handlePriceChange = (e) => {
        props.setPrice(e.target.value);
    };
    return(
        <div className="container">
            Sell
            <Form>
                <div className="form-row mb-4" onClick={props.fetch}>
                    <div className="col">
                        <CurrencyBox
                            coin={props.coin}
                            setCoin={props.setCoin}
                            coins={props.coins} amount={props.amount}
                            setAmount={props.setAmount} placeholder={props.amount}
                            label={'amount:'}
                        />
                    </div>
                    <div className="col">
                        <Label>Price</Label>
                        <Input type='text' className='form-control'
                               placeholder={props.marketPrice}
                               onChange={handlePriceChange}
                        />
                        1 {props.coin} = {roundTo2(props.marketPrice)} {props.coin2}
                    </div>
                    <div className="col">
                        <CurrencyBox
                            coin={props.coin2}
                            setCoin={props.setCoin2}
                            coins={props.coins} amount={props.amount2}
                            setAmount={props.setAmount2} placeholder={props.price*props.amount}
                            label={"you'll get:"}
                        />
                    </div>
                </div>
            </Form>
        </div>
    )
}