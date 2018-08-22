/**
 * Created by hqer on 2017/1/13.
 */
import React from 'react'
import Reflux from 'reflux'

Reflux.defineReact(React);

import "../actions/myApps"

let myAppsPageDate = {pageNow:1, totalPage:10};
if(sessionStorage&&sessionStorage['myApps']){
    myAppsPageDate = JSON.parse(sessionStorage['myApps']);
    sessionStorage.removeItem('myApps');
}
class myAppsStore extends Reflux.Store
{
    constructor() {
        super();
        this.listenables = window.GLOBAL.action.myApps;
        this.state = {pageNow:myAppsPageDate.pageNow, totalPage:myAppsPageDate.totalPage,delId:[],showDel:false,showId:"",showTips:0,appId:"",eventType:0};
    }
    onInit(){
        this.setState({delId:[],showDel:false,showId:"",showTips:0,appId:"",eventType:0});
    }
    onDel(_id){
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
/*        console.log("onAdd===="+JSON.stringify(this.state.delId))*/
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
        sessionStorage['myApps']=JSON.stringify({pageNow:this.state.pageNow,totalPage:this.state.totalPage});
    }
    onSubmit(_id){
        this.setState({appId:_id,eventType:1});
    }
    onCancel(_id){
        this.setState({appId:_id,eventType:2});
    }
    onShowTips(_type,_id){
        if(_type===2||_type===4){
            this.setState({delId:[_id],showTips:_type});
        }else{
            this.setState({showId:_id,showTips:_type});
        }
    }
}
window.GLOBAL.store.myApps = myAppsStore;