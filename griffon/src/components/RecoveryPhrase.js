import React from 'react';
import '../styles/App.scss';
import ReactStopwatch from 'react-stopwatch';
 
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {getRequest} from '../lib/backendHandler'


export default class RecoveryPhrase extends React.Component {
  
  constructor(props) {
    super(props);    

    this.select = this.select.bind(this);

    this.state = {
      start: false,
      showSeed: false,
      seed: getRequest('seed', null, null).seedPhrase,
      modal: false
    }
    console.log(this.state.seed)

  }


  select(e) {
    this.toggle()
    console.log(this.state)
    if (this.state.showSeed === false) {
      this.setState({start : true, showSeed: true})
    } else {

    }
  }
  timerDone(){
    this.setState({start: false, showSeed : false})
  }

  toggle = () => this.setState({modal: !this.state.modal})

  render () {
  const Stopwatch = () => (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      autoStart={this.state.start}
      limit="00:00:05"

      onChange={({ hours, minutes, seconds }) => {
      }}

      onCallback={() => this.timerDone()}

      render={({ formatted, hours, minutes, seconds }) => {
        return (
          <div>
            <p>
              Formatted: { formatted }
            </p>
          </div>
        );
      }}
    />
  );

    return (
    <div className="">
      <div>
    <Modal isOpen={this.state.modal} toggle={this.toggle} className='name'>
      <ModalHeader toggle={this.toggle}>Warning!</ModalHeader>
      <ModalBody>
        Your seed phrase is the list of words which store all of the information needed to recover your crypto from the blockchain. Anyone who discovers the phrase would be able to steal your funds. You should take the safety of your recovery phrase very seriously.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.select}>Continue</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
    </div>
      <h1>Your RecoveryPhrase</h1>
      <Stopwatch/>
      {this.state.showSeed && 
      <p>
        
        {this.state.seed}
      </p>
      }
      <Button className="btn btn-primary" size="lg" block onClick={this.toggle}>{this.state.showSeed ? 'Hide Phrase' : 'View Recovery Phrase'}</Button>
    </div>
    )
  }
}