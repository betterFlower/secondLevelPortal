/**
 * Created by zyb on 2016/12/14.
 */
import React from 'react'
import { Table } from 'react-bootstrap'

const tableList = React.createClass({
  getInitialState(){
    return {
      data: []
    };
  },
  componentDidMount(){
    if(this.props.data){
      this.setState({
        data: this.props.data
      });
    }
  },
  render(){
    let tableBody;
    if(this.state.data.length){
      tableBody = this.state.data.map((item)=>{
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.username}</td>
          </tr>
        );
      });
    }else{
      tableBody = (
        <tr>
          <td colSpan={4} style={{textAlign:"center"}}>没有数据！</td>
        </tr>
      );
    }

    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </Table>
    );
  }
});

module.exports = tableList;
