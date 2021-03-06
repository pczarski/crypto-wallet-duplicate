import React from 'react';
import { Button } from 'reactstrap';
import {
    optionActive,
    optionHoover,
    optionNormal
} from "../../styles/selectStyles";
import {Link} from "react-router-dom";

// required props: onClick, text, to, and active
export default class MenuLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
        }
    }

    handleClick = (e) => {
        if(this.props.onClick){
            this.props.onClick(e);
        }
    };

    renderLink(text) {
        const focus = this.state.focus;
        const active = this.props.active;
        const to = (this.props.to) ? this.props.to : null;
        if(active) {
            return(
                <Link
                    className="list-group-item"
                    style={optionActive}
                    onClick={this.handleClick}
                    to={to}
                >{text}</Link>
            );
        }
        if(focus) {
            return(
                <Link
                    className="list-group-item"
                    style={optionHoover}
                    onClick={this.handleClick}
                    to={to}
                >{text}</Link>
            );
        }
        return (
            <Link
                className="list-group-item"
                style={optionNormal}
                onClick={this.handleClick}
                to={to}
            >{text}</Link>
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
                {this.renderLink(this.props.text)}
            </div>
        );
    }
}