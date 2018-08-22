/**
 * Created by hqer on 2017/1/19.
 */
import React from 'react'
import Reflux from 'reflux'

Reflux.defineReact(React);

import "../actions/orderManage"

let orderManagePageDate = {pageNow:1, totalPage:10};
if(sessionStorage&&sessionStorage['orderManage']){
    orderManagePageDate = JSON.parse(sessionStorage['orderManage']);
    sessionStorage.removeItem('orderManage');
}
class orderManageStore extends Reflux.Store
{
    constructor() {
        super();
        this.listenables = window.GLOBAL.action.orderManage;
        this.state = {
            pageNow:orderManagePageDate.pageNow,
            totalPage:orderManagePageDate.totalPage,
            delId:"",
            showTips:0,
            closeId:""
        };
    }
    onInit(){
        this.setState({delId:"",showTips:0,closeId:""});
    }
    onSaveInfo(){
        sessionStorage['orderManage']=JSON.stringify({pageNow:this.state.pageNow,totalPage:this.state.totalPage});
    }
    onDelItem(_id){
        this.setState({delId:_id,showTips:1});
    }
    onCloseItem(_id){
        this.setState({closeId:_id,showTips:2});
    }
    onVerifyCloseItem(_id){
        this.setState({closeId:_id,showTips:3});
    }
}
window.GLOBAL.store.orderManage = orderManageStore;