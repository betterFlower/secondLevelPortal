/**
 * Created by hqer on 2016/12/15.
 */
import React from 'react'
import Reflux from 'reflux'

Reflux.defineReact(React);

window.GLOBAL.action.workBench = Reflux.createActions(["getUnRead","setUnRead"]);