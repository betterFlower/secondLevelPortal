/**
 * Created by hqer on 2017/1/15.
 */
import React from 'react'
import Reflux from 'reflux'

Reflux.defineReact(React);

import "../actions/voiceTemplate"

let voiceTemplatePageDate = {pageNow:1, totalPage:10};
if(sessionStorage&&sessionStorage['voiceTemplate']){
    voiceTemplatePageDate = JSON.parse(sessionStorage['voiceTemplate']);
    sessionStorage.removeItem('voiceTemplate');
}
class voiceTemplateStore extends Reflux.Store
{
    constructor() {
        super();
        this.listenables = window.GLOBAL.action.voiceTemplate;
        this.state = {pageNow:voiceTemplatePageDate.pageNow, totalPage:voiceTemplatePageDate.totalPage,delId:[],showDel:false,showTips:0};
    }
    onInit(){
        this.setState({delId:[],showDel:false,showTips:0});
    }
    onDel(_id){
        console.log("onDel===="+JSON.stringify(this.state.delId))
        let delId = this.state.delId;
        for (let i = 0; i < delId.length; i++) {
            if (delId[i] == _id){
                delId.splice(i, 1);
            }
        }
        if(delId.length){
            //console.log("delId==="+delId)
            this.setState({delId:delId,showDel:true});
        }else{
            this.setState({delId:delId,showDel:false});
        }
    }
    onAdd(_id){
        console.log("onAdd===="+JSON.stringify(this.state.delId))
        let delId = this.state.delId;
        delId.push(_id);
        let delId1 = [...new Set(delId)];
        if(delId1.length){
            this.setState({delId:delId1,showDel:true});
        }else{
            this.setState({delId:delId1,showDel:false});
        }
    }
    onSaveInfo(){
        sessionStorage['voiceTemplate']=JSON.stringify({pageNow:this.state.pageNow,totalPage:this.state.totalPage});
    }
    onShowTips(_type,_id){
        console.log("onShowTips=="+_id);
        this.setState({delId:[_id],showTips:_type});
    }
}
window.GLOBAL.store.voiceTemplate = voiceTemplateStore;