/**
 * Created by hqer on 2016/12/30.
 */
import React from 'react'
import { Button } from 'react-bootstrap'
import Input from '../../componentUI/js/Input'

class checkTips extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phone:"",
            imgCode:"",
            phoneCode:"",
            imgUrl:window.GLOBAL.pageData.checkTips.img+"?"+new Date().getTime(),
            countDown:60,
            isCuntDown:false,
            key:""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handCancel = this.handCancel.bind(this);
        this.reloadImg = this.reloadImg.bind(this);
        this.checkPhone = this.checkPhone.bind(this);
        this.checkImgCode = this.checkImgCode.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.checkSmsCode = this.checkSmsCode.bind(this);
        this.setPhone = this.setPhone.bind(this);
        this.setImgCode = this.setImgCode.bind(this);
        this.setSmsCode = this.setSmsCode.bind(this);
    }
    componentWillMount(){
        if(window.GLOBAL.timeout&&window.GLOBAL.timeout["checkTips"]){
            clearTimeout(window.GLOBAL.timeout["checkTips"]);
            delete window.GLOBAL.timeout["checkTips"];
        }
        if(!window.GLOBAL.promise["checkPhone"]){
            window.GLOBAL.promise["checkPhone"] = $.Deferred();
        }
        if(!window.GLOBAL.promise["sendCode"]){
            window.GLOBAL.promise["sendCode"] = $.Deferred();
        }
    }
    componentWillUnmount(){
        if(window.GLOBAL.timeout&&window.GLOBAL.timeout["checkTips"]){
            clearTimeout(window.GLOBAL.timeout["checkTips"]);
            delete window.GLOBAL.timeout["checkTips"];
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.isCuntDown&&this.state.countDown===1){
            if(window.GLOBAL.timeout&&window.GLOBAL.timeout["checkTips"]){
                clearTimeout(window.GLOBAL.timeout["checkTips"]);
            }
            window.GLOBAL.timeout["checkTips"] = setTimeout(function(){
                this.setState({isCuntDown:false,countDown:60});
            }.bind(this),1000);
        }else if(this.state.isCuntDown&&this.state.countDown > 1){
            if(window.GLOBAL.timeout&&window.GLOBAL.timeout["checkTips"]){
                clearTimeout(window.GLOBAL.timeout["checkTips"]);
            }
            window.GLOBAL.timeout["checkTips"] = setTimeout(function(){
                let countDown = this.state.countDown - 1;
                this.setState({countDown:countDown});
            }.bind(this),1000);
        }
        if(this.state.key&&typeof this.props.onSubmit === "function"){
            this.props.onSubmit(this);
        }
    }
    handleClick(){
        let isOk = true;
        if(!window.GLOBAL.checkFun.isPhoneNum($(".tips .phone"),$(".tips .phone").siblings(".errorTips"))){
            isOk = false;
        }
        if(!window.GLOBAL.checkFun.isSmsCode($(".tips .smsCode"),$(".tips .smsCode").siblings(".errorTips"))){
            isOk = false;
        }
        if(isOk){
            $.when(window.GLOBAL.promise["checkPhone"],window.GLOBAL.promise["sendCode"]).done(function(r1,r2){
                if(r1.code!=412&&r2.code==200){
                    let parms = {phone:this.state.phone,smsCode:this.state.phoneCode,token:window.GLOBAL.token};
                    window.GLOBAL.ajaxMap.setParms("checkMsgCode",parms);
                    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("checkMsgCode");
                    ajax.success=function(r){
                        if(r.code == 200){
                            this.setState({key:r.key});
                        }else{
                            $(".tips .smsCode").siblings(".errorTips").html("* 验证失败!");
                        }
                    }.bind(this);
                    $.ajax(ajax);
                }
            }.bind(this))
        }
    }
    handCancel(){
        if(typeof this.props.onCancel === "function"){
            this.props.onCancel()
        }
    }
    checkPhone(){
        let bool = window.GLOBAL.checkFun.isPhoneNum($(".tips .phone"),$(".tips .phone").siblings(".errorTips"));
        if(bool){
            let parms = {phone:$(".tips .phone").val(),token:window.GLOBAL.token};
            window.GLOBAL.ajaxMap.setParms("checkPhone",parms);
            let ajax = window.GLOBAL.ajaxMap.getAjaxParms("checkPhone");
            ajax.success=function(r){
                window.GLOBAL.promise["checkPhone"].resolve(r);
                if(r.code == 412){
                    $(".tips .phone").siblings(".errorTips").html("* 手机号码已注册");
                }else{
                    $(".tips .phone").siblings(".errorTips").html("* 恭喜你可以进行注册");
                }
            }.bind(this);
            $.ajax(ajax);
        }
    }
    reloadImg(){
        let t = new Date().getTime();
        this.setState({imgUrl:window.GLOBAL.pageData.checkTips.img+"?" + t,imgCode:""});
    }

    checkImgCode(){
        window.GLOBAL.checkFun.isImgCode($(".tips .imgCode"),$(".tips .imgCode").siblings(".errorTips"));
    }
    sendCode(){
        let isOk = true;
        if(!window.GLOBAL.checkFun.isPhoneNum($(".tips .phone"),$(".tips .phone").siblings(".errorTips"))){
            isOk = false;
        }
        if(!window.GLOBAL.checkFun.isImgCode($(".tips .imgCode"),$(".tips .imgCode").siblings(".errorTips"))){
            isOk = false;
        }
        if(isOk){
            $.when(window.GLOBAL.promise["checkPhone"]).done(function(r){
                if(r.code == 412){
                    $(".tips .phone").siblings(".errorTips").html("* 手机号码已注册");
                }else{
                    $(".tips .phone").siblings(".errorTips").html("* 恭喜你可以进行注册");
                    let parms = {phone:this.state.phone,imgCode:this.state.imgCode,token:window.GLOBAL.token};
                    window.GLOBAL.ajaxMap.setParms("sendMsgCode",parms);
                    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("sendMsgCode");
                    ajax.success=function(r){
                        window.GLOBAL.promise["sendCode"].resolve(r);
                        if(r.code == 201){
                            $(".tips .phone").siblings(".errorTips").html("今日短信验证码发送次数已达上限，请明日再试。");
                        }else if(r.code == 202){
                            $(".tips .phone").siblings(".errorTips").html("今日短信验证码发送次数已达上限，请明日再试。");
                        }else if(r.code == 200){
                            this.setState({isCuntDown:true});
                            $(".tips .phone").siblings(".errorTips").html("* 短信已发送，请查收");
                        }else {
                            $(".tips .phone").siblings(".errorTips").html("* 下发失败，请重试");
                        }
                    }.bind(this);
                    $.ajax(ajax);
                }
            }.bind(this))
        }
    }
    checkSmsCode(){
        window.GLOBAL.checkFun.isSmsCode($(".tips .smsCode"),$(".tips .smsCode").siblings(".errorTips"));
    }
    setPhone(_obj){
        this.setState({phone:_obj.state.v});
    }
    setImgCode(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        this.setState({imgCode:_val});
    }
    setSmsCode(_obj){
        this.setState({phoneCode:_obj.state.v});
    }
    render() {
        let btns = [];
        if(this.props.btns.length){
            this.props.btns.map((element,index) => {
                btns.push(<Button key={index} bsStyle={index===0?"primary":"default"} onClick={element.type?this.handleClick:this.handCancel}>{element.text}</Button>)
            })
        }
        let sendCodeBtn;
        if(this.state.isCuntDown&&this.state.countDown){
            sendCodeBtn = (<Button className="fl" disabled>重新获取（{this.state.countDown}）</Button>);
        }else{
            sendCodeBtn = (<Button className="fl" onClick={this.sendCode}>短信获取验证码</Button>);
        }
        let checkTips = window.GLOBAL.pageData.checkTips;
        return (
            <div className="tipsBg">
                <div className="tipsBox">
                    <div className={"tips checkTips "+this.props.className}>
                        <div className="tipsTitle">{this.props.title}</div>
                        <div className="tipsContext">
                            <div className="inputLine fl" style={{width:"100%"}}>
                                <div className="fl block">手机号码：</div>
                                <Input className="fl phone" type="naturalNum" v={this.state.phone} onChange={this.setPhone} onBlur={this.checkPhone} placeholder={checkTips.phone.placeholder} maxLength={checkTips.phone.maxLength}/>
                                <div className="errorTips"></div>
                            </div>
                            <div className="inputLine fl" style={{width:"100%"}}>
                                <div className="fl block">图形验证码：</div>
                                <input type="text" className="fl imgCode" value={this.state.imgCode} onChange={this.setImgCode} onBlur={this.checkImgCode} placeholder={checkTips.imgCode.placeholder} maxLength={checkTips.imgCode.maxLength}/>
                                <a onClick={this.reloadImg}>
                                    <img className="imgCodeShow" src={this.state.imgUrl} width="80" height="40"/>
                                    <div className="imgCodeBtn">
                                        <div className="icon-refresh"></div>
                                    </div>
                                </a>
                                <div className="errorTips"></div>
                            </div>
                            <div className="inputLine fl" style={{width:"100%"}}>
                                {this.state.isCuntDown&&this.state.countDown?(
                                    <Button className="fl" bsStyle="info" disabled>重新获取（{this.state.countDown})</Button>
                                ):(
                                    <Button className="fl" bsStyle="info" onClick={this.sendCode}>短信获取验证码</Button>
                                )}
                            </div>
                            <div className="inputLine fl" style={{width:"100%"}}>
                                <div className="fl block">验证码：</div>
                                <Input className="fl smsCode" type="number" v={this.state.phoneCode} onChange={this.setSmsCode} onBlur={this.checkSmsCode} placeholder={checkTips.smsCode.placeholder} maxLength={checkTips.smsCode.maxLength}/>
                                <div className="errorTips"></div>
                            </div>
                        </div>
                        <div className="tipsBtnArea">
                            {btns}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

checkTips.propTypes = {
    className: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    btns: React.PropTypes.array.isRequired
};
checkTips.defaultProps = {
    className:"",
    title:"标题",
    btns:[{text:"确定",type:1},{text:"取消",type:0}]
};
module.exports = checkTips;