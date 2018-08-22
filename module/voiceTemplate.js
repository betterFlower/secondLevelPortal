/**
 * Created by hqer on 2016/12/14.
 */
import React from 'react'
import Reflux from 'reflux'
Reflux.defineReact(React);

import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'

import { Button,Table,ButtonToolbar,DropdownButton,Dropdown,MenuItem,Row,Col,Glyphicon} from 'react-bootstrap'
import CheckBox from '../componentUI/js/checkBox'
import PageArea from '../componentUI/js/pageArea'
import Tips from '../componentUI/js/tips'
import '../store/voiceTemplate'


class ListTd extends React.Component{
    constructor(props){
        super(props);
        this.state = {s:false};
        this.handleClick = this.handleClick.bind(this);
        this.del = this.del.bind(this);
        this.repeal = this.repeal.bind(this);
        this.setMessageInfo = this.setMessageInfo.bind(this);
    }
    componentWillReceiveProps(newProps){
        if(newProps.isInverse===2&&this.props.isInverse!=2){
            this.setState({s:false});
        }else if(newProps.isInverse!=2&&newProps.isInverse!=this.props.isInverse&&newProps.type===0&&newProps.showKeyName === "delCheck"){
            this.handleClick();
        }else if(newProps.data!=this.props.data){
            this.setState({s:false});
        }
    }
    handleClick(){
        if(this.state.s){
            window.GLOBAL.action.voiceTemplate.del(this.props.data);
            this.setState({s:false});
        }else{
            window.GLOBAL.action.voiceTemplate.add(this.props.data);
            this.setState({s:true});
        }
    }
    setMessageInfo(){
        window.GLOBAL.action.voiceTemplate.saveInfo();
    }
    del(){
        window.GLOBAL.action.voiceTemplate.showTips(2,this.props.appId);
    }
    repeal(){
        window.GLOBAL.action.voiceTemplate.showTips(3,this.props.appId);
    }
    render(){
        return(
            <td className={this.props.className}>
                {this.props.showKeyName === "name"?(
                    <Link title={this.props.data}>
                        <div className={this.props.type===1?"ShowTxt short":"ShowTxt"}>{this.props.data}</div>
                        {this.props.type===1?(
                            <div className="icon">
                                <div className="iconBg"></div>
                                <div className="iconText">试用</div>
                            </div>
                        ):""}
                    </Link>
                ):(this.props.showKeyName === "delCheck"?(
                        this.props.type===0?(
                            <CheckBox name="delCheck" s={this.state.s} v={this.state.s?this.props.data:""} onClick={this.handleClick}/>
                        ):(
                            <CheckBox name="delCheck" s={this.state.s} v={this.state.s?this.props.data:""} disabled/>
                        )
                    ):(this.props.showKeyName === "btns"?(
                        this.props.data.length?(
                            this.props.data.map((item,i) => (
                                item.type===1&&item.text==="删除"?(
                                    <Link className="green" key={i} onClick={this.del}>{item.text}</Link>
                                ):(item.type===1&&item.text==="撤回"?(
                                        <Link className="green" key={i} onClick={this.repeal}>{item.text}</Link>
                                    ):(item.type===3&&item.text==="详情"?(
                                            <Link className="green" to={"/voiceTemplateDetail"+item.url} onClick={this.setMessageInfo} key={i}>{item.text}</Link>
                                        ):(
                                            <Link className="green" to={"/voiceTemplateModify"+item.url} onClick={this.setMessageInfo} key={i}>{item.text}</Link>
                                        )
                                    )
                                )
                            ))
                        ):(
                            <span>--</span>
                        )
                    ):(this.props.showKeyName === "time"?(
                            this.props.data?(
                                <div className="blockTxt">{this.props.data}</div>
                            ):"--"
                        ):(
                            this.props.data
                        )
                    ))
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
                    <ListTd key={i} data={item==="appId"?this.props.data["delCheck"]:this.props.data[item]} type={this.props.data["status"]==="审核中"&&this.props.data['type']!=1?2:this.props.data['type']} appId={this.props.data['delCheck']} showKeyName={item} className={"th"+i} isInverse={this.props.isInverse}></ListTd>
                ))}
            </tr>
        )
    }
}
class DelVoiceTemplate extends React.Component{
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
        return (
            <div className="delList">
                <Table striped hover responsive className="basicList">
                    <thead>
                    <tr>
                        {this.props.title.map((item,i) => (
                            item === "delAllCheck"?(
                                <th className={"th"+i} key={i}><CheckBox name="delAllCheck" s={this.state.s===1?true:false} onClick={this.Inverse}/></th>
                            ):(
                                <th className={"th"+i} key={i}>{item}</th>
                            )
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.length?(
                        this.props.data.map((element,index) => (
                            <ListTr data={element} key={index} showKey={this.props.showKey} className={index%2===0?"bgGray":""} isInverse={this.state.s}></ListTr>
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
DelVoiceTemplate.propTypes = {
    title: React.PropTypes.array.isRequired,
    showKey: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    noDataTips: React.PropTypes.string.isRequired
};
DelVoiceTemplate.defaultProps = {
    title:[],
    showKey:[],
    data:[],
    noDataTips:"暂无数据"
};

class voiceTemplate extends Reflux.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchItem:0,
            searchItem1:"",
            status:-1,
            isShowNew:0,
            isSearch:false,
            data:this.props.data
        };
        this.store = window.GLOBAL.store.voiceTemplate;
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelAll = this.handleDelAll.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showTips1 = this.showTips1.bind(this);
        this.setMessageInfo =this.setMessageInfo.bind(this);
        this.search = this.search.bind(this);
        this.clear = this.clear.bind(this);
        this.setSearchItem1 = this.setSearchItem1.bind(this);
        this.selectSearchItem = this.selectSearchItem.bind(this);
        this.selectSearchStatus = this.selectSearchStatus.bind(this);
        this.handleRepeal = this.handleRepeal.bind(this);
    }
    componentDidMount(){
        window.GLOBAL.action.voiceTemplate.init();
        let parms = {
            searchItem:0,
            searchItem1:"",
            status:-1,
            pageNow:this.state.pageNow,
            token:window.GLOBAL.token
        };
        window.GLOBAL.ajaxMap.setParms("searchVoiceTemplate",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("searchVoiceTemplate");
        ajax.success=function(r){
            this.setState({totalPage:r.totalPage,data:r.data,isShowNew:r.isShowNew});
        }.bind(this);
        $.ajax(ajax);
    }
    handleSelect(pageNow){
        let parms = {pageNow:pageNow, token:window.GLOBAL.token};
        if(this.state.isSearch){
            parms.searchItem = this.state.searchItem;
            parms.searchItem1 = this.state.searchItem1;
            parms.status = this.state.status;
        }
        window.GLOBAL.ajaxMap.setParms("searchVoiceTemplate",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("searchVoiceTemplate");
        ajax.success=function(r){
            this.setState({pageNow:pageNow,totalPage:r.totalPage,data:r.data,isShowNew:r.isShowNew});
            window.GLOBAL.action.voiceTemplate.init();
        }.bind(this);
        $.ajax(ajax);
    }
    handleDelAll(){
        let parms = {delId:JSON.stringify(this.state.delId),token:window.GLOBAL.token};
        window.GLOBAL.ajaxMap.setParms("delVoiceTemplate",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("delVoiceTemplate");
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
    showTips1(){
        this.setState({showTips:1});
    }
    setMessageInfo(){
        window.GLOBAL.action.voiceTemplate.saveInfo();
    }
    search(){
        let parms = {
            searchItem:this.state.searchItem,
            searchItem1:this.state.searchItem1,
            status:this.state.status,
            pageNow:1,
            token:window.GLOBAL.token
        };
        window.GLOBAL.ajaxMap.setParms("searchVoiceTemplate",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("searchVoiceTemplate");
        ajax.success=function(r){
            if(this.state.searchItem1===""&&this.state.status===-1){
                this.setState({pageNow:1,totalPage:r.totalPage,data:r.data,isShowNew:r.isShowNew,isSearch:false});
            }else{
                this.setState({pageNow:1,totalPage:r.totalPage,data:r.data,isShowNew:r.isShowNew,isSearch:true});
            }
            window.GLOBAL.action.voiceTemplate.init();
        }.bind(this);
        $.ajax(ajax);
    }
    clear(){
        let parms = {
            searchItem:0,
            searchItem1:"",
            status:-1,
            pageNow:1,
            token:window.GLOBAL.token};
        window.GLOBAL.ajaxMap.setParms("searchVoiceTemplate",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("searchVoiceTemplate");
        ajax.success=function(r){
            this.setState({
                pageNow:1,
                searchItem:0,
                searchItem1:"",
                status:-1,
                totalPage:r.totalPage,
                data:r.data,
                isShowNew:r.isShowNew,
                isSearch:false
            });
            window.GLOBAL.action.voiceTemplate.init();
        }.bind(this);
        $.ajax(ajax);
    }
    setSearchItem1(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        this.setState({searchItem1:_val});
    }
    selectSearchItem(eventKey){
        let _i = eventKey*1;
        let voiceTemplate = window.GLOBAL.pageData.voiceTemplate;
        if(voiceTemplate.searchItem[_i].value!=this.state.searchItem){
            this.setState({searchItem:voiceTemplate.searchItem[_i].value})
        }
    }
    selectSearchStatus(eventKey){
        let _i = eventKey*1;
        let voiceTemplate = window.GLOBAL.pageData.voiceTemplate;
        if(voiceTemplate.status[_i].value!=this.state.status){
            this.setState({status:voiceTemplate.status[_i].value})
        }
    }
    handleRepeal(){
        let parms = {repealId:JSON.stringify(this.state.delId),token:window.GLOBAL.token};
        window.GLOBAL.ajaxMap.setParms("repealVoiceTemplate",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("repealVoiceTemplate");
        ajax.success=function(r){
            if(r.code===3){
                window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
            }else if(r.code){
                this.handleSelect(this.state.pageNow);
            }
        }.bind(this);
        $.ajax(ajax);
    }
    render() {
        let voiceTemplate = window.GLOBAL.pageData.voiceTemplate;
        let tips;
        if(!this.props.children){
            if(this.state.showTips===1){
                tips = (<Tips className={voiceTemplate.delTemplate.className} onSubmit={this.handleDelAll} onCancel={this.handleCancel} text={"确认删除已选中的"+this.state.delId.length+"个模板?"}/>)
            }else if(this.state.showTips===2){
                tips = (<Tips className={voiceTemplate.delTemplate.className} onSubmit={this.handleDelAll} onCancel={this.handleCancel} text={voiceTemplate.delTemplate.text}/>)
            }else if(this.state.showTips===3){
                tips = (<Tips className={voiceTemplate.cancelTemplate.className} onSubmit={this.handleRepeal} onCancel={this.handleCancel} text={voiceTemplate.cancelTemplate.text}/>)
            }
        }
        return (
            <div>
                {this.props.children?this.props.children:(
                    <div className="voiceTemplate">
                        <div className="MainTitle">
                            <h1>
                                {voiceTemplate.title}
                                <div className="icon-help"></div>
                                <div className="titleTips">
                                    <div className="arrow">
                                        <em></em><span></span>
                                    </div>
                                    <p>1、用户可以自行定义模板短信或短信验证码内容，调用时需要配合短信签名使用。</p>
                                    <p>2、短信内容需通过审核后方可使用，审核周期为1个工作日。</p>
                                    <p>3、个人/企业开发者创建短信模板的个数不受限制。</p>
                                </div>
                            </h1>
                            {this.state.isShowNew===1?(<Link to="/voiceTemplateAdd" role="button" className="btn btn-success"  onClick={this.setMessageInfo}>新建模板</Link>):""}
                        </div>
                        <div className="whiteSpace">
                            <div className="searchArea">
                                <ButtonToolbar>
                                    <Row>
                                        <Col xs={4}>
                                            <Dropdown id="searchItem">
                                                <Dropdown.Toggle>
                                                    <span className="text" style={{width:"60px"}}>{this.state.searchItem!=-1?voiceTemplate.searchItem[this.state.searchItem].text:""}</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {voiceTemplate.searchItem.map((item,i) => (
                                                        <MenuItem eventKey={i} key={i} onSelect={this.selectSearchItem}>{item.text}</MenuItem>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <input className="searchItem" type="text" value={this.state.searchItem1} onChange={this.setSearchItem1}/>
                                        </Col>
                                        <Col xs={4}>
                                            <div className="fl">模板状态：</div>
                                            <Dropdown id="searchStatus">
                                                <Dropdown.Toggle >
                                                    <span className="text" style={{width:"108px"}}>{this.state.status!=-1?voiceTemplate.status[this.state.status].text:""}</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {voiceTemplate.status.map((item,i) => (
                                                        <MenuItem eventKey={i} key={i} onSelect={this.selectSearchStatus}>{item.text}</MenuItem>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col xs={4}>
                                            <Button className="fl" bsStyle="primary" onClick={this.search}>查询</Button>
                                            {this.state.isSearch?(<Button className="fl" bsStyle="link" onClick={this.clear}>清除</Button>):""}
                                        </Col>
                                    </Row>
                                </ButtonToolbar>
                            </div>
                        </div>
                        <div className="whiteSpace">
                            <DelVoiceTemplate
                                title={this.props.title}
                                data={this.state.data}
                                showKey={this.props.showKey}
                            />
                            <div>
                                {this.state.showDel?(<Button className="DelAllBtn" onClick={this.showTips1}>批量删除</Button>):""}
                                <PageArea
                                    totalPage={this.state.totalPage}
                                    maxPage={3} pageNow={this.state.pageNow}
                                    onSelect={this.handleSelect}
                                    onSearch={this.handleSelect}
                                />
                            </div>
                        </div>
                        {tips}
                    </div>
                )}
            </div>
        )
    }
}
voiceTemplate.propTypes = {
    title: React.PropTypes.array.isRequired,
    showKey: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired
};
voiceTemplate.defaultProps = {
    title:window.GLOBAL.pageData.voiceTemplate.listTitle,
    showKey:window.GLOBAL.pageData.voiceTemplate.showKey,
    data:[]
};
module.exports = voiceTemplate;