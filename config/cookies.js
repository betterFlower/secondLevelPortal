/**
 * Created by hqer on 16/12/7.
 */
var cookies = {};
if(document.cookie){
    var aCookies = document.cookie.split("; ");
    for(var i=0;i<aCookies.length;i++) {
        var aCrumb = aCookies[i].split("=");
        cookies[aCrumb[0]] = decodeURIComponent(unescape(aCrumb[1]));
    }
    aCookies = "";
}
module.exports = cookies;