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
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Destination Address</th>
          <th>Origin Address</th>
          <th>Time</th>
          <th>Amount</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
      {Object.keys(this.state.records.sort((a, b) => a.id - b.id))
      .map((item, i) => {
        return (
        <tr key={i}>
            <td>{this.state.records[item].id}</td>
            <td>{this.state.records[item].destinationAddress}</td>
            <td>{this.state.records[item].originAddress}</td>
            <td>{this.state.records[item].time}</td>
            <td>{this.state.records[item].transactionAmount}</td>
            <td>{this.state.records[item].type}</td>
        </tr>)})}
      </tbody>
    </Table>
    </div>
    )
  }
}