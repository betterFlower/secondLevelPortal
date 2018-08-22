/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'
import Reflux from 'reflux'

Reflux.defineReact(React);

import "../actions/header"

class headerStore extends Reflux.Store
{
    constructor() {
        super();
        this.listenables = window.GLOBAL.action.header;
        this.state = {log:0,select:3,unRead:0,userName:"",permission:[]};
    }
    onGetLoginState(){
        if(sessionStorage&&sessionStorage["userInfo"]){
            let r = JSON.parse(sessionStorage["userInfo"]);
            this.setState({log:r.isLogin,userName:r.userName,unRead:r.unRead,permission:r.permission});
        }
    }
    onSetUnRead(_num){
        this.setState({unRead:_num});
    }
    onSelect(_i){
        this.setState({select:_i});
    }
    onLogOut() {
        window.GLOBAL.ajaxMap.setParm("exitLogin","userId",this.state.userId);
        let parms = window.GLOBAL.ajaxMap.getAjaxParms("exitLogin");
        parms.success=function(r){
            if(r.isExit){
                sessionStorage.removeItem("userInfo");
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
                //window.location.href = window.GLOBAL.pageData.header.exitUrl;
            }
        }.bind(this);
        $.ajax(parms);
    }
}
window.GLOBAL.store.header = headerStore;