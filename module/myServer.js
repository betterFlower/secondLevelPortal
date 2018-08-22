/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Link,hashHistory } from 'react-router'
import { Button,Row,Col } from 'react-bootstrap'
import Tips from '../componentUI/js/tips'



class Dec extends React.Component{
    componentDidMount(){
        let _el = ReactDOM.findDOMNode(this);
        let text = this.props.data.text.replace(/《/g, "<").replace(/》/g, ">").replace(/&#39;/g, "\"");
        $(_el).find(".showLink").html(text);
    }
    render(){
        return(
            <div className={this.props.className}>
                <span>{this.props.data.type}: </span>
                <sapn className="showLink"></sapn>
            </div>
        )
    }
};

class myServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            status: "",
            star:"",
            count:[],
            ability:[],
            tabIndex: 0,
            levelIndex:[0,0,0],
            showTips:-1,
            tipsText:""
        };
        this._getInfo = this._getInfo.bind(this);
        this._getCount = this._getCount.bind(this);
        this._getAbility = this._getAbility.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleLevelClick = this.handleLevelClick.bind(this);
        this.handleShowTips = this.handleShowTips.bind(this);
        this.handleShowTips1 = this.handleShowTips1.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleTurnPage = this.handleTurnPage.bind(this);
        this.goToCertification = this.goToCertification.bind(this)
    }
    componentDidMount() {
        this._getInfo();
        this._getCount();
        this._getAbility();
    }
    _getInfo() {
        window.GLOBAL.ajaxMap.setParm("myServerInfo",'token',window.GLOBAL.token);
        let params = window.GLOBAL.ajaxMap.getAjaxParms("myServerInfo");
        params.success=function(data){
            this.setState({
                role: data.role,
                status: data.status,
                showTips:data.isFirst===1?1:this.state.showTips,
                star:data.level
            });
        }.bind(this);
        $.ajax(params);
    }
    _getCount() {
        let params = window.GLOBAL.ajaxMap.getAjaxParms("myServerCount");
        params.success=function(data){
            this.setState({
                count: data.data
            });
        }.bind(this);
        $.ajax(params);
    }
    _getAbility() {
        let params = window.GLOBAL.ajaxMap.getAjaxParms("myServerAbility");
        params.success=function(data){
            this.setState({
                ability: data.data
            });
        }.bind(this);
        $.ajax(params);
    }
    handleTabClick(event) {
        let _index = event.srcElement?event.srcElement.value:event.target.value;
        let _list = Array.from(this.state.levelIndex, (x) => 0);
        this.setState({
            tabIndex: _index*1,
            levelIndex:_list
        });
    }
    handleLevelClick(event){
        let _i = event.srcElement?event.srcElement.value:event.target.value;
        let _v = this.state.levelIndex;
        if(_v[_i]===0){
            _v[_i] = 1;
        }else if(_v[_i]===1){
            _v[_i] = 0;
        }
        this.setState({levelIndex: _v});
    }
    handleShowTips(){
        this.setState({showTips:0});
    }
    handleShowTips1(){
        this.setState({showTips:3});
    }
    handleTurnPage(event){
        //    触发正式开通
        /*---on 2017-6-13 注释---*/
/*        let _eaId = event.srcElement?event.srcElement.value:event.target.value;
        let parms = {eaId:_eaId, token:window.GLOBAL.token};
        window.GLOBAL.ajaxMap.setParms("openAbility",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("openAbility");
        ajax.success=function(data){
            if(data.code===1){
                hashHistory.push("/order/"+_eaId);
            }else if(data.code===2){
                this.setState({showTips:2,tipsText:data.tipsText});
            }
        }.bind(this);
        $.ajax(ajax);*/
        /*-- end --*/
    }
    goToCertification(){
        //hashHistory.push(window.GLOBAL.pageData.leftMenu.item3.child[2].url);
        let _old = window.GLOBAL.oldUrl[window.GLOBAL.pageData.leftMenu.item3.child[2].key];
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
    handleCancel(){
        this.setState({showTips:-1});
    }
    render() {
        let userInfo = JSON.parse(sessionStorage["userInfo"]);
        let myServer = window.GLOBAL.pageData.myServer;
        let tips;
        if(this.state.showTips===0){
            tips = (<Tips {...myServer.Unautherized} onSubmit={this.goToCertification} onCancel={this.handleCancel}/>)
        }else if(this.state.showTips===1){
            tips = (<Tips {...myServer.firstLogin} onSubmit={this.goToCertification} onCancel={this.handleCancel}/>)
        }else if(this.state.showTips===2){
            tips = (<Tips className={myServer.unOrder.className} text={this.state.tipsText} btns={myServer.unOrder.btns} onCancel={this.handleCancel}/>)
        }else if(this.state.showTips===3){
            tips = (<Tips {...myServer.freeze} onCancel={this.handleCancel}/>)
        }
        let count = [];
        {this.state.count.map((item,i) => {
            count.push(<div className={"countArea fl type"+this.state.count.length} style={{width:((100/this.state.count.length)+"%")}} key={i}>
                <div className={myServer.logoType[item.logoType]}></div>
                <div className="fl line">
                    <a title={item.num}><span className={item.logoType===0?"money":"num"}>{item.num}</span></a>
                    <span>{item.unit}</span>
                </div>
                <div className="fl line">
                    {item.text}
                </div>
            </div>)
        })}
        let abilityArr = this.state.ability.filter(function(item){
            //tabIndex: 0->全部 1->正在试用 2->开通成功 /<--->/ status: 0->无状态 1->正在试用 2->开通成功 3->冻结
            if(this.state.tabIndex == 0) return true;
            return (item.status+0) == this.state.tabIndex;
        }.bind(this));

        let abilityList0 = [];
        let abilityList1 = [];
        let abilityList2 = [];
        abilityArr.map((item,i)=>{
            if(item.level===0){
                let desList = [];
                let btnList = [];
                if(item.des.length){
                    item.des.map((des,j)=>{
                        desList.push(<Dec className="dec fl" key={j} data={des}/>);
                    });
                }
                if(item.btns.length){
                    item.btns.map((btn,j)=>{
                        if(this.state.status==="未认证"){
                            btnList.push(<Button key={j} onClick={this.handleShowTips}>{btn.text}</Button>)
                        }else if(this.state.status==="冻结"){
                            btnList.push(<Button key={j} onClick={this.handleShowTips1}>{btn.text}</Button>)
                        }else if(item.status===3){
                            btnList.push(<Button key={j} disabled>{btn.text}</Button>)
                        }else if(btn.type===3){
                            btnList.push(<Link key={j} role="button" to={"/order/"+btn.url} className="btn btn-danger">{btn.text}</Link>)
                        }else if(btn.type===1){
                            btnList.push(<Button key={j} bsStyle="danger" onClick={this.handleTurnPage} value={btn.url}>{btn.text}</Button>)
                        }
                    });
                }
                abilityList0.push(<li className="item" key={i}>
                    <img className="logo fl" src={item.img}/>
                    <div className="content">
                        <div className="title3 fl">{item.name}</div>
                        {item.status===0?"":(
                            <div className={"fl icon type"+item.status}>
                                <div className="iconBg"></div>
                                <div className="iconText">{myServer.iconText[item.status]}</div>
                            </div>
                        )}
                        {desList}
                        <div className="btnList fl">
                            {btnList}
                        </div>
                    </div>
                </li>);
            }else if(item.level===1){
                let desList = [];
                let btnList = [];
                if(item.des.length){
                    item.des.map((des,j)=>{
                        desList.push(<Dec className="dec fl" key={j} data={des}/>);
                    });
                }
                if(item.btns.length){
                    item.btns.map((btn,j)=>{
                        if(this.state.status==="未认证"){
                            btnList.push(<Button key={j} onClick={this.handleShowTips}>{btn.text}</Button>)
                        }else if(this.state.status==="冻结"){
                            btnList.push(<Button key={j} onClick={this.handleShowTips1}>{btn.text}</Button>)
                        }else if(item.status===3){
                            btnList.push(<Button key={j} disabled>{btn.text}</Button>)
                        }else if(btn.type===3){
                            btnList.push(<Link key={j} role="button" to={"/order/"+btn.url} className="btn btn-danger">{btn.text}</Link>)
                        }else if(btn.type===1){
                            btnList.push(<Button key={j} bsStyle="danger" onClick={this.handleTurnPage} value={btn.url}>{btn.text}</Button>)
                        }
                    });
                }
                abilityList1.push(<li className="item" key={i}>
                    <img className="logo fl" src={item.img}/>
                    <div className="content">
                        <div className="title3 fl">{item.name}</div>
                        {item.status===0?"":(
                            <div className={"fl icon type"+item.status}>
                                <div className="iconBg"></div>
                                <div className="iconText">{myServer.iconText[item.status]}</div>
                            </div>
                        )}
                        {desList}
                        <div className="btnList fl">
                            {btnList}
                        </div>
                    </div>
                </li>);
            }else if(item.level===2){
                let desList = [];
                let btnList = [];
                if(item.des.length){
                    item.des.map((des,j)=>{
                        desList.push(<Dec className="dec fl" key={j} data={des}/>);
                    });
                }
                if(item.btns.length){
                    item.btns.map((btn,j)=>{
                        if(this.state.status==="未认证"){
                            btnList.push(<Button key={j} onClick={this.handleShowTips}>{btn.text}</Button>)
                        }else if(this.state.status==="冻结"){
                            btnList.push(<Button key={j} onClick={this.handleShowTips1}>{btn.text}</Button>)
                        }else if(item.status===3){
                            btnList.push(<Button key={j} disabled>{btn.text}</Button>)
                        }else if(btn.type===3){
                            btnList.push(<Link key={j} role="button" to={"/order/"+btn.url} className="btn btn-danger">{btn.text}</Link>)
                        }else if(btn.type===1){
                            btnList.push(<Button key={j} bsStyle="danger" onClick={this.handleTurnPage} value={btn.url}>{btn.text}</Button>)
                        }
                    });
                }
                abilityList2.push(<li className="item" key={i}>
                    <img className="logo fl" src={item.img}/>
                    <div className="content">
                        <div className="title3 fl">{item.name}</div>
                        {item.status===0?"":(
                            <div className={"fl icon type"+item.status}>
                                <div className="iconBg"></div>
                                <div className="iconText">{myServer.iconText[item.status]}</div>
                            </div>
                        )}
                        {desList}
                        <div className="btnList fl">
                            {btnList}
                        </div>
                    </div>
                </li>);
            }
        });

        return (
            <div className="myServer">
                <div className="MainTitle">
                    <h1>{myServer.title}</h1>
                </div>
                <div className="whiteSpace">
                    <div className="fl" style={{width:"30%"}}>
                        <div className="fl imgArea"><img src={myServer.img} /></div>
                        <div className="fl userNameArea" style={{marginLeft:"12px",maxWidth:"150px"}}>
                            <a title={userInfo.userName}><div className="userName">{userInfo.userName}</div></a>
                            <div>当前角色：{this.state.role}</div>
                            <div>状态：{this.state.status}</div>
                            <div>星级：{this.state.star} <a className="link">星级规则</a></div>
                        </div>
                    </div>
                    <div className="fl" style={{width:"70%"}}>
                        {count}
                    </div>
                </div>
                <div className="whiteSpace">
                    <h1>API产品管理</h1>
                    <div className="serverManageType">
                        <Button value={0} bsStyle={this.state.tabIndex===0?"primary":"link"} onClick={this.handleTabClick}>全部</Button>
                        <Button value={2} bsStyle={this.state.tabIndex===2?"primary":"link"} onClick={this.handleTabClick}>已订购</Button>
                        <Button value={1} bsStyle={this.state.tabIndex===1?"primary":"link"} onClick={this.handleTabClick}>未订购</Button>
                    </div>
                    <div style={{display:abilityList0.length===0?"none":"block"}}>
                        <Button className="itemTitle" bsStyle="warning" value={0} onClick={this.handleLevelClick}>
                            <span className="fl">{myServer.level[0]}</span>
                            <span className={this.state.levelIndex[0]===1?"fr glyphicon glyphicon-chevron-up":"fr glyphicon glyphicon-chevron-down"}></span>
                        </Button>
                        <ul className="abilityList" style={{display:this.state.levelIndex[0]===1?"none":"block"}}>{abilityList0}</ul>
                    </div>
                    <div style={{display:abilityList1.length===0?"none":"block"}}>
                        <Button className="itemTitle" bsStyle="warning" value={1} onClick={this.handleLevelClick}>
                            <span className="fl">{myServer.level[1]}</span>
                            <span className={this.state.levelIndex[1]===1?"fr glyphicon glyphicon-chevron-up":"fr glyphicon glyphicon-chevron-down"}></span>
                        </Button>
                        <ul className="abilityList" style={{display:this.state.levelIndex[1]===1?"none":"block"}}>{abilityList1}</ul>
                    </div>
                    <div style={{display:abilityList2.length===0?"none":"block"}}>
                        <Button className="itemTitle" bsStyle="warning" value={2} onClick={this.handleLevelClick}>
                            <span className="fl">{myServer.level[2]}</span>
                            <span className={this.state.levelIndex[2]===1?"fr glyphicon glyphicon-chevron-up":"fr glyphicon glyphicon-chevron-down"}></span>
                        </Button>
                        <ul className="abilityList" style={{display:this.state.levelIndex[2]===1?"none":"block"}}>{abilityList2}</ul>
                    </div>
                </div>
                {tips}
            </div>
        );
    }
}




module.exports = myServer;
