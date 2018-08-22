/**
 * Created by hqer on 2017/1/13.
 */
import React from 'react'
import Reflux from 'reflux'
Reflux.defineReact(React);

window.GLOBAL.action.myApps = Reflux.createActions(["del","add","saveInfo","showTips","init","submit","cancel"]);