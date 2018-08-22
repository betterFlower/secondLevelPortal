/**
 * Created by hqer on 2016/12/28.
 */
module.exports = {
    get:function(_callBack){
        window.GLOBAL.ajaxMap.setParm("headerState",'r',Math.random());
        let parms = window.GLOBAL.ajaxMap.getAjaxParms("headerState");
        parms.success=function(r){
            if(r.isLogin){
                let userInfo = r;
                if(typeof r.permission ==="object"&&r.permission.length){
                    let s = new Set();
                    r.permission.map(x => s.add(x));
                    userInfo.permission = [...s];
                }else if(typeof r.permission ==="string"){
                    userInfo.permission = [r.permission];
                }
                sessionStorage["userInfo"]=JSON.stringify(userInfo);
                //console.log(sessionStorage["userInfo"]);
                if(typeof _callBack === "function"){
                    _callBack();
                }
            }else{
                sessionStorage.removeItem("userInfo");
                if(typeof _callBack === "function"){
                    _callBack();
                }
            }
        };
        $.ajax(parms);
    }
}
