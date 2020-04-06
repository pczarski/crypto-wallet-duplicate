import React from 'react';
import '../styles/App.scss';
import {Link, Redirect} from 'react-router-dom';

import {Input} from 'reactstrap';

export default class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.state = {
      supportedCurr: ["BTC", "ETH", "LTC", "DASH", "USDT"],
      dropdownOpen: false,
      selected: supportedCurr[0]
    }

  }

  send(e) {
  }

  receive(e) {
  }
  
  toggle(e) {
    e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      selected: e.target.innerText
      });
    }
  }

  render () {
    if (this.state.walletMade === true) {
    return <Redirect to='/wallet' />
  }
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Send or Receive from Wallet</h1>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.state.currency}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.select}>{this.state.supportedCurr[0]}</DropdownItem>
            <DropdownItem onClick={this.select}>{this.state.supportedCurr[1]}</DropdownItem>
            <DropdownItem onClick={this.select}>{this.state.supportedCurr[2]}</DropdownItem>
            <DropdownItem onClick={this.select}>GBP</DropdownItem>
            <DropdownItem onClick={this.select}>USD</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <form className="needs-validation" onSubmit={this.handleSubmit}>
          <Input type="textarea" name="text" id="seed"  value={this.state.seed} onChange={this.handleChange}/>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="/">
          <button type="button" className="btn btn-primary">Go back</button>
        </Link>
      </div>
    </div>
  );
  }
}
