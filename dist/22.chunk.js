webpackJsonp([22],{828:function(e,t,a){"use strict";var s=a(558).default,n=a(559).default,o=a(595).default,i=a(299),r=a(518),l=r.Button,p=function(e){function t(a){s(this,t);var o=n(this,e.call(this,a));return o.handleClick=o.handleClick.bind(o),o.handCancel=o.handCancel.bind(o),o}return o(t,e),t.prototype.handleClick=function(){"function"==typeof this.props.onSubmit&&this.props.onSubmit()},t.prototype.handCancel=function(){"function"==typeof this.props.onCancel&&this.props.onCancel()},t.prototype.render=function(){var e=this,t=[];return this.props.btns.length&&this.props.btns.map(function(a,s){t.push(i.createElement(l,{key:s,bsStyle:0===s?"primary":"default",onClick:a.type?e.handleClick:e.handCancel},a.text))}),i.createElement("div",{className:"tipsBg"},i.createElement("div",{className:"tipsBox"},i.createElement("div",{className:"tips "+this.props.className},i.createElement("div",{className:"tipsTitle"},this.props.title),i.createElement("div",{className:"tipsContext"},this.props.text),i.createElement("div",{className:"tipsBtnArea"},t))))},t}(i.Component);p.propTypes={className:i.PropTypes.string.isRequired,title:i.PropTypes.string.isRequired,text:i.PropTypes.string.isRequired,btns:i.PropTypes.array.isRequired},p.defaultProps={className:"",title:"提示",text:"",btns:[{text:"确定",type:1},{text:"取消",type:0}]},e.exports=p},845:function(e,t,a){"use strict";var s=a(558).default,n=a(559).default,o=a(595).default,i=a(299),r=a(326),l=r.findDOMNode,p=a(463),c=(p.Link,a(518)),d=c.Pagination,h=c.DropdownButton,u=c.MenuItem,m=c.Button,y=a(846),f=function(e){function t(a){s(this,t);var o=n(this,e.call(this,a));return o.state={pageNow:o.props.pageNow,i:o.props.pageList.i},o.handleSelect=o.handleSelect.bind(o),o.handleSearch=o.handleSearch.bind(o),o.handleSelectItem=o.handleSelectItem.bind(o),o._setInputVal=o._setInputVal.bind(o),o}return o(t,e),t.prototype.componentWillReceiveProps=function(e){e.pageNow!=this.state.pageNow&&e.i!=this.state.i?this.setState({pageNow:e.pageNow,i:e.i}):e.pageNow!=this.state.pageNow?this.setState({pageNow:e.pageNow}):e.i!=this.state.i&&this.setState({i:e.i})},t.prototype._setInputVal=function(e){e.state.v||e.setState({v:this.state.pageNow})},t.prototype.handleSelect=function(e){this.state.pageNow!=e&&("function"==typeof this.props.onSelect?this.props.onSelect(e):this.setState({pageNow:e}))},t.prototype.handleSearch=function(){var e=l(this),t=$(e).find("input.pageInput").val();1*t&&this.state.pageNow!=1*t&&("function"==typeof this.props.onSearch?this.props.onSearch(1*t):this.setState({pageNow:t}))},t.prototype.handleSelectItem=function(e){var t=1*e;t!=this.state.i&&("function"==typeof this.props.onSelectItem?this.props.onSelectItem(t):this.setState({i:t}))},t.prototype.render=function(){var e=this,t=void 0;return this.props.isShow&&(t=i.createElement(h,null,this.props.pageList.a.map(function(t,a){return i.createElement(u,{eventKey:a,key:a,onSelect:e.handleSelectItem},t.t)}))),i.createElement("div",{className:"pageArea"},t,i.createElement(d,{prev:!0,next:!0,items:this.props.totalPage,maxButtons:this.props.maxPage,activePage:this.state.pageNow,onSelect:this.handleSelect,className:"basicPagination"}),i.createElement("div",{className:"pageText"},"共 ",this.props.totalPage,"页 到第"),i.createElement(y,{type:"positiveInt",maxValue:this.props.totalPage,className:"pageInput",v:this.state.pageNow,onBlur:this._setInputVal}),i.createElement("div",{className:"pageText"},"页"),i.createElement(m,{onClick:this.handleSearch},"确定"))},t}(i.Component);f.propTypes={isShow:i.PropTypes.bool.isRequired,totalPage:i.PropTypes.number.isRequired,maxPage:i.PropTypes.number.isRequired,pageNow:i.PropTypes.number.isRequired,pageList:i.PropTypes.object.isRequired},f.defaultProps={isShow:!1,totalPage:1,maxPage:1,pageNow:1,pageList:{i:0,a:[{t:10,v:10},{t:30,v:30},{t:50,v:50}]}},e.exports=f},846:function(e,t,a){"use strict";var s=a(520).default,n=a(521).default,o=a(558).default,i=a(559).default,r=a(595).default,l=a(299),p=function(e){function t(a){o(this,t);var s=i(this,e.call(this,a));return s.state={v:s.props.v},s.handleChange=s.handleChange.bind(s),s.handleBlur=s.handleBlur.bind(s),s.handleKeyUp=s.handleKeyUp.bind(s),s.handleFocus=s.handleFocus.bind(s),s._setPositiveInt=s._setPositiveInt.bind(s),s._setNaturalNum=s._setNaturalNum.bind(s),s._setMoney=s._setMoney.bind(s),s._setNum=s._setNum.bind(s),s}return r(t,e),t.prototype.componentWillReceiveProps=function(e){e.v!=this.state.v&&this.setState({v:e.v})},t.prototype._setPositiveInt=function(e){/^[1-9]\d*$/.test(e)&&this.setState({v:1*e})},t.prototype._setNaturalNum=function(e){/^\d*$/.test(e)&&this.setState({v:1*e})},t.prototype._setMoney=function(e){if(/^(\-)?(\d)*(\.)?(\d{0,2})$/.test(e)){var t="",a=e;0==e.indexOf("-")&&(t=e.slice(0,1),a=e.substring(1));var s=/\d{1,3}(?=(\d{3})+$)/g,n=a.replace(/^(\d+)((\.\d+)?)$/,function(e,t,a){return t.replace(s,"$&,")+a});this.setState({v:t+n})}},t.prototype._setNum=function(e){/^(\-)?(\d)*(\.)?\d*$/.test(e)&&this.setState({v:1*e})},t.prototype.handleChange=function(e){var t=e.srcElement?e.srcElement:e.target,a=t.value;if(""===a)this.setState({v:""});else if("money"===this.props.type){var s=a.replace(/\,/g,"");this.props.maxValue&&1*s>1*this.props.maxValue?this._setMoney(this.props.maxValue):this._setMoney(s)}else"positiveInt"===this.props.type?this.props.maxValue&&1*a>1*this.props.maxValue?this._setPositiveInt(this.props.maxValue):this._setPositiveInt(a):"naturalNum"===this.props.type?this.props.maxValue&&1*a>1*this.props.maxValue?this._setNaturalNum(this.props.maxValue):this._setNaturalNum(a):"number"===this.props.type&&(this.props.maxValue&&1*a>1*this.props.maxValue?this._setNum(this.props.maxValue):this._setNum(a));"function"==typeof this.props.onChange&&this.props.onChange(this)},t.prototype.handleBlur=function(e){if("money"===this.props.type){if(this.state.v)if("-"===this.state.v)this.setState({v:""});else{var t=this.state.v.replace(/\,/g,""),a=parseFloat(t).toFixed(2),s="",n=a;0==a.indexOf("-")&&(s=a.slice(0,1),n=a.substring(1));var o=/\d{1,3}(?=(\d{3})+$)/g,i=n.replace(/^(\d+)((\.\d+)?)$/,function(e,t,a){return t.replace(o,"$&,")+a});this.setState({v:s+i})}}else"number"===this.props.type&&"-"===this.state.v&&this.setState({v:""});"function"==typeof this.props.onBlur&&this.props.onBlur(this)},t.prototype.handleKeyUp=function(e){"function"==typeof this.props.onKeyUp&&this.props.onKeyUp(this)},t.prototype.handleFocus=function(e){"function"==typeof this.props.onFocus&&this.props.onFocus(this)},t.prototype.render=function(){var e=n({},this.props);return delete e.type,delete e.maxValue,delete e.v,l.createElement("input",s({},e,{type:"text",value:this.state.v,onKeyUp:this.handleKeyUp,onBlur:this.handleBlur,onFocus:this.handleFocus,onChange:this.handleChange}))},t}(l.Component);p.propTypes={type:l.PropTypes.string.isRequired},p.defaultProps={type:"text",className:"",v:"",maxValue:""},e.exports=p},858:function(e,t,a){"use strict";var s=a(520).default,n=a(558).default,o=a(559).default,i=a(595).default,r=a(299),l=a(799),p=a(463),c=p.Link,d=p.hashHistory,h=a(518),u=h.Button,m=h.Table,y=h.ButtonToolbar,f=(h.DropdownButton,h.Dropdown),g=h.MenuItem,v=h.Row,w=h.Col,N=a(859),S=a(862),E=a(845),b=a(828);a(974),l.defineReact(r);var x=function(e){function t(a){n(this,t);var s=o(this,e.call(this,a));return s.state={},s.del=s.del.bind(s),s.close=s.close.bind(s),s.verifyClose=s.verifyClose.bind(s),s.setMessageInfo=s.setMessageInfo.bind(s),s}return i(t,e),t.prototype.setMessageInfo=function(){window.GLOBAL.action.orderManage.saveInfo()},t.prototype.del=function(){window.GLOBAL.action.orderManage.delItem(this.props.appId)},t.prototype.close=function(){window.GLOBAL.action.orderManage.closeItem(this.props.appId)},t.prototype.verifyClose=function(){window.GLOBAL.action.orderManage.verifyCloseItem(this.props.appId)},t.prototype.render=function(){var e=this,t=void 0;return"btns"===this.props.showKeyName?(t=[],this.props.data.length?this.props.data.map(function(a,s){7===e.props.status&&"详情"!==a.text?t.push(r.createElement("div",{className:"line",style:{color:"#999"},key:s},a.text)):1===a.type&&"删除"===a.text?t.push(r.createElement(u,{bsStyle:"link",key:s,onClick:e.del},a.text)):1===a.type&&"退订"===a.text?t.push(r.createElement(u,{bsStyle:"link",key:s,onClick:e.close},a.text)):1===a.type&&"确认退订"===a.text?t.push(r.createElement(u,{bsStyle:"link",key:s,onClick:e.verifyClose},a.text)):3===a.type&&"详情"===a.text&&t.push(r.createElement(c,{role:"button",className:"btn btn-link",to:"/orderItemDetail/"+a.url,onClick:e.setMessageInfo,key:s},a.text))}):t.push(r.createElement("span",{key:0},"--"))):"[object Array]"===Object.prototype.toString.call(this.props.data)?(t=[],this.props.data.map(function(e,a){t.push(r.createElement("div",{className:"line",key:a},e))})):t=r.createElement("div",{className:"ShowTxt"},this.props.data),r.createElement("td",{className:this.props.className},t)},t}(r.Component),I=function(e){function t(){return n(this,t),o(this,e.apply(this,arguments))}return i(t,e),t.prototype.render=function(){var e=this;return r.createElement("tr",{className:this.props.className},this.props.showKey.map(function(t,a){return r.createElement(x,{status:e.props.data.status,appId:e.props.data.orderId,data:e.props.data[t],showKeyName:t,className:"th"+a,key:a})}))},t}(r.Component),L=function(e){function t(){return n(this,t),o(this,e.apply(this,arguments))}return i(t,e),t.prototype.render=function(){var e=this,t=window.GLOBAL.pageData.orderManage,a=[];return this.props.data.length?this.props.data.map(function(s,n){a.push(r.createElement("tr",{key:2*n},r.createElement("td",{colSpan:e.props.showKey.length,style:{backgroundColor:1===s.type?"#e6fbf4":"#fbfbfb"}},r.createElement("div",{className:"fl",style:{width:"10%"}},r.createElement("div",{className:"icon type"+s.status},r.createElement("div",{className:"iconBg"}),r.createElement("div",{className:"iconText"},t.status.map(function(e,t){if(e.value===s.status)return e.text})))),r.createElement("div",{className:"fl",style:{width:"30%"}},r.createElement("span",{className:"text fl"},"订单编号："),r.createElement("span",{className:"text fl"},s.orderId)),r.createElement("div",{className:"fl",style:{width:"30%"}},r.createElement("span",{className:"text fl"},"下单时间："),r.createElement("span",{className:"text fl"},s.time0)),r.createElement("div",{className:"fl",style:{width:"30%"}},r.createElement("span",{className:"text fl"},"有效期："),r.createElement("span",{className:"text fl"},s.validity))))),a.push(r.createElement(I,{data:s,key:2*n+1,showKey:e.props.showKey,className:n%2===0?"bgGray":""}))}):a.push(r.createElement("tr",{key:0},r.createElement("td",{className:"noData",colSpan:this.props.title.length},this.props.noDataTips))),r.createElement(m,{condensed:!0,responsive:!0,className:"basicList"},r.createElement("thead",null,r.createElement("tr",null,this.props.title.map(function(e,t){return r.createElement("th",{className:"th"+t,key:t},e)}))),r.createElement("tbody",null,a))},t}(r.Component);L.propTypes={title:r.PropTypes.array.isRequired,showKey:r.PropTypes.array.isRequired,data:r.PropTypes.array.isRequired,noDataTips:r.PropTypes.string.isRequired},L.defaultProps={title:[],showKey:[],data:[],noDataTips:"暂无数据"};var C=function(e){function t(a){n(this,t);var s=o(this,e.call(this,a));return s.state={orderId:"",ability:"",orderName:"",status:"",time0:"",isSearch:!1,data:[],abilityList:[]},s.store=window.GLOBAL.store.orderManage,s._getInfo=s._getInfo.bind(s),s.setOrderId=s.setOrderId.bind(s),s.setAbility=s.setAbility.bind(s),s.setOrderName=s.setOrderName.bind(s),s.selectStatus=s.selectStatus.bind(s),s.search=s.search.bind(s),s.clear=s.clear.bind(s),s.handleSelect=s.handleSelect.bind(s),s.handleDel=s.handleDel.bind(s),s.handleClose=s.handleClose.bind(s),s.handleVerifyClose=s.handleVerifyClose.bind(s),s.handleCancel=s.handleCancel.bind(s),s.handleEvent0=s.handleEvent0.bind(s),s}return i(t,e),t.prototype.componentDidMount=function(){window.GLOBAL.action.orderManage.init();var e={orderId:this.state.orderId,ability:this.state.ability,orderName:this.state.orderName,status:this.state.status,time0:this.state.time0,isSearch:this.state.isSearch,pageNow:this.state.pageNow,showTips:0};this.props.location.query&&this.props.location.query.ability&&(e.ability=this.props.location.query.ability,e.isSearch=!0),this.props.location.query&&this.props.location.query.status&&(e.status=1*this.props.location.query.status,e.isSearch=!0),this._getInfo(e)},t.prototype._getInfo=function(e){window.GLOBAL.action.orderManage.init(),window.GLOBAL.ajaxMap.setParms("searchOrderManage",e);var t=window.GLOBAL.ajaxMap.getAjaxParms("searchOrderManage");t.success=function(t){this.setState({orderId:e.orderId,ability:e.ability,orderName:e.orderName,status:e.status,time0:e.time0,isSearch:e.isSearch,showTips:e.showTips,pageNow:t.totalPage<e.pageNow?t.totalPage:e.pageNow,totalPage:t.totalPage,data:t.data,delId:e.delId})}.bind(this),$.ajax(t)},t.prototype.setOrderId=function(e){var t=e.srcElement?e.srcElement:e.target,a=t.value;this.setState({orderId:a})},t.prototype.setAbility=function(e){var t=e.srcElement?e.srcElement:e.target,a=t.value;this.setState({ability:a})},t.prototype.setOrderName=function(e){var t=e.srcElement?e.srcElement:e.target,a=t.value;this.setState({orderName:a})},t.prototype.selectStatus=function(e){this.setState({status:e})},t.prototype.search=function(){var e={orderId:this.state.orderId,ability:this.state.ability,orderName:this.state.orderName,status:this.state.status,time0:this.state.time0,isSearch:!0,showTips:0,pageNow:1,delId:[]};""===e.orderId&&""===e.ability&&""===e.orderName&&""===e.status&&""===e.time0&&(e.isSearch=!1),this._getInfo(e)},t.prototype.clear=function(){var e={orderId:"",ability:"",orderName:"",status:"",time0:"",isSearch:!1,showTips:0,pageNow:1,delId:[]};this._getInfo(e)},t.prototype.handleSelect=function(e){var t={orderId:this.state.orderId,ability:this.state.ability,orderName:this.state.orderName,status:this.state.status,time0:this.state.time0,isSearch:this.state.isSearch,showTips:0,delId:"",closeId:"",pageNow:e};this._getInfo(t)},t.prototype.handleDel=function(){var e={orderId:this.state.delId,token:window.GLOBAL.token};window.GLOBAL.ajaxMap.setParms("delOrderItem",e);var t=window.GLOBAL.ajaxMap.getAjaxParms("delOrderItem");t.success=function(e){3===e.code?window.GLOBAL.ajaxMap.checkError(e.codeStatus,d):e.code&&this.handleSelect(this.state.pageNow)}.bind(this),$.ajax(t)},t.prototype.handleClose=function(){window.GLOBAL.ajaxMap.setParm("closeOrderItem","orderId",this.state.closeId),window.GLOBAL.ajaxMap.setParm("closeOrderItem","token",window.GLOBAL.token);var e=window.GLOBAL.ajaxMap.getAjaxParms("closeOrderItem");e.success=function(e){3===e.code?window.GLOBAL.ajaxMap.checkError(e.codeStatus,d):e.code&&this.handleSelect(this.state.pageNow)}.bind(this),$.ajax(e)},t.prototype.handleVerifyClose=function(){window.GLOBAL.ajaxMap.setParm("verifyCloseOrderItem","orderId",this.state.closeId),window.GLOBAL.ajaxMap.setParm("verifyCloseOrderItem","token",window.GLOBAL.token);var e=window.GLOBAL.ajaxMap.getAjaxParms("verifyCloseOrderItem");e.success=function(e){3===e.code?window.GLOBAL.ajaxMap.checkError(e.codeStatus,d):e.code&&this.handleSelect(this.state.pageNow)}.bind(this),$.ajax(e)},t.prototype.handleCancel=function(){console.log("1111111111111111"),this.setState({showTips:0})},t.prototype.handleEvent0=function(e,t){"apply"===e.type&&this.setState({time0:t.startDate.format("YYYY-MM-DD")+" - "+t.endDate.format("YYYY-MM-DD")})},t.prototype.render=function(){var e=this,t=window.GLOBAL.pageData.orderManage,a="",n=void 0;return this.props.children||(t.status.map(function(t,s){t.value===e.state.status&&(a=t.text)}),n={maxDate:S(),locale:window.GLOBAL.pageData.dateRangePickerLocale}),r.createElement("div",null,this.props.children?this.props.children:r.createElement("div",{className:"orderManage"},r.createElement("div",{className:"MainTitle"},r.createElement("h1",null,t.title)),r.createElement("div",{className:"whiteSpace"},r.createElement("div",{className:"searchArea"},r.createElement(y,null,r.createElement(v,null,r.createElement(w,{xs:4},r.createElement("span",{className:"text fl"},"订单编号："),r.createElement("input",{type:"text",onChange:this.setOrderId,value:this.state.orderId})),r.createElement(w,{xs:4},r.createElement("span",{className:"text fl"},"套餐名称："),r.createElement("input",{type:"text",onChange:this.setOrderName,value:this.state.orderName})),r.createElement(w,{xs:4},r.createElement("span",{className:"text fl"},"所属应用："),r.createElement("input",{type:"text",onChange:this.setAbility,value:this.state.ability}))),r.createElement(v,null,r.createElement(w,{xs:4},r.createElement("span",{className:"text fl"},"订单状态："),r.createElement(f,{id:"status"},r.createElement(f.Toggle,null,r.createElement("input",{className:"text",placeholder:"请选择",style:{width:"143px",backgroundColor:"transparent",border:"0"},disabled:!0,value:a})),r.createElement(f.Menu,null,t.status.map(function(t,a){return r.createElement(g,{eventKey:t.value,key:a,onSelect:e.selectStatus},t.text)})))),r.createElement(w,{xs:4},r.createElement("span",{className:"text fl"},"下单时间："),r.createElement(N,{className:"dateRangeBox fl",opens:"right",applyClass:"btn-primary",dateLimit:n.dateLimit,locale:n.locale,maxDate:n.maxDate,onEvent:this.handleEvent0},r.createElement("input",{type:"text",className:"dateRange",value:this.state.time0,readOnly:!0})))),r.createElement(v,{className:"center"},r.createElement(u,{bsStyle:"primary",onClick:this.search},"查询"),this.state.isSearch?r.createElement(u,{bsStyle:"link",className:"DelAllBtn",onClick:this.clear},"清除"):"")))),r.createElement("div",{className:"whiteSpace"},r.createElement(L,{title:this.props.title,data:this.state.data,showKey:this.props.showKey}),r.createElement("div",null,r.createElement(E,{totalPage:this.state.totalPage,maxPage:3,pageNow:this.state.pageNow,onSelect:this.handleSelect,onSearch:this.handleSelect}))),1===this.state.showTips?r.createElement(b,s({},t.delOrderItem,{onSubmit:this.handleDel,onCancel:this.handleCancel})):2===this.state.showTips?r.createElement(b,s({},t.closeOrderItem,{onSubmit:this.handleClose,onCancel:this.handleCancel})):3===this.state.showTips?r.createElement(b,s({},t.closeOrderItem1,{onSubmit:this.handleVerifyClose,onCancel:this.handleCancel})):""))},t}(l.Component);C.propTypes={title:r.PropTypes.array.isRequired,showKey:r.PropTypes.array.isRequired,data:r.PropTypes.array.isRequired},C.defaultProps={title:window.GLOBAL.pageData.orderManage.listTitle,showKey:window.GLOBAL.pageData.orderManage.showKey,data:[]},e.exports=C},974:function(e,t,a){"use strict";var s=a(774).default,n=a(558).default,o=a(559).default,i=a(595).default,r=a(299),l=a(799);a(975),l.defineReact(r);var p={pageNow:1,totalPage:10};sessionStorage&&sessionStorage.orderManage&&(p=JSON.parse(sessionStorage.orderManage),sessionStorage.removeItem("orderManage"));var c=function(e){function t(){n(this,t);var a=o(this,e.call(this));return a.listenables=window.GLOBAL.action.orderManage,a.state={pageNow:p.pageNow,totalPage:p.totalPage,delId:"",showTips:0,closeId:""},a}return i(t,e),t.prototype.onInit=function(){this.setState({delId:"",showTips:0,closeId:""})},t.prototype.onSaveInfo=function(){sessionStorage.orderManage=s({pageNow:this.state.pageNow,totalPage:this.state.totalPage})},t.prototype.onDelItem=function(e){this.setState({delId:e,showTips:1})},t.prototype.onCloseItem=function(e){this.setState({closeId:e,showTips:2})},t.prototype.onVerifyCloseItem=function(e){this.setState({closeId:e,showTips:3})},t}(l.Store);window.GLOBAL.store.orderManage=c},975:function(e,t,a){"use strict";var s=a(299),n=a(799);n.defineReact(s),window.GLOBAL.action.orderManage=n.createActions(["delItem","saveInfo","init","closeItem","verifyCloseItem"])}});