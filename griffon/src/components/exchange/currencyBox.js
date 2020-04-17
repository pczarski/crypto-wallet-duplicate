import React from 'react';
import CurrencySelect from "../common/currencySelect";
import {Input, Label} from 'reactstrap'

export default function CurrencyBox(props) {

    return(
        <div>
                <CurrencySelect coin={props.coin} coins={props.coins}
                                setCoin={props.setCoin}
                />
            <div className="col">
                <Label>{props.label}</Label>
                <Input type="text" onChange={() => {console.log("e")}}
                       className="form-control" name="currency"
                       placeholder={props.placeholder} />
            </div>

        </div>
    );
}