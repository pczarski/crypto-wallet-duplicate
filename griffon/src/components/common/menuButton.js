
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

    handleClick = (e) => {
        console.log(e);
        this.props.onClick(e);
    };

    renderButton(text) {
        const focus = this.state.focus;
        const active = this.props.active;
        const value = (this.props.value) ? this.props.value : null;
        if(focus) {
            return(
                <Button
                    size="lg"
                    className='btn btn-primary'
                    style={buttonHoover}
                    onClick={this.handleClick}
                    value={value}
                >{text}</Button>
            );
        }
        if(active) {
            return(
                <Button
                    size="lg"
                    className='btn btn-primary'
                    style={buttonActive}
                    onClick={this.handleClick}
                    value={value}
                >{text}</Button>
            );
        }
        return (
            <Button
                size="lg"
                className='btn btn-primary'
                style={buttonNormal}
                onClick={this.handleClick}
                value={value}
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
            <div onMouseEnter={this.setFocus} onMouseLeave={this.setNotFocus}>
                {this.renderButton(this.props.text)}
            </div>
        );
    }
}
