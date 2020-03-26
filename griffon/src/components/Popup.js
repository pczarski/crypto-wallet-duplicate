import React from 'react';

class Pop extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='inside_popup'>
          <p>Please enter your password for verification</p>
          <h2>{this.props.text}</h2>
          <input type="password" name="passwordV"/>
        <button onClick={this.props.closePop}>Verify</button>
        </div>
      </div>
    );
  }
}
class Popup extends React.Component {

  constructor() {
    super();
    this.state = {
      ShowPopup: false
    };
  }
  togglePopup() {
    this.setState(
      {ShowPopup: !this.state.ShowPopup}
    );
  }
  render() {
    return (
      <div className="component">
      <h2>Pop-up:</h2>
        <button onClick={() => this.togglePopup()}>Authentication</button>

        {this.state.ShowPopup ? <Pop text='Password:'closePop={() => this.togglePopup()}/> : null}
      </div>
    );
  }
};
export default Popup;
