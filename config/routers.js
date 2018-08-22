/**
 * Created by hqer on 16/12/7.
 */
function checkLogin(nextState, replace){
    if(sessionStorage&&sessionStorage["userInfo"]){
        let userInfo = JSON.parse(sessionStorage["userInfo"]);
        if(userInfo&&userInfo.isLogin){
            replace('/');
        }
    }
}
function checkLogOut(nextState, replace){
    if(sessionStorage&&!sessionStorage["userInfo"]){
        //replace('/Login');
        goToLogin();
    }
}
function checkPermission(nextState, replace){
    if(sessionStorage&&sessionStorage["userInfo"]){
        let userInfo = JSON.parse(sessionStorage["userInfo"]);
        if(userInfo&&userInfo.isLogin&&userInfo.permission){
            let r = false;
            for (let i of userInfo.permission) {
                let list = window.GLOBAL.permission[i];
                for(let j of list){
                    //console.log(nextState.location.pathname.substr(1).split("/")[0]+"---------"+j)
                    if(nextState.location.pathname.substr(1).split("/")[0]=== j){
                        //console.log(i + " is find");
                        r = true;
                        break;
                    }
                }
            }
            if(!r){
                replace('/404');
            }
        }
    }else{
        //replace('/Login');
        goToLogin();
    }
}
function goToLogin(){
    let _old = window.GLOBAL.oldUrl["login"];
    let _url = _old.url;
    let _leftMenuId,_frameUrl,_type;
    if(_old&&_old.leftStatus){
        _leftMenuId = _old.leftStatus;
    }
    if(_old&&_old.frameUrl){
        _frameUrl = _old.frameUrl;
    }
    if(_old&&_old.type){
        _type = _old.type;
    }
    if(typeof _url ==="string"){
        if(typeof _type === "string"&&_type === "_blank"){
            window.open(_url);
        }else{
            if(typeof _leftMenuId === "string"){
                sessionStorage.leftStatus = _leftMenuId;
                if( typeof _frameUrl === "string"){
                    sessionStorage.frameUrl = encodeURIComponent(_frameUrl);
                }
            }
            window.location.href = _url;
        }
    }
}
export default {
    component: require('../module/footer'),
    childRoutes: [
        { path: '/',
            component: require('../module/header'),
            indexRoute: {
                getComponent: (nextState, cb) => {
                    return require.ensure([], (require) => {
                        cb(null, require('../module/index'))
                    })
                }
            },
            childRoutes: [
                { path: '/index',
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/index'))
                        })
                    }
                },
                { path: '/About',
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/About'))
                        })
                    }
                },
                { path: '/introduction/:apiTypeId',
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/introduction'))
                        })
                    }
                },
                { path: '/order/:eaId',
                    onEnter:checkLogOut,
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/order'))
                        })
                    }
                },
                { path: '/orderToPay/:eaId',
                    onEnter:checkLogOut,
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/orderToPay'))
                        })
                    }
                },
                { path: '/orderResult/:orderId',
                    onEnter:checkLogOut,
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/orderResult'))
                        })
                    }
                },
                { path: '/devDoc',
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/devDoc'))
                        })
                    },
                    indexRoute: {
                        getComponent: (nextState, cb) => {
                            return require.ensure([], (require) => {
                                cb(null, require('../module/companion'))
                            })
                        }
                    },
                    childRoutes: [
                        { path: '/companion',
                            getComponent: (nextState, cb) => {
                                require.ensure([], (require) => {
                                    cb(null, require('../module/companion'))
                                })
                            }
                        },
                        { path: '/restAPI',
                            getComponent: (nextState, cb) => {
                                require.ensure([], (require) => {
                                    cb(null, require('../module/restAPI'))
                                })
                            }
                        },
                        { path: '/agreement',
                            getComponent: (nextState, cb) => {
                                require.ensure([], (require) => {
                                    cb(null, require('../module/agreement'))
                                })
                            }
                        },
                        { path: '/FQA',
                            getComponent: (nextState, cb) => {
                                require.ensure([], (require) => {
                                    cb(null, require('../module/FQA'))
                                })
                            }
                        }
                    ]
                },
                { path: '/workbench',
                    onEnter:checkLogOut,
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/workbench'))
                        })
                    },
                    indexRoute: {
                        getComponent: (nextState, cb) => {
                            return require.ensure([], (require) => {
                                cb(null, require('../module/myServer'))
                            })
                        }
                    },
                    childRoutes: [
                        { path: '/myServer',
                            getComponent: (nextState, cb) => {
                                require.ensure([], (require) => {
                                    cb(null, require('../module/myServer'))
                                })
                            }
                        },
                        { path: '/myApps',
                            getComponent: (nextState, cb) => {
                                require.ensure([], (require) => {
                                    cb(null, require('../module/myApps'))
                                })
                            },
                            childRoutes:[
                                { path: '/myAppsDetail/:appsId',
                                    getComponent: (nextState, cb) => {
                                        require.ensure([], (require) => {
                                            cb(null, require('../module/myAppsDetail'))
                                        })
                                    }
                                },
                                { path: '/myAppsAdd',
                                    getComponent: (nextState, cb) => {
                                        require.ensure([], (require) => {
                                            cb(null, require('../module/myAppsAdd'))
                                        })
                                    }
                                },
                                { path: '/myAppsModify/:appsId',
                                    getComponent: (nextState, cb) => {
                                        require.ensure([], (require) => {
                                            cb(null, require('../module/myAppsModify'))
                                        })
                                    }
                                }
                            ]
                        },
                        { path: '/voiceTemplate',
                            onEnter:checkPermission,
                            getComponent: (nextState, cb) => {
                                require.ensure([], (require) => {
                                    cb(null, require('../module/voiceTemplate'))
                                })
                            },
                            childRoutes:[
                                { path: '/voiceTemplateDetail/:voiceTemplateId',
                                    getComponent: (nextState, cb) => {
                                        require.ensure([], (require) => {
                                            cb(null, require('../module/voiceTemplateDetail'))
                                        })
                                    }
                                },
                                { path: '/voiceTemplateAdd',
                                    getComponent: (nextState, cb) => {
                                        require.ensure([], (require) => {
                                            cb(null, require('../module/voiceTemplateAdd'))
                                        })
                                    }
                                },
                                { path: '/voiceTemplateModify/:voiceTemplateId',
                                    getComponent: (nextState, cb) => {
                                        require.ensure([], (require) => {
                                            cb(null, require('../module/voiceTemplateModify'))
                                        })
                                    }
                                }
                            ]
                        },
                        { path: '/orderManage',
                            getComponent: (nextState, cb) => {
                                require.ensure([], (require) => {
                                    cb(null, require('../module/orderManage'))
                                })
                            },
                            childRoutes:[
                                { path: '/orderItemDetail/:orderId',
                                    getComponent: (nextState, cb) => {
                                        require.ensure([], (require) => {
                                            cb(null, require('../module/orderItemDetail'))
                                        })
                                    }
                                }
                            ]
                        }
                    ]
                },
                { path: '/errorPage/:httpStatus',
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/errorPage'))
                        })
                    }
                },
                { path: '*',
                    getComponent: (nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('../module/404'))
                        })
                    }
                }
            ]
        }
    ]
}