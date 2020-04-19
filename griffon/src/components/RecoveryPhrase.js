import React from 'react';
import '../styles/App.scss';
import ReactStopwatch from 'react-stopwatch';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Card } from 'reactstrap';

import {getRequest} from '../lib/backendHandler'
import {cardStyles, popupHeaderStyles, popupStyles} from "../styles/selectStyles";


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
              Time left: {this.toHHMMSS(180 - seconds - (60 * minutes)) }
            </p>
          </div>
        );
      }}
    />
  );

    return (
      <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle} style={popupHeaderStyles}>Warning!</ModalHeader>
        <ModalBody style={popupStyles}>
          Your seed phrase is the list of words which store all of the information needed to recover your crypto from the blockchain. Anyone who discovers the phrase would be able to steal your funds. You should take the safety of your recovery phrase very seriously.
          It will only display for 3 minutes before closing.
        </ModalBody>
        <ModalFooter style={popupHeaderStyles}>
          <Button color="success"
                  onClick={this.select}>Continue</Button>
          <Button color="danger" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Card id="phrase" body className="text-center" style={cardStyles}>
        <h3>Your Recovery Phrase</h3>
        <Stopwatch/>
        {this.state.showSeed &&
          <b style={{paddingBottom: '7%', paddingTop: '4%'}}
          >{this.state.seed}</b>
        }
        <Button id="recPhase" className="btn-action"
                color='secondary' block onClick={this.toggle}>{this.state.showSeed ? 'Hide Phrase' : 'View Recovery Phrase'}</Button>
      </Card>
    </div>

    )
  }
}
