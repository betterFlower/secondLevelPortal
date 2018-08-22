/**
 * Created by hqer on 2016/12/14.
 */
import React from 'react'
import Reflux from 'reflux'
Reflux.defineReact(React);

import { findDOMNode } from 'react-dom'
import { Link,hashHistory } from 'react-router'

import { Button,Table } from 'react-bootstrap'
import CheckBox from '../componentUI/js/checkBox'
import PageArea from '../componentUI/js/pageArea'
import Tips from '../componentUI/js/tips'
import '../store/myApps'


class ListTd extends React.Component{
    constructor(props){
        super(props);
        this.state = {s:false,s0:false,s1:false};
        this.handleClick = this.handleClick.bind(this);
        this.showOrHidApiKey = this.showOrHidApiKey.bind(this);
        this.showOrHidSecretKey = this.showOrHidSecretKey.bind(this);
        this.del = this.del.bind(this);
        this.del1 = this.del1.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
        this.setMessageInfo = this.setMessageInfo.bind(this);
        this.reSecretKey = this.reSecretKey.bind(this);
    }
    componentWillReceiveProps(newProps){
        if(newProps.data!=this.props.data){
            this.setState({s:false,s0:false,s1:false});
        }
    }
    handleClick(){
        if(this.state.s){
            window.GLOBAL.action.myApps.del(this.props.data);
            this.setState({s:false});
        }else{
            window.GLOBAL.action.myApps.add(this.props.data);
            this.setState({s:true});
        }
    }
    showOrHidApiKey(){
        if(this.state.s0){
            this.setState({s0:false});
        }else{
            this.setState({s0:true});
        }
    }
    showOrHidSecretKey(){
        if(this.state.s1){
            this.setState({s1:false});
        }else{
            this.setState({s1:true});
        }
    }
    setMessageInfo(){
        window.GLOBAL.action.myApps.saveInfo();
    }
    reSecretKey(){
        window.GLOBAL.action.myApps.showTips(1,this.props.appId);
    }
    del(){
        window.GLOBAL.action.myApps.showTips(2,this.props.appId);
    }
    del1(){
        window.GLOBAL.action.myApps.showTips(4,this.props.appId);
    }
    cancel(){
        window.GLOBAL.action.myApps.cancel(this.props.appId);
    }
    submit(){
        window.GLOBAL.action.myApps.submit(this.props.appId);
    }
    render(){
        let myApps = window.GLOBAL.pageData.myApps;
        return(
            <td className={this.props.className}>
                {this.props.showKeyName === "title"?(
                    <Link className="link" title={this.props.data.text} to={"/myAppsDetail/"+this.props.data.url} onClick={this.setMessageInfo}>
                        <div className="ShowTxt">{this.props.data.text}</div>
                    </Link>
                ):(
                    this.props.showKeyName === "parms"?(
                        <div className="lineBox">
                            <div className="line">
                                <div className="t1 fl">API Key: </div>
                                <div className="t2 fl" style={{maxWidth:"265px",overflow:"hidden"}}>{this.state.s0?this.props.data.apiKey:myApps.hid}</div>
                                <div className={this.state.s0?"icon-eye fl":"icon-eye-close fl"} onClick={this.showOrHidApiKey}></div>
                            </div>
                            <div className="line">
                                <div className="t1 fl">Secret Key: </div>
                                <div className="t2 fl" style={{maxWidth:"265px",overflow:"hidden"}}>{this.state.s1?(this.props.reSecretKey!==""?this.props.reSecretKey:this.props.data.secretKey):myApps.hid}</div>
                                <div className={this.state.s1?"icon-eye fl":"icon-eye-close fl"} onClick={this.showOrHidSecretKey}></div>
                                {this.props.status===1||this.props.status===5||this.props.status===6||this.props.status===7?(
                                    <div className="icon-reApiKey fl" onClick={this.reSecretKey}></div>
                                ):""}
                            </div>
                        </div>
                    ):(
                        this.props.showKeyName === "btns"?(
                            this.props.data.map((item,i) => (
                                this.props.status===2?(
                                    <Link key={i}>{item.text}</Link>
                                ):(
                                    item.type===1&&item.text==="撤回"?(
                                        <Link className="green" key={i} onClick={this.cancel}>{item.text}</Link>
                                    ):(
                                        item.type===1&&item.text==="提交"?(
                                            <Link className="green" key={i} onClick={this.submit}>{item.text}</Link>
                                        ):(
                                            item.type===1&&item.text==="删除"&&this.props.status===5?(
                                                <Link className="green" key={i} onClick={this.del1}>{item.text}</Link>
                                            ):(
                                                item.type===1&&item.text==="删除"?(
                                                    <Link className="green" key={i} onClick={this.del}>{item.text}</Link>
                                                ):(
                                                    item.type===3&&item.text==="修改"?(
                                                        <Link className="green" to={"/myAppsModify/"+item.url} key={i}>{item.text}</Link>
                                                    ):""
                                                )
                                            )
                                        )
                                    )
                                )
                            ))
                        ):(
                            this.props.showKeyName === "status"?(
                                myApps.status.map((item,i) => (
                                    item.value === this.props.data?(item.text):""
                                ))
                            ):(
                                this.props.showKeyName === "date"?(
                                    <div className="blockTxt">{this.props.data}</div>
                                ):(
                                    this.props.data
                                )
                            )
                        )

                    )
                )}
            </td>
        )
    }
}
class ListTr extends React.Component{
    render(){
        return(
            <tr className={this.props.className}>
                {this.props.showKey.map((item,i) =>(
                    <ListTd key={i} data={this.props.data[item]} status={this.props.data['status']} appId={this.props.data['delCheck']} showKeyName={item} className={"th"+i} reSecretKey={item==="parms"?this.props.reSecretKey:""}></ListTd>
                ))}
            </tr>
        )
    }
}
class MyAppsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {s:0};
    }
    componentWillReceiveProps(newProps){
        if(newProps.data!=this.props.data){
            this.setState({s:2});
        }
    }
    render() {
        return (
            <div className="delList">
                <Table striped hover responsive className="basicList">
                    <thead>
                    <tr>
                        {this.props.title.map((item,i) => (
                            <th className={"th"+i} key={i}>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.length?(
                        this.props.data.map((element,index) => (
                            <ListTr data={element} key={index} showKey={this.props.showKey} className={index%2===0?"bgGray":""} reSecretKey={element.delCheck===this.props.showId?this.props.reSecretKey:""}></ListTr>
                        ))
                    ):(
                        <tr><td className="noData" colSpan={this.props.title.length}>{this.props.noDataTips}</td></tr>
                    )}
                    </tbody>
                </Table>
            </div>
        )
    }
}
MyAppsList.propTypes = {
    title: React.PropTypes.array.isRequired,
    showKey: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    noDataTips: React.PropTypes.string.isRequired
};
MyAppsList.defaultProps = {
    title:[],
    showKey:[],
    data:[],
    noDataTips:"暂无数据"
};

class myApps extends Reflux.Component{
    constructor(props) {
        super(props);
        this.state = {
            isShowNew:0,
            data:this.props.data,
            reSecretKey:""
        };
        this.store = window.GLOBAL.store.myApps;
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelAll = this.handleDelAll.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleShowTips = this.handleShowTips.bind(this);
        this.changeSecretKey =this.changeSecretKey.bind(this);
        this.setMessageInfo =this.setMessageInfo.bind(this);
        this.showTips = this.showTips.bind(this);
        this.goToCertification = this.goToCertification.bind(this);

    }
    componentDidMount(){
        window.GLOBAL.action.myApps.init();
        let parms = {pageNow:this.state.pageNow, token:window.GLOBAL.token};
        window.GLOBAL.ajaxMap.setParms("myApps",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("myApps");
        ajax.success=function(r){
            this.setState({totalPage:r.totalPage,data:r.data,isShowNew:r.isShowNew,reSecretKey:""});
        }.bind(this);
        $.ajax(ajax);
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.children&&!this.props.children){
            window.GLOBAL.action.myApps.init();
            let parms = {pageNow:this.state.pageNow, token:window.GLOBAL.token};
            window.GLOBAL.ajaxMap.setParms("myApps",parms);
            let ajax = window.GLOBAL.ajaxMap.getAjaxParms("myApps");
            ajax.success=function(r){
                this.setState({totalPage:r.totalPage,data:r.data,isShowNew:r.isShowNew,reSecretKey:""});
            }.bind(this);
            $.ajax(ajax);
        }else if(this.state.eventType===1){
            let parms = {submitId:this.state.appId, token:window.GLOBAL.token};
            window.GLOBAL.ajaxMap.setParms("submitMyApps",parms);
            let ajax = window.GLOBAL.ajaxMap.getAjaxParms("submitMyApps");
            ajax.success=function(r){
                if(r.code===3){
                    window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
                }else if(r.code){
                    this.handleSelect(this.state.pageNow);
                }
            }.bind(this);
            $.ajax(ajax);
        }else if(this.state.eventType===2){
            let parms = {cancelId:this.state.appId, token:window.GLOBAL.token};
            window.GLOBAL.ajaxMap.setParms("cancelMyApps",parms);
            let ajax = window.GLOBAL.ajaxMap.getAjaxParms("cancelMyApps");
            ajax.success=function(r){
                if(r.code===3){
                    window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
                }else if(r.code){
                    this.handleSelect(this.state.pageNow);
                }
            }.bind(this);
            $.ajax(ajax);
        }
    }
    handleSelect(pageNow){
        let parms = {pageNow:pageNow, token:window.GLOBAL.token};
        window.GLOBAL.action.myApps.init();
        window.GLOBAL.ajaxMap.setParms("myApps",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("myApps");
        ajax.success=function(r){
            this.setState({pageNow:pageNow,totalPage:r.totalPage,data:r.data,isShowNew:r.isShowNew,reSecretKey:""});
        }.bind(this);
        $.ajax(ajax);
    }
    handleDelAll(){
        let parms = {delId:JSON.stringify(this.state.delId), token:window.GLOBAL.token};
        window.GLOBAL.ajaxMap.setParms("delMyApps",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("delMyApps");
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
        this.setState({showTips:0});
    }
    handleShowTips(){
        this.setState({showTips:2});
    }
    changeSecretKey(){
        let parms = {appId:this.state.showId,token:window.GLOBAL.token};
        window.GLOBAL.ajaxMap.setParms("reSecretKey",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("reSecretKey");
        ajax.success=function(r){
            if(r.code===3){
                window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
            }else if(r.code){
                this.setState({reSecretKey:r.secretKey,showTips:0});
            }
        }.bind(this);
        $.ajax(ajax);
    }
    setMessageInfo(){
        window.GLOBAL.action.myApps.saveInfo();
    }
    showTips(){
        this.setState({showTips:3});
    }
    goToCertification(){
        let _old = window.GLOBAL.oldUrl[window.GLOBAL.pageData.leftMenu.item3.child[2].key];
        let _url = _old.url;
        let _leftMenuId,_frameUrl,_type;
        if(_old&&_old.leftStatus){
            _leftMenuId = _old.leftStatus;
        }
        if(_old&&_old.frameUrl){
            _frameUrl = _old.frameUrl;
        }
        if(_old&&_old.type){
            _type = _old.type;
        }
        if(typeof _url ==="string"){
            if(typeof _type === "string"&&_type === "_blank"){
                window.open(_url);
            }else{
                if(typeof _leftMenuId === "string"){
                    sessionStorage.leftStatus = _leftMenuId;
                    if( typeof _frameUrl === "string"){
                        sessionStorage.frameUrl = encodeURIComponent(_frameUrl);
                    }
                }
                window.location.href = _url;
            }
        }
    }
    render() {
        let myApps = window.GLOBAL.pageData.myApps;
        let dom;
        if(!this.props.children){
            let tips;
            if(this.state.showTips===1){
                tips = (<Tips className={myApps.reSecretKey.className} onSubmit={this.changeSecretKey} onCancel={this.handleCancel} text={myApps.reSecretKey.text}/>)
            }else if(this.state.showTips===2){
                tips = (<Tips className={myApps.del.className} onSubmit={this.handleDelAll} onCancel={this.handleCancel} text={myApps.del.text}/>)
            }else if(this.state.showTips===4){
                tips = (<Tips className={myApps.del1.className} onSubmit={this.handleDelAll} onCancel={this.handleCancel} text={myApps.del1.text}/>)
            }else if(this.state.showTips===3){
                let myServer = window.GLOBAL.pageData.myServer;
                tips = (<Tips {...myServer.Unautherized} onSubmit={this.goToCertification} onCancel={this.handleCancel}/>)
            }
            dom =(<div className="myApps">
                <div className="MainTitle">
                    <h1>{myApps.title}</h1>
                    {this.state.isShowNew?(<Link to="/myAppsAdd" role="button" className="btn btn-success" onClick={this.setMessageInfo}>新建应用</Link>):(<Button bsStyle="success" onClick={this.showTips}>新建应用</Button>)}
                </div>
                <div className="whiteSpace">
                    <MyAppsList
                        title={this.props.title}
                        data={this.state.data}
                        showKey={this.props.showKey}
                        showId={this.state.showId}
                        reSecretKey={this.state.reSecretKey}
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
                {tips}
            </div>);
        }
        return (
            <div>
                {dom}
                {this.props.children}
            </div>
        )
    }
}
myApps.propTypes = {
    title: React.PropTypes.array.isRequired,
    showKey: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired
};
myApps.defaultProps = {
    title:window.GLOBAL.pageData.myApps.listTitle,
    showKey:window.GLOBAL.pageData.myApps.showKey,
    data:[]
};
module.exports = myApps;