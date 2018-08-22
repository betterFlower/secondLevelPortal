/**
 * Created by hqer on 2016/12/12.
 */
import React from 'react';
import { Link } from 'react-router';
class notFind extends React.Component{
    constructor(props) {
        super(props);
        this.goToIndex = this.goToIndex.bind(this);
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
    render() {
        return (
            <div className="undefined">
                <div className="whiteSpace">
                    <div className="center">
                        <img style={{display:"block",margin:"5px auto"}} src="img/404_logo.png"/>
                        <div style={{margin:"5px auto",fontSize:"24px",color:"#333",lineHeight:"30px"}}>页面出错啦</div>
                        <div style={{margin:"5px auto"}}>您访问的页面出错，请点击<Link className="link" onClick={this.goToIndex}>返回首页</Link> </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = notFind;