webpackJsonp([16],{829:function(e,t,n){!function(){var t=n(830),r=n(831).utf8,a=n(832),o=n(831).bin,s=function(e,n){e.constructor==String?e=n&&"binary"===n.encoding?o.stringToBytes(e):r.stringToBytes(e):a(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||(e=e.toString());for(var i=t.bytesToWords(e),c=8*e.length,p=1732584193,u=-271733879,l=-1732584194,m=271733878,d=0;d<i.length;d++)i[d]=16711935&(i[d]<<8|i[d]>>>24)|4278255360&(i[d]<<24|i[d]>>>8);i[c>>>5]|=128<<c%32,i[(c+64>>>9<<4)+14]=c;for(var h=s._ff,f=s._gg,A=s._hh,g=s._ii,d=0;d<i.length;d+=16){var y=p,v=u,w=l,x=m;p=h(p,u,l,m,i[d+0],7,-680876936),m=h(m,p,u,l,i[d+1],12,-389564586),l=h(l,m,p,u,i[d+2],17,606105819),u=h(u,l,m,p,i[d+3],22,-1044525330),p=h(p,u,l,m,i[d+4],7,-176418897),m=h(m,p,u,l,i[d+5],12,1200080426),l=h(l,m,p,u,i[d+6],17,-1473231341),u=h(u,l,m,p,i[d+7],22,-45705983),p=h(p,u,l,m,i[d+8],7,1770035416),m=h(m,p,u,l,i[d+9],12,-1958414417),l=h(l,m,p,u,i[d+10],17,-42063),u=h(u,l,m,p,i[d+11],22,-1990404162),p=h(p,u,l,m,i[d+12],7,1804603682),m=h(m,p,u,l,i[d+13],12,-40341101),l=h(l,m,p,u,i[d+14],17,-1502002290),u=h(u,l,m,p,i[d+15],22,1236535329),p=f(p,u,l,m,i[d+1],5,-165796510),m=f(m,p,u,l,i[d+6],9,-1069501632),l=f(l,m,p,u,i[d+11],14,643717713),u=f(u,l,m,p,i[d+0],20,-373897302),p=f(p,u,l,m,i[d+5],5,-701558691),m=f(m,p,u,l,i[d+10],9,38016083),l=f(l,m,p,u,i[d+15],14,-660478335),u=f(u,l,m,p,i[d+4],20,-405537848),p=f(p,u,l,m,i[d+9],5,568446438),m=f(m,p,u,l,i[d+14],9,-1019803690),l=f(l,m,p,u,i[d+3],14,-187363961),u=f(u,l,m,p,i[d+8],20,1163531501),p=f(p,u,l,m,i[d+13],5,-1444681467),m=f(m,p,u,l,i[d+2],9,-51403784),l=f(l,m,p,u,i[d+7],14,1735328473),u=f(u,l,m,p,i[d+12],20,-1926607734),p=A(p,u,l,m,i[d+5],4,-378558),m=A(m,p,u,l,i[d+8],11,-2022574463),l=A(l,m,p,u,i[d+11],16,1839030562),u=A(u,l,m,p,i[d+14],23,-35309556),p=A(p,u,l,m,i[d+1],4,-1530992060),m=A(m,p,u,l,i[d+4],11,1272893353),l=A(l,m,p,u,i[d+7],16,-155497632),u=A(u,l,m,p,i[d+10],23,-1094730640),p=A(p,u,l,m,i[d+13],4,681279174),m=A(m,p,u,l,i[d+0],11,-358537222),l=A(l,m,p,u,i[d+3],16,-722521979),u=A(u,l,m,p,i[d+6],23,76029189),p=A(p,u,l,m,i[d+9],4,-640364487),m=A(m,p,u,l,i[d+12],11,-421815835),l=A(l,m,p,u,i[d+15],16,530742520),u=A(u,l,m,p,i[d+2],23,-995338651),p=g(p,u,l,m,i[d+0],6,-198630844),m=g(m,p,u,l,i[d+7],10,1126891415),l=g(l,m,p,u,i[d+14],15,-1416354905),u=g(u,l,m,p,i[d+5],21,-57434055),p=g(p,u,l,m,i[d+12],6,1700485571),m=g(m,p,u,l,i[d+3],10,-1894986606),l=g(l,m,p,u,i[d+10],15,-1051523),u=g(u,l,m,p,i[d+1],21,-2054922799),p=g(p,u,l,m,i[d+8],6,1873313359),m=g(m,p,u,l,i[d+15],10,-30611744),l=g(l,m,p,u,i[d+6],15,-1560198380),u=g(u,l,m,p,i[d+13],21,1309151649),p=g(p,u,l,m,i[d+4],6,-145523070),m=g(m,p,u,l,i[d+11],10,-1120210379),l=g(l,m,p,u,i[d+2],15,718787259),u=g(u,l,m,p,i[d+9],21,-343485551),p=p+y>>>0,u=u+v>>>0,l=l+w>>>0,m=m+x>>>0}return t.endian([p,u,l,m])};s._ff=function(e,t,n,r,a,o,s){var i=e+(t&n|~t&r)+(a>>>0)+s;return(i<<o|i>>>32-o)+t},s._gg=function(e,t,n,r,a,o,s){var i=e+(t&r|n&~r)+(a>>>0)+s;return(i<<o|i>>>32-o)+t},s._hh=function(e,t,n,r,a,o,s){var i=e+(t^n^r)+(a>>>0)+s;return(i<<o|i>>>32-o)+t},s._ii=function(e,t,n,r,a,o,s){var i=e+(n^(t|~r))+(a>>>0)+s;return(i<<o|i>>>32-o)+t},s._blocksize=16,s._digestsize=16,e.exports=function(e,n){if(void 0===e||null===e)throw new Error("Illegal argument "+e);var r=t.wordsToBytes(s(e,n));return n&&n.asBytes?r:n&&n.asString?o.bytesToString(r):t.bytesToHex(r)}}()},830:function(e,t){!function(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(e,t){return e<<t|e>>>32-t},rotr:function(e,t){return e<<32-t|e>>>t},endian:function(e){if(e.constructor==Number)return 16711935&n.rotl(e,8)|4278255360&n.rotl(e,24);for(var t=0;t<e.length;t++)e[t]=n.endian(e[t]);return e},randomBytes:function(e){for(var t=[];e>0;e--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(e){for(var t=[],n=0,r=0;n<e.length;n++,r+=8)t[r>>>5]|=e[n]<<24-r%32;return t},wordsToBytes:function(e){for(var t=[],n=0;n<32*e.length;n+=8)t.push(e[n>>>5]>>>24-n%32&255);return t},bytesToHex:function(e){for(var t=[],n=0;n<e.length;n++)t.push((e[n]>>>4).toString(16)),t.push((15&e[n]).toString(16));return t.join("")},hexToBytes:function(e){for(var t=[],n=0;n<e.length;n+=2)t.push(parseInt(e.substr(n,2),16));return t},bytesToBase64:function(e){for(var n=[],r=0;r<e.length;r+=3)for(var a=e[r]<<16|e[r+1]<<8|e[r+2],o=0;o<4;o++)8*r+6*o<=8*e.length?n.push(t.charAt(a>>>6*(3-o)&63)):n.push("=");return n.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],r=0,a=0;r<e.length;a=++r%4)0!=a&&n.push((t.indexOf(e.charAt(r-1))&Math.pow(2,-2*a+8)-1)<<2*a|t.indexOf(e.charAt(r))>>>6-2*a);return n}};e.exports=n}()},831:function(e,t){var n={utf8:{stringToBytes:function(e){return n.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(n.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t},bytesToString:function(e){for(var t=[],n=0;n<e.length;n++)t.push(String.fromCharCode(e[n]));return t.join("")}}};e.exports=n},832:function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},850:function(e,t,n){"use strict";var r=n(558).default,a=n(559).default,o=n(595).default,s=n(299),i=n(463),c=(i.Link,i.hashHistory),p=n(518),u=p.Button,l=(p.ButtonToolbar,p.DropdownButton,p.Dropdown),m=p.MenuItem,d=(n(829),function(e){function t(n){r(this,t);var o=a(this,e.call(this,n));return o.state={name:"",text:"",category:1},o.goToBack=o.goToBack.bind(o),o.submit=o.submit.bind(o),o.checkAppName=o.checkAppName.bind(o),o.checkAppText=o.checkAppText.bind(o),o.setAppName=o.setAppName.bind(o),o.setAppText=o.setAppText.bind(o),o.selectCategory=o.selectCategory.bind(o),o}return o(t,e),t.prototype.componentWillMount=function(){window.GLOBAL.promise.checkAppName||(window.GLOBAL.promise.checkAppName=$.Deferred())},t.prototype.componentWillUnmount=function(){window.GLOBAL.promise&&window.GLOBAL.promise.checkAppName&&delete window.GLOBAL.promise.checkAppName},t.prototype.goToBack=function(){c.goBack()},t.prototype.submit=function(){var e=!0;window.GLOBAL.checkFun.isNotEmpty($(".myAppsAdd .appText"),$(".myAppsAdd .appText").parent().siblings(".errorTips"))||(e=!1),e&&(window.GLOBAL.promise.checkAppName=$.Deferred(),this.checkAppName(),$.when(window.GLOBAL.promise.checkAppName).done(function(e){if(e.code){var t={name:this.state.name,des:this.state.text,category:this.state.category,token:window.GLOBAL.token};window.GLOBAL.ajaxMap.setParms("addMyApp",t);var n=window.GLOBAL.ajaxMap.getAjaxParms("addMyApp");n.success=function(e){3===e.code?window.GLOBAL.ajaxMap.checkError(e.codeStatus,c):e.code&&this.goToBack()}.bind(this),$.ajax(n)}}.bind(this)))},t.prototype.checkAppName=function(){var e=window.GLOBAL.checkFun.isAppName($(".myAppsAdd .appName"),$(".myAppsAdd .appName").siblings(".errorTips"));if(e){var t={appId:"",appName:this.state.name,token:window.GLOBAL.token};window.GLOBAL.ajaxMap.setParms("checkAppName",t);var n=window.GLOBAL.ajaxMap.getAjaxParms("checkAppName");n.success=function(e){window.GLOBAL.promise.checkAppName.resolve(e),0==e.code&&$(".myAppsAdd .appName").siblings(".errorTips").html("* 应用名称不唯一")}.bind(this),$.ajax(n)}},t.prototype.checkAppText=function(){window.GLOBAL.checkFun.isNotEmpty($(".myAppsAdd .appText"),$(".myAppsAdd .appText").parent().siblings(".errorTips"))},t.prototype.setAppName=function(e){var t=e.srcElement?e.srcElement:e.target,n=t.value;this.setState({name:n})},t.prototype.setAppText=function(e){var t=e.srcElement?e.srcElement:e.target,n=t.value;this.setState({text:n})},t.prototype.selectCategory=function(e){var t=1*e;this.setState({category:window.GLOBAL.pageData.myApps.category[t].value})},t.prototype.render=function(){var e=this,t=window.GLOBAL.pageData.myApps,n="";return t.category.map(function(t,r){t.value===e.state.category&&(n=t.text)}),s.createElement("div",{className:"myAppsAdd"},s.createElement("div",{className:"MainTitle"},s.createElement("h1",null,t.myAppsAdd.title),s.createElement(u,{className:"backBtn",onClick:this.goToBack},"返回")),s.createElement("div",{className:"whiteSpace"},s.createElement("div",{className:"inputLine"},s.createElement("span",{className:"block fl"},"应用名称："),s.createElement("input",{className:"appName fl",type:"text",maxLength:t.myAppsAdd.name.maxLength,onChange:this.setAppName,value:this.state.name,onBlur:this.checkAppName}),s.createElement("span",{className:"errorTips fl"})),s.createElement("div",{className:"inputLine"},s.createElement("span",{className:"block fl"},"鉴权策略："),s.createElement(l,{id:"searchItem"},s.createElement(l.Toggle,null,s.createElement("span",{className:"text",style:{width:"100px"}},n)),s.createElement(l.Menu,null,t.category.map(function(t,n){return s.createElement(m,{eventKey:n,key:n,onSelect:e.selectCategory},t.text)})))),s.createElement("div",{className:"inputLine"},s.createElement("span",{className:"block fl"},"应用描述："),s.createElement("div",{className:"textArea fl"},s.createElement("div",{className:"heightAuto"},this.state.text),s.createElement("textarea",{className:"appText",maxLength:t.myAppsAdd.text.maxLength,onChange:this.setAppText,onBlur:this.checkAppText,value:this.state.text})),s.createElement("span",{className:"errorTips fl"})),s.createElement("br",null),s.createElement(u,{className:"submit",bsStyle:"primary",onClick:this.submit},"确定")))},t}(s.Component));e.exports=d}});