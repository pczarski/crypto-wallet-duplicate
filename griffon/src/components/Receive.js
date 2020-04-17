import React from 'react';
import '../styles/App.scss';
import {getCurr} from '../lib/backendHandler'
import QRCode from 'qrcode';

import {Card, CardBody} from 'reactstrap';

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
    <div className="container">
      
      <Card body className="text-center bg-dark text-white ">
        <h2>Receive {this.props.curr}</h2>
        
        <CardBody>
        <h2>{this.state.key}</h2>
        <canvas id="canvas" width="400" height="400" />
        </CardBody>
      </Card>
    </div>
    )
  }
}