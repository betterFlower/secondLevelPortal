/**
 * Created by hqer on 2016/12/15.
 */
import React from 'react'
import Reflux from 'reflux'

Reflux.defineReact(React);

import '../actions/workBench'

class workBenchStore extends Reflux.Store
{
    constructor() {
        super();
        this.listenables = window.GLOBAL.action.workBench;
        this.state = {
            unRead:0
        };
    }
    onGetUnRead(){
        if(sessionStorage&&sessionStorage["userInfo"]){
            let r = JSON.parse(sessionStorage["userInfo"]);
            this.setState({unRead:r.unRead});
        }
    }
    onSetUnRead(_num){
        this.setState({unRead:_num});
    }
}
window.GLOBAL.store.workBench = workBenchStore;