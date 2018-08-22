/**
 * Created by hqer on 2016/12/26.
 */
import React from 'react'
import { Link,hashHistory } from 'react-router'
import { Button } from 'react-bootstrap'

class myAppsDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name:"",category:1,status:0,text:"",type:0,secretKey:"",apiKey:"",authCode:"",s0:false,s1:false};
        this.goToBack = this.goToBack.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.showOrHidApiKey = this.showOrHidApiKey.bind(this);
        this.showOrHidSecretKey = this.showOrHidSecretKey.bind(this);
    }
    goToBack(){
        hashHistory.goBack();
    }
    componentWillReceiveProps(newProps){
        if(newProps.params.appsId!=this.props.params.appsId){
            this.getInfo(newProps.params.appsId);
        }
    }
    componentDidMount(){
        this.getInfo(this.props.params.appsId);
    }
    getInfo(_id){
        window.GLOBAL.ajaxMap.setParm("myAppDetail",'appId',_id);
        let parms = window.GLOBAL.ajaxMap.getAjaxParms("myAppDetail");
        parms.success=function(r){
            this.setState({
                name:r.name,
                category:r.category,
                status:r.status,
                type:r.type,
                text:r.des,
                apiKey:r.apiKey,
                secretKey:r.secretKey,
                authCode:r.authCode
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
    render() {
        let myApps = window.GLOBAL.pageData.myApps;
        let modifyBtn;
        if(this.state.type===0){
            modifyBtn = (<Link className="submit btn btn-primary" role="button" to={"/myAppsModify/"+this.props.params.appsId}>修改</Link>);
        }
        let category ="";
        myApps.category.map((item,i) => {
            if(item.value===this.state.category){
                category = item.text;
            }
        });
        return (
            <div className="myAppsDetail">
                <div className="MainTitle">
                    <h1>{myApps.detailTitle}</h1>
                    <Button className="backBtn" onClick={this.goToBack}>返回</Button>
                </div>
                <div className="whiteSpace">
                    <div className="inputLine">
                        <span className="block fl">应用名称：</span>
                        <span className="appName fl">{this.state.name}</span>
                    </div>
                    <div className="inputLine">
                        <span className="block fl">鉴权策略：</span>
                        <span className="fl">{category}</span>
                    </div>
                    {this.state.authCode?(
                        <div className="inputLine">
                            <span className="block fl">auth code：</span>
                            <span className="fl">{this.state.authCode}</span>
                        </div>
                    ):""}
                    <div className="inputLine">
                        <span className="block fl">状态：</span>
                        <span className="fl">{myApps.status.map((item,i) =>(item.value === this.state.status?(item.text):""))}</span>
                    </div>
                    <div className="inputLine">
                        <span className="block fl">应用描述：</span>
                        <span className="appText fl">{this.state.text}</span>
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
                    </div>
                    {modifyBtn}
                </div>
            </div>
        )
    }
}
module.exports = myAppsDetail;