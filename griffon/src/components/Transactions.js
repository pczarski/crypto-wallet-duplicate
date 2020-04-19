import React from 'react';
import '../styles/App.scss';
 
import { Table } from 'reactstrap';

import {getRecords} from '../lib/backendHandler';

// TO DO:
// VALIDATION, can't be empty
// 

export default class Transactions extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
        records: getRecords(this.props.curr).records
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.curr !== this.props.curr) {
      this.setState({records: getRecords(this.props.curr).records})
    }
  }
  componentDidMount () {
  }

  render () { 

    return (
    <div>
    <table className="tabld" >
      <thead>
        <tr>
          <th className='header' >ID</th>
          <th className='header' >DESTINATION ADDRESS</th>
          <th className='header' >ORIGIN ADDRESS</th>
          <th className='header' >TIME</th>
          <th className='header' >AMOUNT</th>
          <th className='header' >TYPE</th>
        </tr>
      </thead>
      <tbody>
      {Object.keys(this.state.records.sort((a, b) => a.id - b.id))
      .map((item, i) => {
        const type = this.state.records[item].type;
        return (
        <tr key={i} >

            <td>{this.state.records[item].id}</td>
            <td>{this.state.records[item].destinationAddress}</td>
            <td>{this.state.records[item].originAddress}</td>
            <td>{this.state.records[item].time}</td>
            <td>{this.state.records[item].transactionAmount}</td>
            <td style={(type === "SEND") ? {color:'#f04747'} : {color: '#43b581'}
            }
            >{this.state.records[item].type}</td>
        </tr>)})}
      </tbody>
    </table>
    </div>
    )
  }
}