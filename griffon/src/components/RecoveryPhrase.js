import React from 'react';
import '../styles/App.scss';
import ReactStopwatch from 'react-stopwatch';
 
import {Button} from 'reactstrap';

export default class RecoveryPhrase extends React.Component {
  
  constructor(props) {
    super(props);    

    this.select = this.select.bind(this);

    this.state = {
      start: false,
      showSeed: false,
      seed: null
    }

  }


  select(e) {
    this.setState({start : true, showSeed: true})
  }
  timerDone(){
    this.setState({start: false, showSeed : false})
  }

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
      <h1>Your RecoveryPhrase</h1>
      <Stopwatch/>
      {this.state.showSeed && 
      <p>
        extra dice power cupboard doctor kangaroo deal palm viable force mercy mutual
      </p>
      }
      <Button className="btn btn-primary" size="lg" block onClick={this.select}>Start</Button>
    </div>
    )
  }
}
