import React, {useEffect, useState} from 'react';
import CurrencyBox from "./currencyBox";
import {Form, Input} from 'reactstrap';
import $ from 'jquery';
export default function Sell(props) {
    const [amount, setAmount] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const [price, setPrice] = useState(0);
    console.log(props);

    return(
        <div className="container">
            sell {props.coin} --) {props.coin2}
            <Form>
                <div className="form-row mb-4 ">
                    <div className="col">
                        <CurrencyBox
                            coin={props.coin}
                            setCoin={props.setCoin}
                            coins={props.coins} amount={amount}
                            setAmount={setAmount} placeholder={"0.00"}
                            label={'amount:'}
                        />
                    </div>
                    <div className="col">
                        ---)
                        <Input type='text' className='form-control'/>
                        1 {props.coin} = {price} {props.coin2}
                    </div>
                    <div className="col">
                        <CurrencyBox
                            coin={props.coin2}
                            setCoin={props.setCoin2}
                            coins={props.coins} amount={amount2}
                            setAmount={setAmount2} placeholder={"0.00"}
                            label={"you'll get:"}
                        />
                    </div>
                </div>
            </Form>
        </div>
    )
}