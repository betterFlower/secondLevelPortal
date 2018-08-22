/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'
import Reflux from 'reflux'
Reflux.defineReact(React);

import { Link,hashHistory } from 'react-router'
import { Button,Table,ButtonToolbar,DropdownButton,Dropdown,MenuItem,Row,Col} from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import PageArea from '../componentUI/js/pageArea'
import Tips from '../componentUI/js/tips'
import '../store/orderManage'

class ListTd extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.del = this.del.bind(this);
    this.close = this.close.bind(this);
    this.verifyClose = this.verifyClose.bind(this);
    this.setMessageInfo = this.setMessageInfo.bind(this);
  }
  setMessageInfo(){
    window.GLOBAL.action.orderManage.saveInfo();
  }
  del(){
    window.GLOBAL.action.orderManage.delItem(this.props.appId);
  }
  close(){
    window.GLOBAL.action.orderManage.closeItem(this.props.appId);
  }
  verifyClose(){
    window.GLOBAL.action.orderManage.verifyCloseItem(this.props.appId);
  }
  render(){
    let dom;
    if(this.props.showKeyName==="btns"){
      dom = [];
      if(this.props.data.length){
        {this.props.data.map((item,i) => {
          if(this.props.status===7&&item.text!=="详情"){
            dom.push(<div className="line" style={{color:"#999"}} key={i}>{item.text}</div>);
          }else if(item.type===1&&item.text==="删除"){
            dom.push(<Button bsStyle="link" key={i} onClick={this.del}>{item.text}</Button>);
          }else if(item.type===1&&item.text==="退订"){
            dom.push(<Button bsStyle="link" key={i} onClick={this.close}>{item.text}</Button>);
          }else if(item.type===1&&item.text==="确认退订"){
            dom.push(<Button bsStyle="link" key={i} onClick={this.verifyClose}>{item.text}</Button>);
          }else if(item.type===3&&item.text==="详情"){
            dom.push(<Link role="button" className="btn btn-link" to={"/orderItemDetail/"+item.url} onClick={this.setMessageInfo} key={i}>{item.text}</Link>);
          }
        })}
      }else{
        dom.push(<span key={0}>--</span>)
      }
    }else if(Object.prototype.toString.call(this.props.data) === '[object Array]'){
      dom = [];
      {this.props.data.map((item,i) => {
        dom.push(<div className="line" key={i}>{item}</div>);
      })}
    }else{
      dom = (<div className="ShowTxt">{this.props.data}</div>);
    }
    return(
        <td className={this.props.className}>
          {dom}
        </td>
    )
  }
}
class ListTr extends React.Component{
  render(){
    return(
        <tr className={this.props.className}>
          {this.props.showKey.map((item,i) => (
              <ListTd status={this.props.data['status']} appId={this.props.data['orderId']} data={this.props.data[item]} showKeyName={item} className={"th"+i} key={i}></ListTd>
          ))}
        </tr>
    )
  }
}
class OrderManageList extends React.Component{
  render() {
    let orderManage = window.GLOBAL.pageData.orderManage;
    let data = [];
    if(this.props.data.length){
      this.props.data.map((element,index) => {
        data.push(
          <tr key={index*2}>
            <td colSpan={this.props.showKey.length} style={{backgroundColor:element.type===1?"#e6fbf4":"#fbfbfb"}}>
                <div className="fl" style={{width:"10%"}}>
                  <div className={"icon type"+element.status}>
                    <div className="iconBg"></div>
                    <div className="iconText">{
                      orderManage.status.map((item,i) => {
                        if(item.value===element.status){
                          return item.text;
                        }
                      })
                    }
                    </div>
                  </div>
                </div>
                <div className="fl" style={{width:"30%"}}>
                  <span className="text fl">订单编号：</span>
                  <span className="text fl">{element.orderId}</span>
                </div>
                <div className="fl" style={{width:"30%"}}>
                  <span className="text fl">下单时间：</span>
                  <span className="text fl">{element.time0}</span>
                </div>
                <div className="fl" style={{width:"30%"}}>
                  <span className="text fl">有效期：</span>
                  <span className="text fl">{element.validity}</span>
                </div>
            </td>
          </tr>
        );
        data.push(<ListTr data={element} key={index*2+1} showKey={this.props.showKey} className={index%2===0?"bgGray":""}></ListTr>)
      })
    }else{
      data.push(<tr key={0}><td className="noData" colSpan={this.props.title.length}>{this.props.noDataTips}</td></tr>);
    }
    return (
        <Table condensed responsive className="basicList">
          <thead>
          <tr>
            {this.props.title.map((item,i) => (
                <th className={"th"+i} key={i}>{item}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data}
          </tbody>
        </Table>
    )
  }
}
OrderManageList.propTypes = {
  title: React.PropTypes.array.isRequired,
  showKey: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  noDataTips: React.PropTypes.string.isRequired
};
OrderManageList.defaultProps = {
  title:[],
  showKey:[],
  data:[],
  noDataTips:"暂无数据"
};


class orderManage extends Reflux.Component{
  constructor(props) {
    super(props);
    this.state = {
      orderId:"",
      ability:"",
      orderName:"",
      status:"",
      time0:"",
      isSearch:false,
      data:[],
      abilityList:[]
    };
    this.store = window.GLOBAL.store.orderManage;
    this._getInfo = this._getInfo.bind(this);
    this.setOrderId = this.setOrderId.bind(this);
    this.setAbility = this.setAbility.bind(this);
    this.setOrderName = this.setOrderName.bind(this);
    this.selectStatus = this.selectStatus.bind(this);
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleClose =  this.handleClose.bind(this);
    this.handleVerifyClose =  this.handleVerifyClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEvent0 = this.handleEvent0.bind(this);

  }
  componentDidMount(){
    window.GLOBAL.action.orderManage.init();
    let parms = {
      orderId:this.state.orderId,
      ability:this.state.ability,
      orderName:this.state.orderName,
      status:this.state.status,
      time0:this.state.time0,
      isSearch:this.state.isSearch,
      pageNow:this.state.pageNow,
      showTips:0
    };
    if(this.props.location.query&&this.props.location.query.ability){
      parms.ability = this.props.location.query.ability;
      parms.isSearch = true;
    }
    if(this.props.location.query&&this.props.location.query.status){
      parms.status=this.props.location.query.status*1;
      parms.isSearch = true;
    }
    this._getInfo(parms);
  }
  _getInfo(parms){
    window.GLOBAL.action.orderManage.init();
    window.GLOBAL.ajaxMap.setParms("searchOrderManage",parms);
    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("searchOrderManage");
    ajax.success=function(r){
      this.setState({
        orderId:parms.orderId,
        ability:parms.ability,
        orderName:parms.orderName,
        status:parms.status,
        time0:parms.time0,
        isSearch:parms.isSearch,
        showTips:parms.showTips,
        pageNow:r.totalPage<parms.pageNow?r.totalPage:parms.pageNow,
        totalPage:r.totalPage,
        data:r.data,
        delId:parms.delId
      });
    }.bind(this);
    $.ajax(ajax);
  }
  setOrderId(event){
    let _eT = event.srcElement?event.srcElement:event.target;
    let _val = _eT.value;
    this.setState({orderId:_val});
  }
  setAbility(event){
    let _eT = event.srcElement?event.srcElement:event.target;
    let _val = _eT.value;
    this.setState({ability:_val});
  }
  setOrderName(event){
    let _eT = event.srcElement?event.srcElement:event.target;
    let _val = _eT.value;
    this.setState({orderName:_val});
  }
  selectStatus(eventKey){
    this.setState({status:eventKey});
  }
  search(){
    let parms ={
      orderId:this.state.orderId,
      ability:this.state.ability,
      orderName:this.state.orderName,
      status:this.state.status,
      time0:this.state.time0,
      isSearch:true,
      showTips:0,
      pageNow:1,
      delId:[]
    };
    if(parms.orderId===""&&parms.ability===""&&parms.orderName===""&&parms.status===""&&parms.time0===""){
      parms.isSearch = false;
    }
    this._getInfo(parms);
  }
  clear(){
    let parms ={
      orderId:"",
      ability:"",
      orderName:"",
      status:"",
      time0:"",
      isSearch:false,
      showTips:0,
      pageNow:1,
      delId:[]
    };
    this._getInfo(parms);
  }
  handleSelect(pageNow){
    let parms ={
      orderId:this.state.orderId,
      ability:this.state.ability,
      orderName:this.state.orderName,
      status:this.state.status,
      time0:this.state.time0,
      isSearch:this.state.isSearch,
      showTips:0,
      delId:"",
      closeId:"",
      pageNow:pageNow
    };
    this._getInfo(parms);
  }
  handleDel(){
    let parms = {orderId:this.state.delId,token:window.GLOBAL.token};
    window.GLOBAL.ajaxMap.setParms("delOrderItem",parms);
    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("delOrderItem");
    ajax.success=function(r){
      if(r.code===3){
        window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
      }else if(r.code){
        this.handleSelect(this.state.pageNow);
      }
    }.bind(this);
    $.ajax(ajax);
  }
  handleClose(){
    window.GLOBAL.ajaxMap.setParm("closeOrderItem",'orderId',this.state.closeId);
    window.GLOBAL.ajaxMap.setParm("closeOrderItem",'token',window.GLOBAL.token);
    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("closeOrderItem");
    ajax.success=function(r){
      if(r.code===3){
        window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
      }else if(r.code){
        this.handleSelect(this.state.pageNow);
      }
    }.bind(this);
    $.ajax(ajax);
  }
  handleVerifyClose(){
    window.GLOBAL.ajaxMap.setParm("verifyCloseOrderItem",'orderId',this.state.closeId);
    window.GLOBAL.ajaxMap.setParm("verifyCloseOrderItem",'token',window.GLOBAL.token);
    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("verifyCloseOrderItem");
    ajax.success=function(r){
      if(r.code===3){
        window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
      }else if(r.code){
        this.handleSelect(this.state.pageNow);
      }
    }.bind(this);
    $.ajax(ajax);
  }
  handleCancel(){
    console.log("1111111111111111");
    this.setState({showTips:0});
  }
  handleEvent0(event, picker){
    if(event.type==="apply"){
      this.setState({
        time0: picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD')
      });
    }
  }
  render() {
    let orderManage = window.GLOBAL.pageData.orderManage;
    let status = "";
    let dateRangePickerData;
    if(!this.props.children){
      orderManage.status.map((item,i) => {
        if(item.value===this.state.status){
          status = item.text;
        }
      });
      dateRangePickerData ={
        maxDate:moment(),
        locale: window.GLOBAL.pageData.dateRangePickerLocale
      }
    }
    return (
        <div>
          {this.props.children?this.props.children:(
              <div className="orderManage">
                <div className="MainTitle">
                  <h1>{orderManage.title}</h1>
                </div>
                <div className="whiteSpace">
                  <div className="searchArea">
                    <ButtonToolbar>
                      <Row>
                        <Col xs={4}>
                          <span className="text fl">订单编号：</span>
                          <input type="text" onChange={this.setOrderId} value={this.state.orderId}/>
                        </Col>
                        <Col xs={4}>
                          <span className="text fl">套餐名称：</span>
                          <input type="text" onChange={this.setOrderName} value={this.state.orderName}/>
                        </Col>
                        <Col xs={4}>
                          <span className="text fl">所属应用：</span>
                          <input type="text" onChange={this.setAbility} value={this.state.ability}/>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={4}>
                          <span className="text fl">订单状态：</span>
                          <Dropdown id="status">
                            <Dropdown.Toggle>
                              <input className="text" placeholder="请选择" style={{width:"143px",backgroundColor:"transparent",border:"0"}} disabled value={status}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {orderManage.status.map((item,i) => (
                                  <MenuItem eventKey={item.value} key={i} onSelect={this.selectStatus}>{item.text}</MenuItem>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                        <Col xs={4}>
                          <span className="text fl">下单时间：</span>
                          <DateRangePicker
                              className="dateRangeBox fl"
                              opens = "right"
                              applyClass="btn-primary"
                              dateLimit={dateRangePickerData.dateLimit}
                              locale={dateRangePickerData.locale}
                              maxDate={dateRangePickerData.maxDate}
                              onEvent={this.handleEvent0}>
                            <input type="text" className="dateRange" value={this.state.time0} readOnly/>
                          </DateRangePicker>
                        </Col>
                      </Row>
                      <Row className="center">
                        <Button bsStyle="primary" onClick={this.search}>查询</Button>
                        {this.state.isSearch?(<Button bsStyle="link" className="DelAllBtn" onClick={this.clear}>清除</Button>):""}
                      </Row>
                    </ButtonToolbar>
                  </div>
                </div>
                <div className="whiteSpace">
                  <OrderManageList
                      title={this.props.title}
                      data={this.state.data}
                      showKey={this.props.showKey}
                  />
                  <div>
                    <PageArea
                        totalPage={this.state.totalPage}
                        maxPage={3} pageNow={this.state.pageNow}
                        onSelect={this.handleSelect}
                        onSearch={this.handleSelect}
                    />
                  </div>
                </div>
                {this.state.showTips===1?(
                    <Tips {...orderManage.delOrderItem} onSubmit={this.handleDel} onCancel={this.handleCancel}/>
                ):(this.state.showTips===2?(
                    <Tips {...orderManage.closeOrderItem} onSubmit={this.handleClose} onCancel={this.handleCancel}/>
                ):(this.state.showTips===3?(
                        <Tips {...orderManage.closeOrderItem1} onSubmit={this.handleVerifyClose} onCancel={this.handleCancel}/>
                    ):""
                ))}
              </div>
          )}
        </div>
    )
  }
}
orderManage.propTypes = {
  title: React.PropTypes.array.isRequired,
  showKey: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired
};
orderManage.defaultProps = {
  title:window.GLOBAL.pageData.orderManage.listTitle,
  showKey:window.GLOBAL.pageData.orderManage.showKey,
  data:[]
};
module.exports = orderManage;