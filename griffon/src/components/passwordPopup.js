import React from 'react';

class Pop extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='inside_pop'>
          <h1>{this.props.text}</h1>
          <input type="password" name="passwordVerfiry"/>
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
    this.setState({
      ShowPopup: !this.state.ShowPopup
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.togglePopup.bind(this)}>Authentication</button>

        {this.state.ShowPopup ? <Pop text='Password:'closePop={this.togglePopup.bind(this)}/> : null}
      </div>
    );
  }
};



export default Popup;
