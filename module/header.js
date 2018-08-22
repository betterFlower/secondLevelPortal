/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'

import "../store/header"

Reflux.defineReact(React);

class header extends Reflux.Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.store = window.GLOBAL.store.header;
        this._onclick = this._onclick.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.goToMessagePage = this.goToMessagePage.bind(this);
    }
    componentDidMount(){
        window.GLOBAL.action.header.getLoginState();
    }
    componentDidUpdate(){
        if($(".whiteSpace:last")[0]){
            //console.log($(".pageLevel2").height()+",,,,"+$(".whiteSpace:last").offset().top+",,,"+$(".header").height())
            let minHeight = parseInt($(".pageLevel2").height()) - $(".whiteSpace:last").offset().top + $(".header").height();
            if(minHeight > 0){
                $(".whiteSpace:last").css("minHeight",minHeight+"px");
            }
        }
    }
    goToIndex(){
        let _old = window.GLOBAL.oldUrl["index"];
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
    _onclick(){
        window.GLOBAL.action.header.logOut();
    }
    goToMessagePage(){
        let _old = window.GLOBAL.oldUrl["message"];
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
        let headerData = window.GLOBAL.pageData.header;
        console.log(this.state.select)
        let dom = [];
        if (this.state.log) {
            dom = [
                (<li className="fr" key={0}>
                    <Link onClick={this.goToMessagePage}><div className={this.state.unRead?"icon-email-dt":"icon-email-dt-null"}></div></Link>
                </li>),
                (<li className="fr" key={1} style={{marginLeft:"30px",textAlign:"center"}}>
                    <span>{this.state.userName}</span>
                    <div className="subMenu" style={{width:"76px",left:"50%",height:"30px",marginLeft:"-38px"}}>
                        <div className="arrow"><em></em><span></span></div>
                        <div style={{width:"100%",height:"100%",lineHeight:"30px",cursor:"pointer"}} onClick={this._onclick}>退出</div>
                    </div>
                </li>),
                (<li className={this.state.select===1?"fr devDocBtn active":"fr devDocBtn"} key={2}>
                    <span className="text">{headerData.devDoc.text}</span>
                    <ul className="subMenu">
                        <div className="arrow"><em></em><span></span></div>
                        {headerData.devDoc.child.map((item,i) => (
                            <li className="list" key={i}>
                                <Link to={item.url?item.url:window.GLOBAL.oldUrl[item.key].url}>{item.text}</Link>
                            </li>
                        ))}
                    </ul>
                </li>),
                (<li className="fr" key={3} style={{margin:"0 12px"}}>|</li>),
                (<li className={this.state.select===2?"fr abilityBtn active":"fr abilityBtn"} key={4}>
                    <span className="text">{headerData.ability.text}</span>
                    <ul className="subMenu levelMore">
                        <div className="arrow"><em></em><span></span></div>
                        {headerData.ability.child.map((item,i) => (
                            <li className="list" key={i}>
                                <span className="text">{item.text}</span>
                                <ul className="subChildMenu">
                                    {item.child.map((n,j) => (
                                        <li className="listChild" key={j}>
                                            <Link to={n.url}>{n.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>),
                (<li className="fr" key={5} style={{margin:"0 12px"}}>|</li>),
                (<li className={this.state.select===3?"fr active":"fr"} key={6}>
                    <Link to={headerData.myServer.url}>
                        <span className="text">{headerData.myServer.text}</span>
                    </Link>
                </li>)
            ]
        }else {
            {headerData.unLoginBtns.map((item,i) => dom.push(
                <li className="fr" key={i} style={{marginLeft:"10px"}}>
                    <a href={item.url?item.url:window.GLOBAL.oldUrl[item.key].url} role="button" className={i===1?"btn btn-info":"btn btn-primary"}>{item.text}</a>
                </li>
            ))}
            let _i = headerData.unLoginBtns.length;
            dom.push(
                (<li className={this.state.select===1?"fr devDocBtn active":"fr devDocBtn"} style={{marginRight:"20px"}} key={_i}>
                    <span className="text">{headerData.devDoc.text}</span>
                    <ul className="subMenu">
                        <div className="arrow"><em></em><span></span></div>
                        {headerData.devDoc.child.map((item,i) => (
                            <li className="list" key={i}>
                                <Link to={item.url?item.url:window.GLOBAL.oldUrl[item.key].url}>{item.text}</Link>
                            </li>
                        ))}
                    </ul>
                </li>),
                (<li className="fr" key={_i+1} style={{margin:"0 12px"}}>|</li>),
                (<li className={this.state.select===2?"fr abilityBtn active":"fr abilityBtn"} key={4}>
                    <span className="text">{headerData.ability.text}</span>
                    <ul className="subMenu levelMore">
                        <div className="arrow"><em></em><span></span></div>
                        {headerData.ability.child.map((item,i) => (
                            <li className="list" key={i}>
                                <span className="text">{item.text}</span>
                                <ul className="subChildMenu">
                                    {item.child.map((n,j) => (
                                        <li className="listChild" key={j}>
                                            <Link to={n.url}>{n.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>),
                (<li className="fr" key={_i+3} style={{margin:"0 12px"}}>|</li>),(<li className={this.state.select===3?"fr active":"fr"} key={_i+4}>
                    <Link onClick={this.goToIndex}>
                        <span className="text">首页</span>
                    </Link>
                </li>)
            );
        }
        return(
            <div className="pageLevel1">
                <div className="header">
                    <ul className="headerUl">
                        <Link onClick={this.goToIndex}>
                            <li className="fl">
                                <div className="icon-logo logo fl"></div>
                                <div className="logoName fl">{headerData.logo.text}</div>
                            </li>
                        </Link>
                        {dom}
                    </ul>
                </div>
                <div className="pageLevel2" style={{"minHeight":($(window).height()-130 > 600?$(window).height()-130:600)+"px"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
module.exports = header;
