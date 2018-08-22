/**
 * Created by hqer on 2017/1/19.
 */
import React from 'react'
import Reflux from 'reflux'

Reflux.defineReact(React);

window.GLOBAL.action.orderManage = Reflux.createActions(["delItem","saveInfo","init","closeItem","verifyCloseItem"]);