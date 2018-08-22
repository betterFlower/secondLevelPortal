/**
 * Created by hqer on 2016/12/23.
 */
import React from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'react-bootstrap'
import CheckBox from '../../componentUI/js/checkBox'

class ListTd extends React.Component{
    constructor(props){
        super(props);
        this.state = {s:false};
        this.handleClick = this.handleClick.bind(this);
        this.setMessageInfo = this.setMessageInfo.bind(this);
    }
    componentWillReceiveProps(newProps){
        if(newProps.isInverse===2&&this.props.isInverse!=2){
            this.setState({s:false});
        }else if(newProps.isInverse!=2&&newProps.isInverse!=this.props.isInverse){
            this.handleClick();
        }else if(newProps.data!=this.props.data&&this.state.s){
            this.setState({s:false});
        }
    }
    handleClick(){
        if(this.state.s){
            window.GLOBAL.action.message.del(this.props.data);
            this.setState({s:false});
        }else{
            window.GLOBAL.action.message.add(this.props.data);
            this.setState({s:true});
        }
    }
    render(){
        let dom;
        if(Object.prototype.toString.call(this.props.data) === '[object Array]'&&this.props.showKeyName==="btns"){
            dom = [];
            {this.props.data.map((item,i) => {
                if(item.type===1){
                    dom.push(<a className="PostBtn" key={i}>
                        <input type="hidden" value={item.url}/>
                        <span>{item.text}</span>
                    </a>);
                }else if(item.type===2){
                    dom.push(<a className="GetBtn" key={i}>
                        <input type="hidden" value={item.url}/>
                        <span>{item.text}</span>
                    </a>);
                }else{
                    dom.push(<Link to={item.url} key={i}>{item.text}</Link>);
                }
            })}
        }else if(this.props.showKeyName === "delCheck"){
            dom =(<CheckBox name="delCheck" s={this.state.s} v={this.state.s?this.props.data:""} onClick={this.handleClick}/>);
        }else if(this.state.isLong){
            dom = (<div className="ShowTxt">{this.props.data}</div>);
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
ListTd.defaultProps = {
    data:"",
    showKeyName:"",
    className:"",
    isInverse:false
};
class ListTr extends React.Component{
    render(){
        return(
            <tr className={this.props.className}>
                {this.props.showKey.map((item,i) => (
                    <ListTd data={this.props.data[item]} showKeyName={item} className={"th"+i} key={i} isInverse={this.props.isInverse}></ListTd>
                ))}
            </tr>
        )
    }
}
ListTr.defaultProps = {
    data:{},
    showKey:[],
    className:"",
    isInverse:false
};
class DelListBasic extends React.Component{
    constructor(props){
        super(props);
        this.state = {s:0};
        this.Inverse = this.Inverse.bind(this);
    }
    componentWillReceiveProps(newProps){
        if(newProps.data!=this.props.data){
            this.setState({s:2});
        }
    }
    Inverse(){
        if(this.state.s === 1){
            this.setState({s:0});
        }else{
            this.setState({s:1});
        }
    }
    render() {
        let data = [];
        if(this.props.data.length){
            this.props.data.map((element,index) => {
                data.push(<ListTr data={element} key={index} showKey={this.props.showKey} className={index%2===0?"bgGray":""} isInverse={this.state.isInverse}></ListTr>)
            })
        }else{
            data.push(<tr><td className="noData">{this.props.noDataTips}</td></tr>);
        }
        let title=[];
        let state = false;
        if(this.state.s===1){
            state = true;
        }
        {this.props.title.map((item,i) => {
            if(item === "delAllCheck"){
                title.push(<th className={"th"+i} key={i}><div className="ShowTxt"><CheckBox name="delAllCheck" s={state} onClick={this.Inverse}/></div></th>);
            }else{
                title.push(<th className={"th"+i} key={i}><div className="ShowTxt">{item}</div></th>);
            }
        })}
        return (
            <Table striped bordered hover responsive className="basicList">
                <thead>
                    <tr>
                        {title}
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </Table>
        )
    }
}
DelListBasic.propTypes = {
    title: React.PropTypes.array.isRequired,
    showKey: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    noDataTips: React.PropTypes.string.isRequired
};
DelListBasic.defaultProps = {
    title:[],
    showKey:[],
    data:[],
    noDataTips:"暂无数据"
};
module.exports = DelListBasic;