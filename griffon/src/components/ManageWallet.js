import React from 'react';

import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";

class CrytoCards extends React.Component{

  render(){
    return(
      <div className='popup'>
        <div className='inside_popup'>
          <div className='popup_contents'>
              <p>Select the cyrptocurrency to display in wallet</p>
              <h2>{this.props.text}</h2>
              <input type="password" name="passwordV"/>
              <button onClick={this.props.closePop}>Verify</button>
              <div>
              <button className="btn btn-primary" onClick={this.props.closePop}>Back</button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
class ManageWallet extends React.Component {
  constructor() {
    super();
    this.state = {
    ShowPopup: false
    };
  }

  togglePopup() {
    this.setState({ShowPopup: !this.state.ShowPopup});
  }

  render() {
    return (
      <div className="component">
        <button type="button" className="btn btn-primary" size="lg" onClick={() => this.togglePopup()}>Manage Wallet</button>

        {this.state.ShowPopup ? <CrytoCards text='Password:'closePop={() => this.togglePopup()}/> : null}
      </div>
    );
  }
};


export default ManageWallet;
