import React from 'react';
import CurrencySelect from "../common/currencySelect";
import {Input, Label} from 'reactstrap';
import '../../styles/App.scss';

export default function CurrencyBox(props) {

    const handleChange = (e) => {
        props.setAmount(e.target.value);
    };
    return(
        <div className ="currency-select">
            <CurrencySelect coin={props.coin} coins={props.coins}
                setCoin={props.setCoin}
            />
            <div id="col">
                <Label className="labels">{props.label}</Label>
                <Input
                    id="inp" type="text" onChange={handleChange}
                       className="form-control" name="currency"
                       placeholder={props.placeholder}
                       value={(props.value) ? props.value : props.placeholder}
                       
                />
            </div>

        </div>
    );
}