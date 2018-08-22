/**
 * Created by hqer on 2016/12/21.
 */
import React from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'react-bootstrap'

class listTd extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLong:false};
    }
    render(){
        let dom;
        if(this.props.showKeyName==="btns"){
            dom = [];
            if(this.props.data.length){
                {this.props.data.map((item,i) => {
                    dom.push(<Link to={"/statisticsDetail"+item.url} onClick={this.setMessageInfo} key={i}>{item.text}</Link>)
                })}
            }else{
                dom.push(<span key={0}>--</span>)
            }
            {this.props.data.map((item,i) => {
                if(item.type===1){
                    dom.push(<a className="PostBtn">
                        <input type="hidden" value={item.url}/>
                        <span>{item.text}</span>
                    </a>);
                }else if(item.type===2){
                    dom.push(<a className="GetBtn">
                        <input type="hidden" value={item.url}/>
                        <span>{item.text}</span>
                    </a>);
                }else{
                    dom.push(<link to={item.url}>{item.text}</link>);
                }
            })}
        }else if(this.state.isLong){
            dom = (<a title={this.props.data} href="javascript:void(this);">
                <div className="ShowTxt">{this.props.data}</div>
                <div className="hidTxt">{this.props.data}</div>
            </a>);
        }else{
            dom = (<a>
                <div className="ShowTxt">{this.props.data}</div>
                <div className="hidTxt">{this.props.data}</div>
            </a>);
        }
        return(
            <td className={this.props.className}>
                {dom}
            </td>
        )
    }
}

class listTr extends React.Component{
    render(){
        return(
            <tr className={this.props.className}>
                {this.props.showKey.map((item,i) => (
                    <listTd data={this.props.data[item]} showKeyName={item} className={"th"+i} key={i}></listTd>
                ))}
            </tr>
        )
    }
}

class listBasic extends React.Component{
    render() {
        let data = [];
        if(this.props.data.length){
            this.props.data.map((element,index) => {
                data.push(<listTr data={element} key={index} showKey={this.props.showKey} className={index%2===0?"bgGray":""}></listTr>)
            })
        }else{
            data.push(<tr><td className="noData">{this.props.noDataTips}</td></tr>);
        }
        return (
            <Table striped bordered hover responsive className="basicList">
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
listBasic.propTypes = {
    title: React.PropTypes.array.isRequired,
    showKey: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    noDataTips: React.PropTypes.string.isRequired
};
listBasic.defaultProps = {
    title:[],
    showKey:[],
    data:[],
    noDataTips:"暂无数据"
};
module.exports = listBasic;