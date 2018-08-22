/**
 * Created by hqer on 2016/12/26.
 */
import React from 'react'
import { Link,hashHistory } from 'react-router'
import { Button,ButtonToolbar,DropdownButton,Dropdown,MenuItem,} from 'react-bootstrap'
import Tips from '../componentUI/js/tips'
import MD5 from "md5"

class myAppsModify extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name:"",category:1,status:0,text:"",type:0,secretKey:"",apiKey:"",s0:false,s1:false,showTips:false};
        this.goToBack = this.goToBack.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.showOrHidApiKey = this.showOrHidApiKey.bind(this);
        this.showOrHidSecretKey = this.showOrHidSecretKey.bind(this);
        this.reSecretKey = this.reSecretKey.bind(this);
        this.submit = this.submit.bind(this);
        this.changeSecretKey = this.changeSecretKey.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.checkAppName = this.checkAppName.bind(this);
        this.checkAppText = this.checkAppText.bind(this);
        this.setAppName = this.setAppName.bind(this);
        this.setAppText = this.setAppText.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }
    componentWillMount(){
        if(!window.GLOBAL.promise["checkAppName"]){
            window.GLOBAL.promise["checkAppName"] = $.Deferred();
        }
    }
    componentWillUnmount(){
        if(window.GLOBAL.promise&&window.GLOBAL.promise["checkAppName"]){
            delete window.GLOBAL.promise["checkAppName"];
        }
    }
    componentDidMount(){
        this.getInfo(this.props.params.appsId);
    }
    goToBack(){
        hashHistory.goBack();
    }
    getInfo(_id){
        window.GLOBAL.ajaxMap.setParm("myAppDetail",'appId',_id);
        let parms = window.GLOBAL.ajaxMap.getAjaxParms("myAppDetail");
        parms.success=function(r){
            this.setState({
                name:r.name,
                category:r.category,
                status:r.status,
                text:r.des,
                apiKey:r.apiKey,
                secretKey:r.secretKey
            });
        }.bind(this);
        $.ajax(parms);
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
    reSecretKey(){
        this.setState({showTips:true});
    }
    submit(){
        let isOk = true;
        if(!window.GLOBAL.checkFun.isNotEmpty($(".myAppsModify .appText"),$(".myAppsModify .appText").parent().siblings(".errorTips"))){
            isOk = false;
        }
        if(isOk){
            window.GLOBAL.promise["checkAppName"] = $.Deferred();
            this.checkAppName();
            $.when(window.GLOBAL.promise["checkAppName"]).done(function(r1){
                if(r1.code){
                    let parms = {
                        appId:this.props.params.appsId,
                        name:this.state.name,
                        category:this.state.category,
                        des:this.state.text,
                        apiKey:this.state.apiKey,
                        secretKey:this.state.secretKey,
                        token:window.GLOBAL.token,
                        key1:MD5(this.props.params.appsId+this.state.name+this.state.text+this.state.apiKey+this.state.secretKey+window.GLOBAL.token+"devPortal")
                    };
                    window.GLOBAL.ajaxMap.setParms("addMyApp",parms);
                    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("addMyApp");
                    ajax.success=function(r){
                        if(r.code===3){
                            window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
                        }else if(r.code){
                            this.goToBack();
                            //hashHistory.push("/myApps");
                        }
                    }.bind(this);
                    $.ajax(ajax);
                }
            }.bind(this))
        }
    }
    changeSecretKey(){
        let parms = {appId:this.props.params.appsId,token:window.GLOBAL.token};
        window.GLOBAL.ajaxMap.setParms("reSecretKey",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("reSecretKey");
        ajax.success=function(r){
            if(r.code===3){
                window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
            }else if(r.code){
                this.setState({secretKey:r.secretKey,showTips:false});
            }
        }.bind(this);
        $.ajax(ajax);
    }
    handleCancel(){
        this.setState({showTips:false});
    }
    checkAppName(){
        let bool = window.GLOBAL.checkFun.isAppName($(".myAppsModify .appName"),$(".myAppsModify .appName").siblings(".errorTips"));
        if(bool){
            let parms = {appId:this.props.params.appsId,appName:this.state.name,token:window.GLOBAL.token};
            window.GLOBAL.ajaxMap.setParms("checkAppName",parms);
            let ajax = window.GLOBAL.ajaxMap.getAjaxParms("checkAppName");
            ajax.success=function(r){
                window.GLOBAL.promise["checkAppName"].resolve(r);
                if(r.code == 0){
                    $(".myAppsModify .appName").siblings(".errorTips").html("* 应用名称不唯一");
                }
            }.bind(this);
            $.ajax(ajax);
        }
    }
    checkAppText(){
        window.GLOBAL.checkFun.isNotEmpty($(".myAppsModify .appText"),$(".myAppsModify .appText").parent().siblings(".errorTips"))
    }
    setAppName(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        this.setState({name:_val});
    }
    setAppText(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        this.setState({text:_val});
    }
    selectCategory(eventKey){
        let _i = eventKey*1;
        this.setState({category:window.GLOBAL.pageData.myApps.category[_i].value})
    }
    render() {
        let myApps = window.GLOBAL.pageData.myApps;
        let category ="";
        myApps.category.map((item,i) => {
            if(item.value===this.state.category){
                category = item.text;
            }
        });
        let tips;
        if(this.state.showTips){
            tips = (<Tips className={myApps.reSecretKey.className} onSubmit={this.changeSecretKey} onCancel={this.handleCancel} text={myApps.reSecretKey.text}/>)
        }
        return (
            <div className="myAppsModify">
                <div className="MainTitle">
                    <h1>{myApps.myAppsModify.title}</h1>
                    <Link to="/myApps" role="button" className="btn btn-default backBtn">返回</Link>
                </div>
                <div className="whiteSpace">
                    <div className="inputLine">
                        <span className="block fl">应用名称：</span>
                        <input className="appName fl" type="text" maxLength={myApps.myAppsModify.name.maxLength} onChange={this.setAppName} value={this.state.name} onBlur={this.checkAppName}/>
                        <span className="errorTips fl"></span>
                    </div>
                    <div className="inputLine">
                        <span className="block fl">鉴权策略：</span>
                        <Dropdown id="searchItem">
                            <Dropdown.Toggle>
                                <span className="text" style={{width:"100px"}}>{category}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {myApps.category.map((item,i) => (
                                    <MenuItem eventKey={i} key={i} onSelect={this.selectCategory}>{item.text}</MenuItem>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="inputLine">
                        <span className="block fl">状态：</span>
                        <span className="fl">{myApps.status.map((item,i) =>(item.value === this.state.status?(item.text):""))}</span>
                    </div>
                    <div className="inputLine">
                        <span className="block fl">应用描述：</span>
                        <div className="textArea fl">
                            <div className="heightAuto">{this.state.text}</div>
                            <textarea className="appText" maxLength={myApps.myAppsModify.text.maxLength} onChange={this.setAppText} onBlur={this.checkAppText} value={this.state.text}/>
                        </div>
                        <span className="errorTips fl"></span>
                    </div>
                    <div className="inputLine">
                        <div className="t1 fl">API Key：</div>
                        <div className="t2 fl" style={{maxWidth:"280px",overflow:"hidden"}}>{this.state.s0?this.state.apiKey:myApps.hid}</div>
                        <div className={this.state.s0?"icon-eye fl":"icon-eye-close fl"} onClick={this.showOrHidApiKey}></div>
                    </div>
                    <br/>
                    <div className="inputLine">
                        <div className="t1 fl">Secret Key：</div>
                        <div className="t2 fl" style={{maxWidth:"280px",overflow:"hidden"}}>{this.state.s1?this.state.secretKey:myApps.hid}</div>
                        <div className={this.state.s1?"icon-eye fl":"icon-eye-close fl"} onClick={this.showOrHidSecretKey}></div>
                        <div className="icon-reApiKey fl" onClick={this.reSecretKey}></div>
                    </div>
                    <Button className="submit" bsStyle="primary" onClick={this.submit}>修改</Button>
                    <Button onClick={this.goToBack}>取消</Button>
                </div>
                {tips}
            </div>
        )
    }
}
module.exports = myAppsModify;