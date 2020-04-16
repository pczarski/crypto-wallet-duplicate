import React from 'react';
import '../styles/App.scss';
import ReactStopwatch from 'react-stopwatch';
 
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {getRequest} from '../lib/backendHandler'


export default class RecoveryPhrase extends React.Component {
  
  constructor(props) {
    super(props);    

    this.select = this.select.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      start: false,
      showSeed: false,
      seed: getRequest('seed', null, null).seedPhrase,
      modal: false
    }
  }

  select(e) {
    this.toggle()
    if (this.state.showSeed === false) {
      this.setState({start : true, showSeed: true})
    }
  }
  timerDone(){
    this.setState({start: false, showSeed : false})
  }

  toggle() {
    if (this.state.showSeed === false) {
      this.setState({modal: !this.state.modal})
    } else {
      this.timerDone()
    }
  }
  
  toHHMMSS (time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var minutes = Math.floor((sec_num) / 60);
    var seconds = sec_num - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

  render () {

  const Stopwatch = () => (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      autoStart={this.state.start}
      limit="00:03:00"

      onCallback={() => this.timerDone()}

      render={({ seconds, minutes }) => {
        return (
          <div>
            <p>
              Time left: {this.toHHMMSS(180 - seconds + (60 * minutes)) }
            </p>
          </div>
        );
      }}
    />
  );

    return (
      <div className="extra">
      <Modal isOpen={this.state.modal} toggle={this.toggle} className='name'>
        <ModalHeader toggle={this.toggle}>Warning!</ModalHeader>
        <ModalBody>
          Your seed phrase is the list of words which store all of the information needed to recover your crypto from the blockchain. Anyone who discovers the phrase would be able to steal your funds. You should take the safety of your recovery phrase very seriously.
          It will only display for 3 minutes before requiring authentification again.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.select}>Continue</Button>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <h1>Your Recovery Phrase</h1>
      <Stopwatch/>
      {this.state.showSeed && 
        <b>{this.state.seed}</b>
      }
      <Button className="btn btn-primary" size="lg" block onClick={this.toggle}>{this.state.showSeed ? 'Hide Phrase' : 'View Recovery Phrase'}</Button>
    </div>
    
    )
  }
}