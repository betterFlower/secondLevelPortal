/**
 * Created by hqer on 16/12/7.
 */

import ajaxMap from './ajaxMap'
import cookie from './cookies'
import pageData from './pageData'
import permission from './permission'
import userInfo from "./userInfo"
import ckeckFun from "./ckeckFun"
window.GLOBAL={
    _environment:"dev",
    oldUrl:JSON.parse($("#oldUrl").val()),
    ajaxMap:ajaxMap,
    cookie:cookie,
    pageData:pageData,
    permission:permission,
    userInfo:userInfo,
    checkFun:ckeckFun,
    promise:{},
    timeout:{},
    action:{},
    store:{},
    token:"",
    uploadToken:""
};
let _date = new Date();
_date.setTime(_date.getTime() -1000);
window.document.cookie = "rootPath= null; expires=" + _date.toGMTString();
