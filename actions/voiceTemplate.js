/**
 * Created by hqer on 2017/1/15.
 */
import React from 'react'
import Reflux from 'reflux'
Reflux.defineReact(React);

window.GLOBAL.action.voiceTemplate = Reflux.createActions(["del","add","saveInfo","showTips","init"]);