webpackJsonp([4],{825:function(e,t,a){"use strict";var s=a(520).default,n=a(521).default,i=a(774).default,o=a(558).default,r=a(559).default,l=a(595).default,p=a(299),c=a(463),u=c.Link,d=c.hashHistory,h=a(518),m=h.Table,f=h.Button,y=h.ButtonToolbar,v=(h.DropdownButton,h.Dropdown),T=h.MenuItem,E=(h.Row,h.Col,a(826)),b=a(827),g=a(828),I=(a(829),function(e){function t(a){o(this,t);var s=r(this,e.call(this,a));return s.state={name:"",data:[],selTypId:"",appId:"",appData:[],APIData:[],showTips:0,tipsText:"",upload:{id:"",text:"选择文件",errorTips:"",status:!1}},s.selTypId=s.selTypId.bind(s),s.submit=s.submit.bind(s),s.handleCancel=s.handleCancel.bind(s),s.setItemType0=s.setItemType0.bind(s),s.checkItemType0Phone=s.checkItemType0Phone.bind(s),s.checkItemType0Number=s.checkItemType0Number.bind(s),s.checkItemType0Url=s.checkItemType0Url.bind(s),s.selectItemType1=s.selectItemType1.bind(s),s.setAppId=s.setAppId.bind(s),s}return l(t,e),t.prototype.componentDidMount=function(){var e={eaId:this.props.params.eaId};window.GLOBAL.ajaxMap.setParms("getOrderPackage",e);var t=window.GLOBAL.ajaxMap.getAjaxParms("getOrderPackage");t.success=function(e){this.setState({name:e.name,data:e.data,selTypId:e.data[0].typeId})}.bind(this),$.ajax(t);var a={eaId:this.props.params.eaId};window.GLOBAL.ajaxMap.setParms("abilityAPIData",a);var s=window.GLOBAL.ajaxMap.getAjaxParms("abilityAPIData");s.success=function(e){this.setState({APIData:e.data})}.bind(this),$.ajax(s);var n={eaId:this.props.params.eaId};window.GLOBAL.ajaxMap.setParms("getOrderAppList",n);var i=window.GLOBAL.ajaxMap.getAjaxParms("getOrderAppList");i.success=function(e){this.setState({appData:e.data})}.bind(this),$.ajax(i)},t.prototype.submit=function(){var e=this,t=!0;if(this.state.APIData.map(function(a,s){""!==a.value&&a.value!==[]||(t=!1),4!==a.type||e.state.upload.status||(t=!1)}),$(".apiType0")[0]&&$(".apiType0").each(function(e,a){$(this).hasClass("phone")&&!window.GLOBAL.checkFun.isPhoneNum($(this),$(this).siblings(".errorTips"))?t=!1:$(this).hasClass("url")&&!window.GLOBAL.checkFun.isUrl($(this),$(this).siblings(".errorTips"))&&(t=!1)}),$(".phones")[0]&&$(".phones").each(function(e,a){window.GLOBAL.checkFun.isPhoneNums($(this),$(this).parent().siblings(".errorTips"),100)||(t=!1)}),t){var a={};this.state.appData.map(function(t,s){t.id===e.state.appId&&(a=t)});var s={name:this.state.name,typeId:this.state.selTypId,appInfo:a,APIData:this.state.APIData},n={eaId:this.props.params.eaId,token:window.GLOBAL.token,appId:this.state.appId};window.GLOBAL.ajaxMap.setParms("openAbility",n);var o=window.GLOBAL.ajaxMap.getAjaxParms("openAbility");o.success=function(e){1===e.code?(sessionStorage.orderInfo=i(s),d.push("/orderToPay/"+this.props.params.eaId)):2===e.code&&this.setState({showTips:2,tipsText:e.tipsText})}.bind(this),$.ajax(o)}},t.prototype.handleCancel=function(){this.setState({showTips:0})},t.prototype.selTypId=function(e){var t=e.srcElement?e.srcElement:e.target,a=t.value;this.setState({selTypId:a})},t.prototype.setItemType0=function(e){var t=e.srcElement?e.srcElement:e.target,a=t.value,s=1*t.title,i=n([],this.state.APIData);i[s].value=a,this.setState({APIData:i})},t.prototype.checkItemType0Phone=function(e){var t=e.srcElement?e.srcElement:e.target;window.GLOBAL.checkFun.isPhoneNum($(t),$(t).siblings(".errorTips"))},t.prototype.checkItemType0Number=function(e){var t=e.srcElement?e.srcElement:e.target;window.GLOBAL.checkFun.isNumberString($(t),$(t).siblings(".errorTips"))},t.prototype.checkItemType0Url=function(e){var t=e.srcElement?e.srcElement:e.target;window.GLOBAL.checkFun.isUrl($(t),$(t).siblings(".errorTips"))},t.prototype.selectItemType1=function(e){var t=n([],this.state.APIData),a=e.split("_");2===a.length&&(t[a[1]].value=a[0]),this.setState({APIData:t})},t.prototype.selectItemType2=function(e,t){var a=n([],this.state.APIData),s=!0;a[e].value.forEach(function(n,i){n===a[e].child[t].value&&(a[e].value.splice(i,1),s=!1)}),s&&a[e].value.push(a[e].child[t].value),this.setState({APIData:a})},t.prototype.checkItemType3=function(e){var t=e.srcElement?e.srcElement:e.target;window.GLOBAL.checkFun.isPhoneNums($(t),$(t).parent().siblings(".errorTips"),100)},t.prototype.setAppId=function(e){var t=e.srcElement?e.srcElement:e.target,a=t.value;this.setState({appId:a})},t.prototype.render=function(){var e=this,t=window.GLOBAL.pageData.myServer,a=window.GLOBAL.pageData.orderNew,i=void 0;if(this.state.APIData.length>0&&this.state.APIData.find(function(e){return 4===e.type})){var o=void 0;this.state.APIData.map(function(e,t){4===e.type&&(o=e.uploadUrl)}),i={baseUrl:o,param:{uploadToken:window.GLOBAL.uploadToken},fileFieldName:"upload",chooseAndUpload:!0,accept:a.uploadMp3.accept,beforeChoose:function(){console.log("=====START======")}.bind(this),chooseFile:function(e){console.log("=====chooseFile======");var t=n([],this.state.APIData);this.state.APIData.map(function(a,s){4===a.type&&("String"==typeof e?t[s].value=e:t[s].value=e[0].nam)}),this.setState({APIData:t})}.bind(this),beforeUpload:function(e,t){if(console.log("=====beforeUpload======"),"String"==typeof e)return!0;var s={id:"",text:"选择文件",errorTips:"",status:!1},i=n([],this.state.APIData);return this.state.APIData.map(function(e,t){4===e.type&&(i[t].value="")}),0===e[0].size?(s.errorTips="* 文件大小为0,请重新上传!",this.setState({upload:s,APIData:i}),!1):!(e[0].size>a.uploadMp3.maxSize)||(s.errorTips="* 文件过大,请重新上传!",this.setState({upload:s,APIData:i}),!1)}.bind(this),doUpload:function(e,t,a){console.log("=====doUpload======");var s={id:a,text:"上传中...",errorTips:"",status:!1};this.setState({upload:s})}.bind(this),uploadSuccess:function(e){if(console.log("=====uploadSuccess======"),e.code){var t={id:"",text:"选择文件",errorTips:"* 上传成功!",status:!0},a=n([],this.state.APIData);this.state.APIData.map(function(t,s){4===t.type&&(a[s].value=e.data)}),this.setState({upload:t,APIData:a})}else{var s={id:"",text:"选择文件",errorTips:e.errorTips,status:!1};this.setState({upload:s})}}.bind(this),uploadError:function(e){console.log("uploadError===="+e.message);var t={id:"",text:"选择文件",errorTips:"* 上传失败,请重新上传!",status:!1},a=n([],this.state.APIData);this.state.APIData.map(function(e,t){4===e.type&&(a[t].value="")}),this.setState({upload:t,APIData:a})}.bind(this),uploadFail:function(e){console.log("uploadFail===="+e);var t={id:"",text:"选择文件",errorTips:"* 上传失败,请重新上传!",status:!1},a=n([],this.state.APIData);this.state.APIData.map(function(e,t){4===e.type&&(a[t].value="")}),this.setState({upload:t,APIData:a})}.bind(this)}}return p.createElement("div",{className:"order"},p.createElement("div",{className:"whiteSpace"},p.createElement("ul",{className:"bigCircleProgress"},p.createElement("li",{className:"bigCircle select"},p.createElement("div",{className:"text"},"配置订单"),p.createElement("div",{className:"num"},"1"),p.createElement("div",{className:"circleSmall"},p.createElement("div",null),p.createElement("div",null),p.createElement("div",null))),p.createElement("li",{className:"bigCircle"},p.createElement("div",{className:"text"},"确认订单"),p.createElement("div",{className:"num"},"2"),p.createElement("div",{className:"circleSmall"},p.createElement("div",null),p.createElement("div",null),p.createElement("div",null))),p.createElement("li",{className:"bigCircle"},p.createElement("div",{className:"text"},"订购成功"),p.createElement("div",{className:"num"},"3"))),p.createElement("div",{className:"title"},"计费类型选择"),p.createElement(m,{striped:!0,hover:!0,responsive:!0,className:"basicList fl",style:{borderTop:"1px solid #ddd"}},p.createElement("thead",null,p.createElement("tr",null,p.createElement("th",{className:"th0",key:0},"API名称"),p.createElement("th",{style:{width:"80%"}},a.listTitle.map(function(e,t){return p.createElement("div",{className:"fl th"+(t+1),key:t+1},e)})))),p.createElement("tbody",null,p.createElement("tr",null,p.createElement("td",{className:"th0"},this.state.name),p.createElement("td",{style:{width:"80%"}},p.createElement(m,{striped:!0,hover:!0,responsive:!0,className:"basicList fl",style:{marginBottom:"0"}},p.createElement("tbody",null,this.state.data.map(function(t,s){return p.createElement("tr",{className:s%2===0?"bgGray":"",key:s},a.showKey.map(function(a,s){return p.createElement("td",{key:s,className:"th"+(s+1)},"typeId"===a?p.createElement(f,{className:e.state.selTypId===t.typeId?"circle active":"circle",onClick:e.selTypId,value:t.typeId}):"[object Array]"===Object.prototype.toString.call(t[a])?t[a].map(function(e,t){return p.createElement("div",{className:"line",key:t},e)}):t[a])}))}))))))),p.createElement("div",{className:"title"},"订单所属应用"),p.createElement("div",{className:"appArea"},this.state.appData.map(function(t,a){return p.createElement(f,{key:a,onClick:e.setAppId,className:e.state.appId===t.id?"btn btn-other select fl":"btn btn-other fl",value:t.id},t.name)})),p.createElement(u,{role:"button",className:"btn btn-default",to:"/myAppsAdd"},p.createElement("span",{className:"glyphicon glyphicon-plus"})),this.state.APIData.length>0?p.createElement("div",{className:"title"},"API产品配置"):"",p.createElement("ul",{className:"APIData"},p.createElement(y,null,this.state.APIData.map(function(t,a){return 0===t.type?p.createElement("li",{key:a,className:"fl",style:{width:"100%"}},p.createElement("span",{className:"fl block"},t.text),"originalNumber"===t.key||"modifyNumber"===t.key||"prefixMonitorParty"===t.key||"modifyMonitorParty"===t.key?p.createElement("input",{type:"text",className:"fl phone apiType"+t.type,value:t.value,onChange:e.setItemType0,title:a,onBlur:e.checkItemType0Phone}):"numberPrefix"===t.key?p.createElement("input",{type:"text",maxLength:"7",className:"fl number apiType"+t.type,value:t.value,onChange:e.setItemType0,title:a,onBlur:e.checkItemType0Number}):p.createElement("input",{type:"text",className:"fl url apiType"+t.type,value:t.value,onChange:e.setItemType0,title:a,onBlur:e.checkItemType0Url}),p.createElement("div",{className:"errorTips fl"})):1===t.type?p.createElement("li",{key:a,className:"fl",style:{width:"50%"}},p.createElement("span",{className:"fl block"},t.text),p.createElement(v,{id:t.key},p.createElement(v.Toggle,null,p.createElement("input",{className:"text",placeholder:"请选择",style:{width:"100px",backgroundColor:"transparent",border:"0"},disabled:!0,value:t.child.map(function(e,a){return e.value===t.value?e.text:""}).toString().replace(/\,/g,"")})),p.createElement(v.Menu,null,t.child.map(function(t,s){return p.createElement(T,{eventKey:t.value+"_"+a,key:s,onSelect:e.selectItemType1},t.text)}))),p.createElement("div",{className:"errorTips fl"})):2===t.type?p.createElement("li",{key:a,className:"fl",style:{width:"100%"}},p.createElement("span",{className:"fl block"},t.text),p.createElement("ul",{className:"fl checkBoxList"},t.child.map(function(s,n){return p.createElement("li",{className:"fl",key:n},p.createElement(E,{style:{float:"left"},s:!!t.value.find(function(e){return e===s.value}),onClick:e.selectItemType2.bind(e,a,n)}),p.createElement("div",{className:"fl"},s.text))}))):3!==t.type||""!==t.value&&"string"!=typeof t.value?4===t.type?p.createElement("li",{key:a,className:"fl",style:{width:"100%"}},p.createElement("span",{className:"fl block"},t.text),p.createElement("input",{type:"text",readOnly:!0,className:"upload mp3 fl",value:t.value?t.value.split("/")[t.value.split("/").length-1]:""}),p.createElement(b,{options:i,className:"fl"},p.createElement("button",{ref:"chooseAndUpload",className:"btn btn-default"},e.state.upload.text)),p.createElement("a",{target:"_blank",style:{marginLeft:"10px"},className:"link fl",href:t.url,download:!0},"下载文件"),p.createElement("div",{className:"errorTips fl"},e.state.upload.errorTips)):"":p.createElement("li",{key:a,className:"fl phonesBox",style:{width:"100%"}},p.createElement("span",{className:"fl block"},t.text),p.createElement("div",{className:"textArea fl"},p.createElement("div",{className:"heightAuto"},t.value),p.createElement("textarea",{className:"phones fl apiType"+t.type,onChange:e.setItemType0,onBlur:e.checkItemType3,title:a,value:t.value})),p.createElement("div",{className:"errorTips fl"}),p.createElement("div",{className:"fl underTips",style:{width:"100%"}},"多个手机号码之间请用“;”分隔！"))}))),this.state.APIData.find(function(e){return""===e.value||"[object Array]"===Object.prototype.toString.call(e.value)&&0===e.value.length})?p.createElement("div",{className:"inputLine center"},p.createElement(f,{bsStyle:"success",disabled:!0,onClick:this.submit},"下一步")):""===this.state.appId?p.createElement("div",{className:"inputLine center"},p.createElement(f,{bsStyle:"success",disabled:!0,onClick:this.submit},"下一步")):p.createElement("div",{className:"inputLine center"},p.createElement(f,{bsStyle:"success",onClick:this.submit},"下一步"))),1===this.state.showTips?p.createElement(g,s({},a.tips,{onCancel:this.handleCancel})):2===this.state.showTips?p.createElement(g,{className:t.unOrder.className,text:this.state.tipsText,btns:t.unOrder.btns,onCancel:this.handleCancel}):"")},t}(p.Component));e.exports=I},826:function(e,t,a){"use strict";var s=a(520).default,n=a(521).default,i=a(558).default,o=a(559).default,r=a(595).default,l=a(299),p=function(e){function t(a){i(this,t);var s=o(this,e.call(this,a));return s.handleClick=s.handleClick.bind(s),s}return r(t,e),t.prototype.handleClick=function(){"function"==typeof this.props.onClick?this.props.onClick():this.state.s?this.setState({s:!1}):this.setState({s:!0})},t.prototype.render=function(){var e=n({},this.props);return delete e.v,delete e.s,delete e.style,l.createElement("div",{style:this.props.style,className:"checkBoxArea"},l.createElement("input",s({},e,{type:"checkbox",className:this.props.s?"checkBoxBtn s1":"checkBoxBtn",checked:this.props.s,value:this.props.v,onClick:this.handleClick})),l.createElement("div",null))},t}(l.Component);p.propTypes={name:l.PropTypes.string.isRequired,s:l.PropTypes.bool.isRequired,v:l.PropTypes.string.isRequired},p.defaultProps={name:"",s:!1,v:""},e.exports=p},827:function(module,exports,__webpack_require__){!function(e,t){module.exports=t(__webpack_require__(299))}(this,function(__WEBPACK_EXTERNAL_MODULE_1__){return function(e){function t(s){if(a[s])return a[s].exports;var n=a[s]={exports:{},id:s,loaded:!1};return e[s].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(module,exports,__webpack_require__){"use strict";var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},React=__webpack_require__(1),emptyFunction=function(){},currentIEID=0,IEFormGroup=[!0],xhrList=[],currentXHRID=0,PT=React.PropTypes,FileUpload=React.createClass({displayName:"FileUpload",propTypes:{options:PT.shape({baseUrl:PT.string.isRequired,param:PT.oneOfType([PT.object,PT.func]),dataType:PT.string,chooseAndUpload:PT.bool,paramAddToField:PT.oneOfType([PT.object,PT.func]),wrapperDisplay:PT.string,timeout:PT.number,accept:PT.string,multiple:PT.bool,numberLimit:PT.oneOfType([PT.number,PT.func]),fileFieldName:PT.oneOfType([PT.string,PT.func]),withCredentials:PT.bool,requestHeaders:PT.object,tag:PT.string,userAgent:PT.string,disabledIEChoose:PT.oneOfType([PT.bool,PT.func]),_withoutFileUpload:PT.bool,filesToUpload:PT.arrayOf(PT.object),textBeforeFiles:PT.bool,beforeChoose:PT.func,chooseFile:PT.func,beforeUpload:PT.func,doUpload:PT.func,uploading:PT.func,uploadSuccess:PT.func,uploadError:PT.func,uploadFail:PT.func,onabort:PT.func}).isRequired,style:PT.object,className:PT.string},_updateProps:function(e){var t=this;this.isIE=!(this.checkIE()<0||this.checkIE()>=10);var a=e.options;this.baseUrl=a.baseUrl,this.param=a.param,this.chooseAndUpload=a.chooseAndUpload||!1,this.paramAddToField=a.paramAddToField||void 0,this.dataType="json",a.dataType&&"text"==a.dataType.toLowerCase()&&(this.dataType="text"),this.wrapperDisplay=a.wrapperDisplay||"inline-block",this.timeout="number"==typeof a.timeout&&a.timeout>0?a.timeout:0,this.accept=a.accept||"",this.multiple=a.multiple||!1,this.numberLimit=a.numberLimit||!1,this.fileFieldName=a.fileFieldName||!1,this.withCredentials=a.withCredentials||!1,this.requestHeaders=a.requestHeaders||!1,this.beforeChoose=a.beforeChoose||emptyFunction,this.chooseFile=a.chooseFile||emptyFunction,this.beforeUpload=a.beforeUpload||emptyFunction,this.doUpload=a.doUpload||emptyFunction,this.uploading=a.uploading||emptyFunction,this.uploadSuccess=a.uploadSuccess||emptyFunction,this.uploadError=a.uploadError||emptyFunction,this.uploadFail=a.uploadFail||emptyFunction,this.onabort=a.onabort||emptyFunction,this.files=a.files||this.files||!1,this.disabledIEChoose=a.disabledIEChoose||!1,this._withoutFileUpload=a._withoutFileUpload||!1,this.filesToUpload=a.filesToUpload||[],this.textBeforeFiles=a.textBeforeFiles||!1,this.filesToUpload.length&&!this.isIE&&this.filesToUpload.forEach(function(e){t.files=[e],t.commonUpload()});var s=void 0,n=void 0,i=0,o=[],r=[],l=[];this.chooseAndUpload?React.Children.forEach(e.children,function(e){e&&"chooseAndUpload"==e.ref?(s=e,i++):0==i?o.push(e):1==i?r.push(e):""}):React.Children.forEach(e.children,function(e){e&&"chooseBtn"==e.ref?(s=e,i++):e&&"uploadBtn"==e.ref?(n=e,i++):0==i?o.push(e):1==i?r.push(e):l.push(e)}),this.setState({chooseBtn:s,uploadBtn:n,before:o,middle:r,after:l})},commonChooseFile:function(){var e=this.beforeChoose();1!=e&&void 0!=e||this.refs.ajax_upload_file_input.click()},commonChange:function(e){var t=void 0;e.dataTransfer?t=e.dataTransfer.files:e.target?t=e.target.files:"";var a="function"==typeof this.numberLimit?this.numberLimit():this.numberLimit;if(this.multiple&&a&&t.length>a){for(var s={},n=0;n<a;n++)s[n]=t[n];s.length=a,t=s}this.files=t,this.chooseFile(t),this.chooseAndUpload&&this.commonUpload()},commonUpload:function(){var e=this,t=this.files.length&&this.files[0].mill||(new Date).getTime(),a=this.beforeUpload(this.files,t);if(1!=a&&void 0!=a&&"object"!=("undefined"==typeof a?"undefined":_typeof(a)))return void(this.refs.ajax_upload_file_input.value="");if(this.files){if(!this.baseUrl)throw new Error("baseUrl missing in options");var s={},n=new FormData;this.textBeforeFiles&&(n=this.appendFieldsToFormData(n)),this._withoutFileUpload||!function(){var t=_typeof(e.fileFieldName);Object.keys(e.files).forEach(function(a){if("length"!=a)if("function"==t){var s=e.files[a],i=e.fileFieldName(s);n.append(i,s)}else if("string"==t){var o=e.files[a];n.append(e.fileFieldName,o)}else{var r=e.files[a];n.append(r.name,r)}})}(),this.textBeforeFiles||(n=this.appendFieldsToFormData(n));var i=this.baseUrl,o="function"==typeof this.param?this.param(this.files):this.param,r="";o&&!function(){var e=[];o._=t,Object.keys(o).forEach(function(t){return e.push(t+"="+o[t])}),r="?"+e.join("&")}();var l=i+r,p=new XMLHttpRequest;p.open("POST",l,!0),p.withCredentials=this.withCredentials;var c=this.requestHeaders;c&&Object.keys(c).forEach(function(e){return p.setRequestHeader(e,c[e])}),this.timeout&&(p.timeout=this.timeout,p.ontimeout=function(){e.uploadError({type:"TIMEOUTERROR",message:"timeout"}),s.isTimeout=!1},s.isTimeout=!1,setTimeout(function(){s.isTimeout=!0},this.timeout)),p.onreadystatechange=function(){try{if(4==p.readyState&&p.status>=200&&p.status<400){var t="json"==e.dataType?JSON.parse(p.responseText):p.responseText;e.uploadSuccess(t)}else if(4==p.readyState){var a="json"==e.dataType?JSON.parse(p.responseText):p.responseText;e.uploadFail(a)}}catch(t){!s.isTimeout&&e.uploadError({type:"FINISHERROR",message:t.message})}},p.onerror=function(){try{var t="json"==e.dataType?JSON.parse(p.responseText):p.responseText;e.uploadError({type:"XHRERROR",message:t})}catch(t){e.uploadError({type:"XHRERROR",message:t.message})}},p.onprogress=p.upload.onprogress=function(a){e.uploading(a,t)},this._withoutFileUpload?p.send(null):p.send(n),xhrList.push(p);var u=xhrList.length-1;currentXHRID=u,p.onabort=function(){return e.onabort(t,u)},this.doUpload(this.files,t,currentXHRID),this.refs.ajax_upload_file_input.value=""}},appendFieldsToFormData:function(e){var t="function"==typeof this.paramAddToField?this.paramAddToField():this.paramAddToField;return t&&Object.keys(t).map(function(a){return e.append(a,t[a])}),e},IEBeforeChoose:function(e){var t=this.beforeChoose();1!=t&&void 0!=t&&e.preventDefault()},IEChooseFile:function(e){this.fileName=e.target.value.substring(e.target.value.lastIndexOf("\\")+1),this.chooseFile(this.fileName),this.chooseAndUpload&&this.IEUpload()!==!1&&document.getElementById("ajax_upload_file_form_"+this.IETag+currentIEID).submit(),e.target.blur()},IEUpload:function(e){function t(){clearInterval(f);try{i.uploadSuccess(i.IECallback(i.dataType,y))}catch(e){i.uploadError(e)}finally{var e=document.getElementById("ajax_upload_hidden_input_"+i.IETag+y);e.outerHTML=e.outerHTML}}var a=this,s=(new Date).getTime(),n=this.beforeUpload(this.fileName,s);if(!this.fileName||1!=n&&void 0!=n)return e&&e.preventDefault(),!1;var i=this,o=this.baseUrl,r="function"==typeof this.param?this.param(this.fileName):this.param,l="";if(r){var p=[];r._=s,void 0===r.ie&&(r.ie="true");for(var c in r)void 0!=r[c]&&p.push(c+"="+r[c]);l="?"+p.join("&")}var u=o+l;document.getElementById("ajax_upload_file_form_"+this.IETag+currentIEID).setAttribute("action",u);var d=this.fakeProgress(),h=0,m=0,f=setInterval(function(){h=d(h),a.uploading({loaded:h,total:100},s),++m>=150&&clearInterval(f)},200),y=currentIEID;window.attachEvent?document.getElementById("ajax_upload_file_frame_"+this.IETag+y).attachEvent("onload",t):document.getElementById("ajax_upload_file_frame_"+this.IETag+y).addEventListener("load",t),this.doUpload(this.fileName,s),IEFormGroup[currentIEID]=!1},IECallback:function IECallback(dataType,frameId){IEFormGroup[frameId]=!0;var frame=document.getElementById("ajax_upload_file_frame_"+this.IETag+frameId),resp={},content=frame.contentWindow?frame.contentWindow.document.body:frame.contentDocument.document.body;if(!content)throw new Error("Your browser does not support async upload");try{resp.responseText=content.innerHTML||"null innerHTML",resp.json=JSON?JSON.parse(resp.responseText):eval("("+resp.responseText+")")}catch(e){if(e.message&&e.message.indexOf("Unexpected token")>=0){if(resp.responseText.indexOf("{")>=0){var msg=resp.responseText.substring(resp.responseText.indexOf("{"),resp.responseText.lastIndexOf("}")+1);return JSON?JSON.parse(msg):eval("("+msg+")")}return{type:"FINISHERROR",message:e.message}}throw e}return"json"==dataType?resp.json:resp.responseText},forwardChoose:function(){return!this.isIE&&void this.commonChooseFile()},fowardRemoveFile:function(e){this.files=e(this.files)},filesToUpload:function(e){this.isIE||(this.files=e,this.commonUpload())},abort:function(e){void 0===e?xhrList[currentXHRID].abort():xhrList[e].abort()},checkIE:function(){var e=this.userAgent,t=e.indexOf("MSIE");return t<0?-1:parseFloat(e.substring(t+5,e.indexOf(";",t)))},fakeProgress:function(){var e=6,t=.3,a=98,s=.2;return function(n){var i=n;return i>=a?i:(i+=e,e-=t,e<s&&(e=s),i)}},getUserAgent:function(){var e=this.props.options.userAgent,t="undefined"!=typeof navigator;if(!t&&!e)throw new Error("`options.userAgent` must be set rendering react-fileuploader in situations when `navigator` is not defined in the global namespace. (on the server, for example)");return t?navigator.userAgent:e},getInitialState:function(){return{chooseBtn:{},uploadBtn:{},before:[],middle:[],after:[]}},componentWillMount:function(){this.userAgent=this.getUserAgent(),this.isIE=!(this.checkIE()<0||this.checkIE()>=10);var e=this.props.options&&this.props.options.tag;this.IETag=e?e+"_":"",this._updateProps(this.props)},componentDidMount:function(){},componentWillReceiveProps:function(e){this._updateProps(e)},render:function(){return this._packRender()},_packRender:function(){var e="";if(this.isIE)e=this._multiIEForm();else{var t={accept:this.accept,multiple:this.multiple};e=React.createElement("div",{className:this.props.className,style:this.props.style},this.state.before,React.createElement("div",{onClick:this.commonChooseFile,style:{overflow:"hidden",postion:"relative",display:this.wrapperDisplay}},this.state.chooseBtn),this.state.middle,React.createElement("div",{onClick:this.commonUpload,style:{overflow:"hidden",postion:"relative",display:this.chooseAndUpload?"none":this.wrapperDisplay}},this.state.uploadBtn),this.state.after,React.createElement("input",_extends({type:"file",name:"ajax_upload_file_input",ref:"ajax_upload_file_input",style:{display:"none"},onChange:this.commonChange},t)))}return e},_multiIEForm:function(){function e(e,t){if(!IEFormGroup[t]||!a){var n=IEFormGroup[t],i={position:"absolute",left:"-30px",top:0,zIndex:"50",fontSize:"80px",width:"200px",opacity:0,filter:"alpha(opacity=0)"},o={accept:this.accept,disabled:s},r=React.createElement("input",_extends({type:"file",name:"ajax_upload_hidden_input_"+t,id:"ajax_upload_hidden_input_"+t,ref:"ajax_upload_hidden_input_"+t,onChange:this.IEChooseFile,onClick:this.IEBeforeChoose,style:i},o));t=""+this.IETag+t,e.push(React.createElement("form",{id:"ajax_upload_file_form_"+t,method:"post",target:"ajax_upload_file_frame_"+t,key:"ajax_upload_file_form_"+t,encType:"multipart/form-data",ref:"form_"+t,onSubmit:this.IEUpload,style:{display:n?"block":"none"}},this.state.before,React.createElement("div",{style:{overflow:"hidden",position:"relative",display:"inline-block"}},this.state.chooseBtn,r),this.state.middle,React.createElement("div",{style:{overflow:"hidden",position:"relative",display:this.chooseAndUpload?"none":this.wrapperDisplay}},this.state.uploadBtn,React.createElement("input",{type:"submit",style:{position:"absolute",left:0,top:0,fontSize:"50px",width:"200px",opacity:0}})),this.state.after)),e.push(React.createElement("iframe",{id:"ajax_upload_file_frame_"+t,name:"ajax_upload_file_frame_"+t,key:"ajax_upload_file_frame_"+t,className:"ajax_upload_file_frame",style:{display:"none",width:0,height:0,margin:0,border:0}}))}}for(var t=[],a=!1,s="function"==typeof this.disabledIEChoose?this.disabledIEChoose():this.disabledIEChoose,n=0;n<IEFormGroup.length;n++)e.call(this,t,n),IEFormGroup[n]&&!a&&(a=!0,currentIEID=n),n==IEFormGroup.length-1&&!a&&IEFormGroup.push(!0);return React.createElement("div",{className:this.props.className,style:this.props.style,id:"react-file-uploader"},t)}});module.exports=FileUpload},function(e,t){e.exports=__WEBPACK_EXTERNAL_MODULE_1__}])})},828:function(e,t,a){"use strict";var s=a(558).default,n=a(559).default,i=a(595).default,o=a(299),r=a(518),l=r.Button,p=function(e){function t(a){s(this,t);var i=n(this,e.call(this,a));return i.handleClick=i.handleClick.bind(i),i.handCancel=i.handCancel.bind(i),i}return i(t,e),t.prototype.handleClick=function(){"function"==typeof this.props.onSubmit&&this.props.onSubmit()},t.prototype.handCancel=function(){"function"==typeof this.props.onCancel&&this.props.onCancel()},t.prototype.render=function(){var e=this,t=[];return this.props.btns.length&&this.props.btns.map(function(a,s){t.push(o.createElement(l,{key:s,bsStyle:0===s?"primary":"default",onClick:a.type?e.handleClick:e.handCancel},a.text))}),o.createElement("div",{className:"tipsBg"},o.createElement("div",{className:"tipsBox"},o.createElement("div",{className:"tips "+this.props.className},o.createElement("div",{className:"tipsTitle"},this.props.title),o.createElement("div",{className:"tipsContext"},this.props.text),o.createElement("div",{className:"tipsBtnArea"},t))))},t}(o.Component);p.propTypes={className:o.PropTypes.string.isRequired,title:o.PropTypes.string.isRequired,text:o.PropTypes.string.isRequired,btns:o.PropTypes.array.isRequired},p.defaultProps={className:"",title:"提示",text:"",btns:[{text:"确定",type:1},{text:"取消",type:0}]},e.exports=p},829:function(e,t,a){!function(){var t=a(830),s=a(831).utf8,n=a(832),i=a(831).bin,o=function(e,a){e.constructor==String?e=a&&"binary"===a.encoding?i.stringToBytes(e):s.stringToBytes(e):n(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||(e=e.toString());for(var r=t.bytesToWords(e),l=8*e.length,p=1732584193,c=-271733879,u=-1732584194,d=271733878,h=0;h<r.length;h++)r[h]=16711935&(r[h]<<8|r[h]>>>24)|4278255360&(r[h]<<24|r[h]>>>8);r[l>>>5]|=128<<l%32,r[(l+64>>>9<<4)+14]=l;for(var m=o._ff,f=o._gg,y=o._hh,v=o._ii,h=0;h<r.length;h+=16){var T=p,E=c,b=u,g=d;p=m(p,c,u,d,r[h+0],7,-680876936),d=m(d,p,c,u,r[h+1],12,-389564586),u=m(u,d,p,c,r[h+2],17,606105819),c=m(c,u,d,p,r[h+3],22,-1044525330),p=m(p,c,u,d,r[h+4],7,-176418897),d=m(d,p,c,u,r[h+5],12,1200080426),u=m(u,d,p,c,r[h+6],17,-1473231341),c=m(c,u,d,p,r[h+7],22,-45705983),p=m(p,c,u,d,r[h+8],7,1770035416),d=m(d,p,c,u,r[h+9],12,-1958414417),u=m(u,d,p,c,r[h+10],17,-42063),c=m(c,u,d,p,r[h+11],22,-1990404162),p=m(p,c,u,d,r[h+12],7,1804603682),d=m(d,p,c,u,r[h+13],12,-40341101),u=m(u,d,p,c,r[h+14],17,-1502002290),c=m(c,u,d,p,r[h+15],22,1236535329),p=f(p,c,u,d,r[h+1],5,-165796510),d=f(d,p,c,u,r[h+6],9,-1069501632),u=f(u,d,p,c,r[h+11],14,643717713),c=f(c,u,d,p,r[h+0],20,-373897302),p=f(p,c,u,d,r[h+5],5,-701558691),d=f(d,p,c,u,r[h+10],9,38016083),u=f(u,d,p,c,r[h+15],14,-660478335),c=f(c,u,d,p,r[h+4],20,-405537848),p=f(p,c,u,d,r[h+9],5,568446438),d=f(d,p,c,u,r[h+14],9,-1019803690),u=f(u,d,p,c,r[h+3],14,-187363961),c=f(c,u,d,p,r[h+8],20,1163531501),p=f(p,c,u,d,r[h+13],5,-1444681467),d=f(d,p,c,u,r[h+2],9,-51403784),u=f(u,d,p,c,r[h+7],14,1735328473),c=f(c,u,d,p,r[h+12],20,-1926607734),p=y(p,c,u,d,r[h+5],4,-378558),d=y(d,p,c,u,r[h+8],11,-2022574463),u=y(u,d,p,c,r[h+11],16,1839030562),c=y(c,u,d,p,r[h+14],23,-35309556),p=y(p,c,u,d,r[h+1],4,-1530992060),d=y(d,p,c,u,r[h+4],11,1272893353),u=y(u,d,p,c,r[h+7],16,-155497632),c=y(c,u,d,p,r[h+10],23,-1094730640),p=y(p,c,u,d,r[h+13],4,681279174),d=y(d,p,c,u,r[h+0],11,-358537222),u=y(u,d,p,c,r[h+3],16,-722521979),c=y(c,u,d,p,r[h+6],23,76029189),p=y(p,c,u,d,r[h+9],4,-640364487),d=y(d,p,c,u,r[h+12],11,-421815835),u=y(u,d,p,c,r[h+15],16,530742520),c=y(c,u,d,p,r[h+2],23,-995338651),p=v(p,c,u,d,r[h+0],6,-198630844),d=v(d,p,c,u,r[h+7],10,1126891415),u=v(u,d,p,c,r[h+14],15,-1416354905),c=v(c,u,d,p,r[h+5],21,-57434055),p=v(p,c,u,d,r[h+12],6,1700485571),d=v(d,p,c,u,r[h+3],10,-1894986606),u=v(u,d,p,c,r[h+10],15,-1051523),c=v(c,u,d,p,r[h+1],21,-2054922799),p=v(p,c,u,d,r[h+8],6,1873313359),d=v(d,p,c,u,r[h+15],10,-30611744),u=v(u,d,p,c,r[h+6],15,-1560198380),c=v(c,u,d,p,r[h+13],21,1309151649),p=v(p,c,u,d,r[h+4],6,-145523070),d=v(d,p,c,u,r[h+11],10,-1120210379),u=v(u,d,p,c,r[h+2],15,718787259),c=v(c,u,d,p,r[h+9],21,-343485551),p=p+T>>>0,c=c+E>>>0,u=u+b>>>0,d=d+g>>>0}return t.endian([p,c,u,d])};o._ff=function(e,t,a,s,n,i,o){var r=e+(t&a|~t&s)+(n>>>0)+o;return(r<<i|r>>>32-i)+t},o._gg=function(e,t,a,s,n,i,o){var r=e+(t&s|a&~s)+(n>>>0)+o;return(r<<i|r>>>32-i)+t},o._hh=function(e,t,a,s,n,i,o){var r=e+(t^a^s)+(n>>>0)+o;return(r<<i|r>>>32-i)+t},o._ii=function(e,t,a,s,n,i,o){var r=e+(a^(t|~s))+(n>>>0)+o;return(r<<i|r>>>32-i)+t},o._blocksize=16,o._digestsize=16,e.exports=function(e,a){if(void 0===e||null===e)throw new Error("Illegal argument "+e);var s=t.wordsToBytes(o(e,a));return a&&a.asBytes?s:a&&a.asString?i.bytesToString(s):t.bytesToHex(s)}}()},830:function(e,t){!function(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a={rotl:function(e,t){return e<<t|e>>>32-t},rotr:function(e,t){return e<<32-t|e>>>t},endian:function(e){if(e.constructor==Number)return 16711935&a.rotl(e,8)|4278255360&a.rotl(e,24);for(var t=0;t<e.length;t++)e[t]=a.endian(e[t]);return e},randomBytes:function(e){for(var t=[];e>0;e--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(e){for(var t=[],a=0,s=0;a<e.length;a++,s+=8)t[s>>>5]|=e[a]<<24-s%32;return t},wordsToBytes:function(e){for(var t=[],a=0;a<32*e.length;a+=8)t.push(e[a>>>5]>>>24-a%32&255);return t},bytesToHex:function(e){for(var t=[],a=0;a<e.length;a++)t.push((e[a]>>>4).toString(16)),t.push((15&e[a]).toString(16));return t.join("")},hexToBytes:function(e){for(var t=[],a=0;a<e.length;a+=2)t.push(parseInt(e.substr(a,2),16));
return t},bytesToBase64:function(e){for(var a=[],s=0;s<e.length;s+=3)for(var n=e[s]<<16|e[s+1]<<8|e[s+2],i=0;i<4;i++)8*s+6*i<=8*e.length?a.push(t.charAt(n>>>6*(3-i)&63)):a.push("=");return a.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var a=[],s=0,n=0;s<e.length;n=++s%4)0!=n&&a.push((t.indexOf(e.charAt(s-1))&Math.pow(2,-2*n+8)-1)<<2*n|t.indexOf(e.charAt(s))>>>6-2*n);return a}};e.exports=a}()},831:function(e,t){var a={utf8:{stringToBytes:function(e){return a.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(a.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var t=[],a=0;a<e.length;a++)t.push(255&e.charCodeAt(a));return t},bytesToString:function(e){for(var t=[],a=0;a<e.length;a++)t.push(String.fromCharCode(e[a]));return t.join("")}}};e.exports=a},832:function(e,t){function a(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function s(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&a(e.slice(0,0))}/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&(a(e)||s(e)||!!e._isBuffer)}}});