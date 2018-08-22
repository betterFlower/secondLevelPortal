/**
 * Created by hqer on 2016/12/30.
 */
module.exports = {
    isNotEmpty:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _val = _obj.val();
            var _t = "* 输入项不能为空";
            var _status = true;
            if(!_val){
                if(typeof _tips ==="string"){
                    _t =  _tips;
                }
                _status = false;
            }else{
                _t = "";
            }
            if(_showObj[0]){
                _showObj.html(_t);
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isPhoneNum:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的手机号码";
            if(_status){
                if(!/^1(3[0-9]|5[0-9]|8[0-9]|4[0-9]|7[0-9])\d{8}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isPhoneNums:function(_obj,_showObj,_max,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val().split(";");
            var _l = _val.length;
            var _t = "* 请输入正确格式的手机号码";
            if(_status){
                let newList= Array.from(new Set(_val));
                if(newList.length != _l){
                    _t = "* 手机号码不能重复!";
                    _status = false;
                    _showObj.html(_t);
                }else{
                    _val.forEach((x,i)=>{
                        if(!/^1(3[0-9]|5[0-9]|8[0-9]|4[0-9]|7[0-9])\d{8}$/.test(x)){
                            _status = false;
                        }
                    });
                    console.log(111111111111111111111);
                    if(typeof _max ==="number"&&newList.length > _max){
                        _status = false;
                        _t = "* 最大支持"+_max+"个手机号码!";
                    }
                    if(_status){
                        _t = "";
                    }
                    if(_showObj[0]){
                        _showObj.html(_t);
                    }
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isPhoneNumOrTelNum:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确的固话或手机号码！";
            if(_status){
                if(!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isUserName:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的用户名";
            if(_status){
                if(!/^([0-9a-zA-Z_\u4E00-\u9FA5]){4,20}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isImgCode:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj,"* 验证码不能为空");
            var _val = _obj.val();
            var _t = "* 验证码错误";
            var _length = _val.length;
            if(_obj.attr("maxlength")){
                _length = _obj.attr("maxlength")*1;
            }
            if(_status){
                if(!/^([0-9a-zA-Z]){0,4}$/.test(_val)||_length!=_val.length){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isSmsCode:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj,"* 验证码不能为空");
            var _val = _obj.val();
            var _t = "* 验证码错误";
            if(_status){
                if(!/^([0-9]){0,6}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isEmail:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj,"* 邮箱不能为空");
            var _val = _obj.val();
            var _t = "* 邮箱格式错误";
            if(_status){
                if(!/^([a-zA-Z0-9_\.])+@([a-zA-Z0-9_\.])+\.[a-zA-Z]{2,3}$/.test(_val)||_val.length>50||_val.indexOf("._")>-1||_val.indexOf("_.")>-1||_val.indexOf("..")>-1||_val.indexOf("__")>-1||_val.slice(0,1)==="."||_val.slice(0,1)==="_"){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isPassWord:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj,"* 密码不能为空");
            var _val = _obj.val();
            var _t = "* 密码格式不正确";
            if(_status){
                if(!/^.{8,}$/.test(_val)){
                    if(_showObj[0]){
                        _showObj.html("* 密码长度至少8位");
                    }
                    _status = false;
                }else if(!/^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[$#@^&_=+%<>{}?~!])|(?=.*?[A-Za-z])(?=.*?[$#@^&_=+%<>{}?~!]))[\dA-Za-z$#@^&_=+%<>{}?~!]{8,20}$/.test(_val)){
                    if(_showObj[0]){
                        // if(typeof _tips ==="string"){
                        //     _t =  _tips;
                        // }
                        _showObj.html("* 密码必须是字母、数字或者英文符号组合");
                    }
                    _status = false;
                }else{
                    _t = "";
                    if(_showObj[0]){
                        _showObj.html(_t);
                    }
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isVerifyPassWord:function(_obj,_showObj,_verifyObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj,"* 密码不能为空");
            var _val = _obj.val();
            var _t = "* 密码不一致，请重新输入";
            if(_status){
                if(_obj.val()!==_verifyObj.val()){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isCompanyName:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的企业名称";
            if(_status){
                if(!/^[A-Za-z0-9\u4E00-\u9FFF]{1,50}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isCompanyLicense:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的营业执照编号";
            if(_status){
                if(!/^[A-Za-z0-9-]{1,18}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isGovLicense:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的营业执照编号";
            if(_status){
                if(!/^[0-9-]{1,20}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isCompanySignature:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 签名格式错误";
            if(_status){
                if(!/^[\u4E00-\u9FFF]{3,8}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isCompanyAdmin:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的真实姓名";
            if(_status){
                if(!/^[\u4E00-\u9FFF]{2,6}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isIdentityCodeValid:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入有效的证件号码";
            if(_status){
                function IdentityCodeValid(code){
                    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
                    var tip = "";
                    var pass= true;

                    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                        /*            tip = "身份证号格式错误";*/
                        pass = false;
                    }

                    else if(!city[code.substr(0,2)]){
                        /*            tip = "地址编码错误";*/
                        pass = false;
                    }
                    else{
                        //18位身份证需要验证最后一位校验位
                        if(code.length == 18){
                            code = code.split('');
                            //∑(ai×Wi)(mod 11)
                            //加权因子
                            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                            //校验位
                            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                            var sum = 0;
                            var ai = 0;
                            var wi = 0;
                            for (var i = 0; i < 17; i++)
                            {
                                ai = code[i];
                                wi = factor[i];
                                sum += ai * wi;
                            }
                            var last = parity[sum % 11];
                            if(parity[sum % 11] != code[17]){
                                /*                    tip = "校验位错误";*/
                                pass =false;
                            }
                        }
                    }
                    /*        if(!pass) alert(tip);*/
                    return pass;
                }
                if(!IdentityCodeValid(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isAppName:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的应用名称";
            if(_status){
                if(!(/(\w*[\u4e00-\u9fa5]+)+/.test(_val)||/^[a-zA-Z]{1,15}$/.test(_val))||_val.length<2||!/^(?=[0-9a-zA-Z\u4e00-\u9fa5]+$)/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isSignName:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的签名名称";
            if(_status){
                if(!(/(\w*[\u4e00-\u9fa5]+)+/.test(_val)||/^[a-zA-Z]{1,8}$/.test(_val))||_val.length<2||!/^(?=[0-9a-zA-Z\u4e00-\u9fa5]+$)/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isSmsTemplateName:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的模板名称";
            if(_status){
                if(!/^([0-9a-zA-Z_\u4E00-\u9FA5]){1,15}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isVoiceTemplateName:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的模板名称";
            if(_status){
                if(!/^([0-9a-zA-Z_\u4E00-\u9FA5]){1,15}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isUrl:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入正确格式的url地址";
            if(_status){
                if(!/^(http|https|ftp)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^\/][a-zA-Z0-9\.\,\?\'\\/\+&amp;%\$#\=~_\-@]*)*$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    },
    isNumberString:function(_obj,_showObj,_tips){
        if(_obj[0]){
            var _status = this.isNotEmpty(_obj,_showObj);
            var _val = _obj.val();
            var _t = "* 请输入纯数字格式的内容";
            if(_status){
                if(!/^\d{1,7}$/.test(_val)){
                    if(_showObj[0]){
                        if(typeof _tips ==="string"){
                            _t =  _tips;
                        }
                        _showObj.html(_t);
                    }
                    _status = false;
                }else{
                    _t = "";
                }
                if(_showObj[0]){
                    _showObj.html(_t);
                }
            }
            if(typeof _tips ==="function"){
                _tips(_status);
            }else{
                return _status;
            }
        }
    }
};