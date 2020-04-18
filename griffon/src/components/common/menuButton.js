import React from 'react';
import { Button } from 'reactstrap';
import {buttonActive, buttonHoover, buttonNormal} from "../../styles/selectStyles";

// required props: onClick, text, and active
export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
        }
    }

    renderButton(text) {
        const focus = this.state.focus;
        const active = this.props.active;
        if(focus) {
            return(
                <Button
                    size="lg"
                    className='btn btn-primary'
                    style={buttonHoover}
                >{text}</Button>
            );
        }
        if(active) {
            return(
                <Button
                    size="lg"
                    className='btn btn-primary'
                    style={buttonActive}
                >{text}</Button>
            );
        }
        return (
            <Button
                size="lg"
                className='btn btn-primary'
                style={buttonNormal}
            >{text}</Button>
        )
    }

    setFocus = () => {
        this.setState({
            focus: true,
        });
    };

    setNotFocus = () => {
        this.setState({
            focus: false,
        })
    };
    render() {
        return (
            <div onMouseEnter={this.setFocus} onMouseLeave={this.setNotFocus} onClick={this.props.onClick}>
                {this.renderButton(this.props.text)}
            </div>
        );
    }
}