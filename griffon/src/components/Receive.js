import React from 'react';
import '../styles/App.scss';
import {getCurr} from '../lib/backendHandler'
import QRCode from 'qrcode';
import {  Button } from "reactstrap";

export default class Receive extends React.Component {
  
  constructor(props) {
    super(props);    
    this.state = {
      key: getCurr(this.props.curr).currentPublicKey,
    }
    this.renderCanvas = this.renderCanvas.bind(this);
  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps.curr !== this.props.curr) {
      this.renderCanvas()
    }
  }

  componentDidMount() {
    this.renderCanvas()
  }

  renderCanvas() { 
    const key = getCurr(this.props.curr).currentPublicKey
    this.setState({key: key, })
    QRCode.toCanvas(document.getElementById('canvas'), key, function (error) {
      if (error) console.error(error)
    })
  }
  render () {

    return (
    <div>
      <h2>Receive Crypto</h2>
      <Button className="btn btn-primary" size="lg" onClick={this.renderCanvas}>Receive Currency</Button> 
      <h2>{this.state.key}</h2>
      <canvas id="canvas" width="400" height="400" />
    </div>
    )
  }
}