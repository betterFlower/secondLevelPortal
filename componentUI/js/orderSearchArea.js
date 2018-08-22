/**
 * Created by zyb on 2016/12/14.
 */
import React from 'react'
import { FormGroup,ControlLabel,FormControl,Button,Row,Col } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import '../../componentUI/css/tableList.css'

const orderSearchArea = React.createClass({
  getInitialState(){
    return {
      orderId: "",
      date: "",
      status: "",
      startDate: "",
      endDate: ""
    };
  },
  componentDidMount: function(){
    // if($("#dateRange")[0]){
    //   $("#dateRange").daterangepicker({
    //     timePicker: false,
    //     maxDate: moment(),
    //     timePickerIncrement: 60,
    //     format: 'YYYY-MM-DD'
    //   });
    //   $('#dateRange').on('apply.daterangepicker',function() {
    //     this.setState({
    //       type2value:$("#dateRange").val()
    //     });
    //   }.bind(this));
    // }
  },
  inputOrderId(e){
    this.setState({
      orderId: e.target.value
    });
  },
  inputStatus(e){
    this.setState({
      status: e.target.value
    });
  },
  handleEvent(e, picker){
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
      date: picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD')
    });
  },
  submit(e){
    if(this.props.callback){
      this.props.callback(this);
    }
  },
  render(){
    let start = this.state.startDate ? this.state.startDate.format('YYYY-MM-DD') : "";
    let end = this.state.endDate ? this.state.endDate.format('YYYY-MM-DD') : "";
    let dateRange = start && end ? start + ' - ' + end : "";

    return (
      <div style={{overflow:"hidden"}}>
        <FormGroup controlId="formControlsText">
          <Row>
            <Col xs={4}>
              <FormControl type="text" placeholder="订单编号" onInput={this.inputOrderId}/>
            </Col>
            <Col xs={4}>
              <DateRangePicker
                startDate={this.state.startDate ? moment(new Date(this.state.startDate)) : moment(new Date())}
                endDate={this.state.endDate ? moment(new Date(this.state.endDate)) : moment(new Date())}
                onEvent={this.handleEvent}>
                <FormControl type="text" className="dateRange" placeholder="下单时间" value={dateRange} onInput={this.inputDate}/>
              </DateRangePicker>
            </Col>
            <Col xs={4}>
              <FormControl componentClass="select" placeholder="订单状态" onChange={this.inputStatus} style={{color:this.state.status?"#333":"#999"}}>
                <option value="" style={{color:"#999"}}>订单状态</option>
                <option value="other" style={{color:"#333"}}>已失效</option>
              </FormControl>
            </Col>
          </Row>
        </FormGroup>
        <Button onClick={this.submit}>查询</Button>
      </div>
    );
  }
});

module.exports = orderSearchArea;
