/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'

Reflux.defineReact(React);

import '../store/workBench'

class workBench extends Reflux.Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.store = window.GLOBAL.store.workBench;
    }
    componentDidMount(){
        window.GLOBAL.action.header.select(3);
        window.GLOBAL.action.workBench.getUnRead();
        $(".leftLi.selected").removeClass("selected").find(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        $(".itemMenu a").each(function(_e,_i){
            if($(this).hasClass("active")){
                $(this).parents(".leftLi").addClass("selected").find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
            }
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.pathname!== this.props.location.pathname){
            $(".leftLi.selected").removeClass("selected").find(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
            $(".itemMenu a").each(function(_e,_i){
                if($(this).hasClass("active")){
                    $(this).parents(".leftLi").addClass("selected").find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
                }
            })
        }
    }
    goToOldPage(_key){
        let _old = window.GLOBAL.oldUrl[_key];
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
        let leftMenu = window.GLOBAL.pageData.leftMenu;
        let permission = JSON.parse(sessionStorage["userInfo"]).permission;
        let item0 =[];
        leftMenu.item0.child.map(function(item,i){
            if(item.ischeck){
                for(let j in permission){
                    if(window.GLOBAL.permission[j].indexOf(item.key)>-1){
                        item0.push(
                            <Link to={item.url} key={i} title={item.text} activeClassName="active">
                                <li className="linkBtn" key={i}>
                                    {item.text}
                                </li>
                            </Link>
                        );
                        break;
                    }
                }
            }else{
                item0.push(
                    <Link to={item.url} key={i} title={item.text} activeClassName="active">
                        <li className="linkBtn" key={i}>
                            {item.text}
                        </li>
                    </Link>
                );
            }
        })
        let dom = [
            (<li className="leftLi"  key={0}>
                <ul className="itemMenu">
                    <Link to={leftMenu.item0.child[0].url} title={leftMenu.item0.text}>
                        <div className="item">
                            <div className="leftIcon icon-left_icon1"></div>
                            <span className="fl">{leftMenu.item0.text}</span>
                            <span className="fr glyphicon glyphicon-plus"></span>
                        </div>
                    </Link>
                    {item0}
                </ul>
            </li>),
            (<li className="leftLi" key={2}>
                <ul className="itemMenu">
                    <Link to={leftMenu.item2.child[0].url} title={leftMenu.item2.text}>
                        <div className="item">
                            <div className="leftIcon icon-left_icon3"></div>
                            <span className="fl">{leftMenu.item2.text}</span>
                            <span className="fr glyphicon glyphicon-plus"></span>
                        </div>
                    </Link>
                    {leftMenu.item2.child.map((item,i) => (
                        <Link to={item.url} key={i} title={item.text} activeClassName="active">
                            <li className="linkBtn" key={i}>
                                {item.text}
                            </li>
                        </Link>
                    ))}
                </ul>
            </li>),
            (<li className="leftLi" key={3}>
                <ul className="itemMenu">
                    <Link onClick={this.goToOldPage.bind(this,leftMenu.item3.child[0].key)} title={leftMenu.item3.text}>
                        <div className="item">
                            <div className="leftIcon icon-left_icon4"></div>
                            <span className="fl">{leftMenu.item3.text}</span>
                            <span className="fr glyphicon glyphicon-plus"></span>
                            {this.state.unRead!=0?<span className="Read">{this.state.unRead>99?99:this.state.unRead}</span>:""}
                        </div>
                    </Link>
                    {leftMenu.item3.child.map((item,i) => (
                        <Link onClick={this.goToOldPage.bind(this,item.key)} key={i} title={item.text} activeClassName="active">
                            <li className="linkBtn" key={i}>
                                {item.text}
                                {item.isShow&&this.state.unRead!=0?<span className="Read">{this.state.unRead>99?99:this.state.unRead}</span>:""}
                            </li>
                        </Link>
                    ))}
                </ul>
            </li>)
        ];
        return (
            <div className="workBench">
                <div className="pageLevel3">
                    {this.props.children}
                </div>
                <div className="leftMenu">
                    <ul className="leftUl">
                        {dom}
                    </ul>
                </div>
            </div>
        )
    }
}
module.exports = workBench;