/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'
import Reflux from 'reflux'

Reflux.defineReact(React);

window.GLOBAL.action.header = Reflux.createActions(["getLoginState","select","logOut","setUnRead"]);