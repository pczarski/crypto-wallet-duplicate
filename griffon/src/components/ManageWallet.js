import React from 'react';

import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";

import { Button } from 'reactstrap';

class ManageWalletDisplay extends React.Component{

  render(){
    return(
      <div className='ManageWalletDisplay'>
        <div className='inside_manageWallet'>
          <div className='manageWallet_contents'>
              <p>Select the cyrptocurrency to display in wallet</p>
              <h2>{this.props.text}</h2>
              <button onClick={this.props.closeManageWallet}>Verify</button>
              <div>
              <button className="btn btn-primary" onClick={this.props.closeManageWallet}>Back</button>
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
    ShowManageWallet: false
    };
  }

  toggleManageWallet() {
    this.setState({ShowManageWallet: !this.state.ShowManageWallet});
  }

  render() {
    return (
      <div className="component">
        <button type="button" className="btn btn-primary" size="lg" onClick={() => this.toggleManageWallet()}>Manage Wallet</button>

        {this.state.ShowManageWallet ? <ManageWalletDisplay text='Manage Wallet'closeManageWallet={() => this.toggleManageWallet()}/> : null}
      </div>
    );
  }
};


export default ManageWallet;
