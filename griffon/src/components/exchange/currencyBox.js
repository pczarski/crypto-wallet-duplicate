import React from 'react';
import CurrencySelect from "../common/currencySelect";
import {Input, Label} from 'reactstrap'

export default function CurrencyBox(props) {

    const handleChange = (e) => {
        props.setAmount(e.target.value);
    };
    return(
        <div>
            <CurrencySelect coin={props.coin} coins={props.coins}
                setCoin={props.setCoin}
            />
            <div className="col">
                <Label>{props.label}</Label>
                <Input type="text" onChange={handleChange}
                       className="form-control" name="currency"
                       placeholder={props.placeholder}
                       value={(props.value) ? props.value : props.placeholder}
                />
            </div>

        </div>
    );
}