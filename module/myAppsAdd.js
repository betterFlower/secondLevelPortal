/**
 * Created by hqer on 2016/12/26.
 */
import React from 'react'
import { Link,hashHistory } from 'react-router'
import { Button,ButtonToolbar,DropdownButton,Dropdown,MenuItem,} from 'react-bootstrap'
import MD5 from "md5"

class myAppsAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            text:"",
            category:1
        };
        this.goToBack = this.goToBack.bind(this);
        this.submit = this.submit.bind(this);
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
    goToBack(){
        hashHistory.goBack();
    }
    submit(){
        let isOk = true;
        if(!window.GLOBAL.checkFun.isNotEmpty($(".myAppsAdd .appText"),$(".myAppsAdd .appText").parent().siblings(".errorTips"))){
            isOk = false;
        }
        if(isOk){
            window.GLOBAL.promise["checkAppName"] = $.Deferred();
            this.checkAppName();
            $.when(window.GLOBAL.promise["checkAppName"]).done(function(r1){
                if(r1.code){
                    let parms = {
                        name:this.state.name,
                        des:this.state.text,
                        category:this.state.category,
                        token:window.GLOBAL.token
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
    checkAppName(){
        let bool = window.GLOBAL.checkFun.isAppName($(".myAppsAdd .appName"),$(".myAppsAdd .appName").siblings(".errorTips"));
        if(bool){
            let parms = {appId:"",appName:this.state.name,token:window.GLOBAL.token};
            window.GLOBAL.ajaxMap.setParms("checkAppName",parms);
            let ajax = window.GLOBAL.ajaxMap.getAjaxParms("checkAppName");
            ajax.success=function(r){
                window.GLOBAL.promise["checkAppName"].resolve(r);
                if(r.code == 0){
                    $(".myAppsAdd .appName").siblings(".errorTips").html("* 应用名称不唯一");
                }
            }.bind(this);
            $.ajax(ajax);
        }
    }
    checkAppText(){
        window.GLOBAL.checkFun.isNotEmpty($(".myAppsAdd .appText"),$(".myAppsAdd .appText").parent().siblings(".errorTips"))
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
        return (
            <div className="myAppsAdd">
                <div className="MainTitle">
                    <h1>{myApps.myAppsAdd.title}</h1>
                    <Button className="backBtn" onClick={this.goToBack}>返回</Button>
                </div>
                <div className="whiteSpace">
                    <div className="inputLine">
                        <span className="block fl">应用名称：</span>
                        <input className="appName fl" type="text" maxLength={myApps.myAppsAdd.name.maxLength} onChange={this.setAppName} value={this.state.name} onBlur={this.checkAppName}/>
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
                        <span className="block fl">应用描述：</span>
                        <div className="textArea fl">
                            <div className="heightAuto">{this.state.text}</div>
                            <textarea className="appText" maxLength={myApps.myAppsAdd.text.maxLength} onChange={this.setAppText} onBlur={this.checkAppText} value={this.state.text}/>
                        </div>
                        <span className="errorTips fl"></span>
                    </div>
                    <br/>
                    <Button className="submit" bsStyle="primary" onClick={this.submit}>确定</Button>
                </div>
            </div>
        )
    }
}
module.exports = myAppsAdd;