import React from 'react'
import { render } from 'react-dom'
import { hashHistory, Router } from 'react-router'
import { Alert } from 'react-bootstrap'
import f from "./config/global"
import routes from './config/routers'


$.ajaxSetup({timeout:3000,cache:false});
$(document).ajaxComplete(function(event,xhr,options){
    let _httpState = xhr.status;
    let _statusText = xhr.statusText;
    if(_httpState!==200){
        hashHistory.push("/errorPage/"+_httpState+"?msg="+encodeURIComponent(_statusText));
    }else{
        let sessionOut = xhr.getResponseHeader("sessionOut");
        let token = xhr.getResponseHeader("token");
        let uploadToken = xhr.getResponseHeader("uploadToken");
        if(sessionOut&&sessionOut*1){
            let _old = window.GLOBAL.oldUrl["login"];
            let _url = _old.url;
            window.location.href = _url;
        }
        if(token){
            window.GLOBAL.token = token;
        }
        if(uploadToken){
            window.GLOBAL.uploadToken = uploadToken;
        }
    }
});
//$.ajax({url:"111.aaaa",type:"GET",data:{a:""}});
if(!sessionStorage){
    render((
        <Alert bsStyle="danger">
            <strong>你的浏览器版本太低,请更新到最高版本!</strong>
        </Alert>
    ), document.getElementById('app'));
}else{
    window.GLOBAL.userInfo.get(function(){
        render((
            <Router
                history={hashHistory}
                routes={routes}
            />
        ), document.getElementById('app'));
    });
}
