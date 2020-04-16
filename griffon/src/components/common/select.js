import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import React from "react";

//TODO: Please fix the fact that you need to select twice for update to happen!

// simple select that will update a value based on the passed to:
// props.items, props.onSelect, props.selectedItem
export default class Select extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            dropdownOpen: false,
            selection: this.props.selectedItem,
        }
    };

    toggle(e) {
        e.preventDefault();
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    select(e) {
        const newSelection = e.target.innerText;
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            selection: newSelection,
        });
        this.props.onSelect(newSelection);
    }

    renderItems() {
        return this.props.items.map((item) => {
            return(
                <DropdownItem onClick={this.select} key={item}>
                    {item}
                </DropdownItem>
            );
        });
    };

    render() {
        return(
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.props.selectedItem}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.renderItems()}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    };
};