/**
 * Created by hqer on 2017/2/4.
 */
import React from 'react'
import { Link,hashHistory } from 'react-router'
import { Button,ButtonToolbar,DropdownButton,Dropdown,MenuItem,Row,Col } from 'react-bootstrap'
import CheckBox from '../componentUI/js/checkBox'
import Tips from '../componentUI/js/tips'
import MD5 from "md5"

class voiceTemplateAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            content:"",
            parms:[],
            scene:"",
            isSHowDropdown:false,
            isSHowAddBtn:false,
            voiceTemplateList:[],
            voiceTemplateItem:"",
            _parms:[],
            showTips:-1
        };
        this.goToBack = this.goToBack.bind(this);
        this.checkVoiceTemplateName = this.checkVoiceTemplateName.bind(this);
        this.setVoiceTemplateName = this.setVoiceTemplateName.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.handleTurnModify = this.handleTurnModify.bind(this);
        this.setContent = this.setContent.bind(this);
        this.checkContent = this.checkContent.bind(this);
        this.selectParmsType = this.selectParmsType.bind(this);
        this.setParmsLength = this.setParmsLength.bind(this);
        this.checkParmsLength = this.checkParmsLength.bind(this);
        this.setParmsDes = this.setParmsDes.bind(this);
        this.checkParmsDes = this.checkParmsDes.bind(this);
        this.setNewParms = this.setNewParms.bind(this);
        this.removItem = this.removItem.bind(this);
        this.setScene = this.setScene.bind(this);
        this.checkScene = this.checkScene.bind(this);
        this.submit = this.submit.bind(this);
        this.save = this.save.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        if(!window.GLOBAL.promise["checkVoiceTemplateName"]){
            window.GLOBAL.promise["checkVoiceTemplateName"] = $.Deferred();
        }
    }
    componentDidMount(){
        let parms = {
            searchItem:0,
            searchItem1:"",
            status:2,
            pageNow:1,
            pageSize:100,
            token:window.GLOBAL.token
        };
        window.GLOBAL.ajaxMap.setParms("searchVoiceTemplate",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("searchVoiceTemplate");
        ajax.success=function(r){
            let voiceTemplateList = [];
            r.data.map((item,i) => {
                if(item.type===0){
                    voiceTemplateList.push({text:item.name,value:item.delCheck})
                }
            });
            this.setState({voiceTemplateList:voiceTemplateList});
        }.bind(this);
        $.ajax(ajax);
    }
    componentWillUnmount(){
        if(window.GLOBAL.promise&&window.GLOBAL.promise["checkVoiceTemplateName"]){
            delete window.GLOBAL.promise["checkVoiceTemplateName"];
        }
    }
    goToBack(){
        hashHistory.goBack();
    }
    checkVoiceTemplateName(){
        let bool = window.GLOBAL.checkFun.isVoiceTemplateName($(".voiceTemplateAdd .voiceTemplateName"),$(".voiceTemplateAdd .voiceTemplateName").siblings(".errorTips"));
        if(bool){
            let parms = {voiceTemplateId:"",name:this.state.name};
            window.GLOBAL.ajaxMap.setParms("checkVoiceTemplateName",parms);
            let ajax = window.GLOBAL.ajaxMap.getAjaxParms("checkVoiceTemplateName");
            ajax.success=function(r){
                window.GLOBAL.promise["checkVoiceTemplateName"].resolve(r);
                if(r.code == 401){
                    $(".voiceTemplateAdd .voiceTemplateName").siblings(".errorTips").html("* 模板名称不唯一");
                }
            }.bind(this);
            $.ajax(ajax);
        }
    }
    setVoiceTemplateName(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        this.setState({name:_val});
    }
    showDropdown(){
        if(this.state.isSHowDropdown){
            this.setState({isSHowDropdown:false});
        }else{
            this.setState({isSHowDropdown:true});
        }
    }
    handleTurnModify(eventKey){
        window.GLOBAL.ajaxMap.setParm("voiceTemplateDetail",'voiceTemplateId',eventKey);
        window.GLOBAL.ajaxMap.setParm("voiceTemplateDetail",'token',window.GLOBAL.token);
        let parms = window.GLOBAL.ajaxMap.getAjaxParms("voiceTemplateDetail");
        parms.success=function(r){
            this.setState({
                name:r.name,
                type:r.type,
                content:r.content,
                parms:r.parms,
                scene:r.scene,
                voiceTemplateItem:eventKey,
                isSHowAddBtn:true
            });
        }.bind(this);
        $.ajax(parms);
    }
    setContent(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        this.setState({content:_val})
    }
    checkContent(){
        let _bool= window.GLOBAL.checkFun.isNotEmpty($(".voiceTemplateAdd .voiceTemplateContent"),$(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips"));
        if(_bool){
            if(this.state.content.length > window.GLOBAL.pageData.voiceTemplate.voiceTemplateAdd.content.maxLength){
                $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 模板内容过长!");
                this.setState({isSHowAddBtn:false});
            }else{
                let _p = [...new Set(this.state.content.match(/\{.*?\}/g))];
                let _parms =[];
                if(_p.find((n) => n === "{}")){
                    $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 参数名称不正确!");
                    this.setState({isSHowAddBtn:false});
                }else{
                    _p.forEach((x,i) =>{
                        _parms.push({name:x.substr(1,x.length-2),type:"",length:"",des:""});
                    });
                    let _length = window.GLOBAL.pageData.voiceTemplate.voiceTemplateAdd.content.parms;
                    if(_parms.length > _length){
                        $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 单条模板最多包含" + _length + "个不重复的参数");
                        this.setState({isSHowAddBtn:false});
                    }else{
                        this.setState({isSHowAddBtn:true,_parms:_parms});
                    }
                }
            }
        }
    }
    setNewParms(){
        let newParms =[];
        let oldParms = Object.assign([],this.state.parms);
        this.state._parms.forEach((x,i) =>{
            if(oldParms.find(function(v) {
                    if(v&&v.name===x.name){
                        newParms.push(v);
                        return true;
                    }
                    return false;
                })){
            }else{
                newParms.push(x);
            }
        });
        this.setState({parms:newParms});
    }
    selectParmsType(eventKey){
        let oldParms = Object.assign([],this.state.parms);
        let _p = eventKey.split("_");
        if(_p.length===2){
            oldParms[_p[1]].type = _p[0];
        }
        this.setState({parms:oldParms});
    }
    setParmsLength(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        let _max = window.GLOBAL.pageData.voiceTemplate.voiceTemplateAdd.parmsLength.maxValue*1;
        if(/^[1-9]\d*$/.test(_val)||_val===""){
            if(_val!==""&&_val*1 > _max){
                _val = _max;
            }
            let _p = _eT.id.split("_");
            let oldParms = Object.assign([],this.state.parms);
            if(_p.length===2){
                oldParms[_p[1]].length = _val;
            }
            this.setState({parms:oldParms})
        }
    }
    checkParmsLength(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        window.GLOBAL.checkFun.isNotEmpty($(_eT),$(_eT).siblings(".errorTips"));
    }
    setParmsDes(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        let _p = _eT.id.split("_");
        let oldParms = Object.assign([],this.state.parms);
        if(_p.length===2){
            oldParms[_p[1]].des = _val;
        }
        this.setState({parms:oldParms})
    }
    checkParmsDes(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        window.GLOBAL.checkFun.isNotEmpty($(_eT),$(_eT).parent().siblings(".errorTips"));
    }
    removItem(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _i = _eT.value*1;
        let oldParms = Object.assign([],this.state.parms);
        oldParms.splice(_i,1);
        this.setState({parms:oldParms})
    }
    setScene(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        this.setState({scene:_val})
    }
    checkScene(){
        window.GLOBAL.checkFun.isNotEmpty($(".voiceTemplateAdd .voiceTemplateScene"),$(".voiceTemplateAdd .voiceTemplateScene").parent().siblings(".errorTips"));
    }
    submit(){
        let isOk = true;
        if(!window.GLOBAL.checkFun.isNotEmpty($(".voiceTemplateAdd .voiceTemplateContent"),$(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips"))){
            isOk = false;
        }else{
            if(this.state.content.length > window.GLOBAL.pageData.voiceTemplate.voiceTemplateAdd.content.maxLength){
                $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 模板内容过长!");
                this.setState({isSHowAddBtn:false});
                isOk = false;
            }else{
                let _p = [...new Set(this.state.content.match(/\{.*?\}/g))];
                let _parms =[];
                if(_p.find((n) => n === "{}")){
                    $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 参数名称不正确!");
                    isOk = false;
                    this.setState({isSHowAddBtn:false});
                }else{
                    _p.forEach((x,i) =>{
                        _parms.push({name:x.substr(1,x.length-2),type:"",length:"",des:""});
                    });
                    let _length = window.GLOBAL.pageData.voiceTemplate.voiceTemplateAdd.content.parms;
                    if(_parms.length > _length){
                        $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 单条模板最多包含" + _length + "个不重复的参数");
                        isOk = false;
                        this.setState({isSHowAddBtn:false});
                    }else if(_parms.length!== this.state.parms.length){
                        isOk = false;
                        this.setState({showTips:0});
                    }else {
                        let _a = false;
                        _parms.forEach((x,i) =>{
                            if(!this.state.parms.find((n) => n.name === x.name)){
                                isOk = false;
                                _a = true;
                            }
                        });
                        if(_a){
                            this.setState({showTips:0});
                        }
                    }
                }
            }
        }
        if(!window.GLOBAL.checkFun.isNotEmpty($(".voiceTemplateAdd .voiceTemplateScene"),$(".voiceTemplateAdd .voiceTemplateScene").parent().siblings(".errorTips"))){
            isOk = false;
        }
        $(".voiceTemplateAdd .parmsType").each(function(_i){
            if(!window.GLOBAL.checkFun.isNotEmpty($(this),$(this).siblings(".errorTips"))){
                isOk = false;
            }
        });
        $(".voiceTemplateAdd .parmsLength").each(function(_i){
            if(!window.GLOBAL.checkFun.isNotEmpty($(this),$(this).siblings(".errorTips"))){
                isOk = false;
            }
        });
        $(".voiceTemplateAdd .parmsDes").each(function(_i){
            if(!window.GLOBAL.checkFun.isNotEmpty($(this),$(this).parent().siblings(".errorTips"))){
                isOk = false;
            }
        });
        if(isOk){
            window.GLOBAL.promise["checkVoiceTemplateName"] = $.Deferred();
            this.checkVoiceTemplateName();
            $.when(window.GLOBAL.promise["checkVoiceTemplateName"]).done(function(r1){
                if(r1.code!=401){
                    let parms = {
                        name:this.state.name,
                        content:this.state.content,
                        parms:JSON.stringify(this.state.parms),
                        scene:this.state.scene,
                        submitType:0,
                        token:window.GLOBAL.token,
                        key1:MD5(this.state.name+this.state.content+this.state.scene+window.GLOBAL.token+"devPortal")
                    };
                    window.GLOBAL.ajaxMap.setParms("addVoiceTemplate",parms);
                    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("addVoiceTemplate");
                    ajax.success=function(r){
                        if(r.code===3){
                            window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
                        }else if(r.code){
                            this.setState({showTips:1});
                        }
                    }.bind(this);
                    $.ajax(ajax);
                }
            }.bind(this))
        }
    }
    save(){
        let isOk = true;
        if(!window.GLOBAL.checkFun.isNotEmpty($(".voiceTemplateAdd .voiceTemplateContent"),$(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips"))){
            isOk = false;
        }else{
            if(this.state.content.length > window.GLOBAL.pageData.voiceTemplate.voiceTemplateAdd.content.maxLength){
                $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 模板内容过长!");
                this.setState({isSHowAddBtn:false});
                isOk = false;
            }else{
                let _p = [...new Set(this.state.content.match(/\{.*?\}/g))];
                let _parms =[];
                if(_p.find((n) => n === "{}")){
                    $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 参数名称不正确!");
                    isOk = false;
                    this.setState({isSHowAddBtn:false});
                }else{
                    _p.forEach((x,i) =>{
                        _parms.push({name:x.substr(1,x.length-2),type:"",length:"",des:""});
                    });
                    let _length = window.GLOBAL.pageData.voiceTemplate.voiceTemplateAdd.content.parms;
                    if(_parms.length > _length){
                        $(".voiceTemplateAdd .voiceTemplateContent").parent().siblings(".errorTips").html("* 单条模板最多包含" + _length + "个不重复的参数");
                        isOk = false;
                        this.setState({isSHowAddBtn:false});
                    }else if(_parms.length!== this.state.parms.length){
                        isOk = false;
                        this.setState({showTips:0});
                    }else {
                        let _a = false;
                        _parms.forEach((x,i) =>{
                            if(!this.state.parms.find((n) => n.name === x.name)){
                                isOk = false;
                                _a = true;
                            }
                        });
                        if(_a){
                            this.setState({showTips:0});
                        }
                    }
                }
            }
        }
        if(!window.GLOBAL.checkFun.isNotEmpty($(".voiceTemplateAdd .voiceTemplateScene"),$(".voiceTemplateAdd .voiceTemplateScene").parent().siblings(".errorTips"))){
            isOk = false;
        }
        $(".voiceTemplateAdd .parmsType").each(function(_i){
            if(!window.GLOBAL.checkFun.isNotEmpty($(this),$(this).siblings(".errorTips"))){
                isOk = false;
            }
        });
        $(".voiceTemplateAdd .parmsLength").each(function(_i){
            if(!window.GLOBAL.checkFun.isNotEmpty($(this),$(this).siblings(".errorTips"))){
                isOk = false;
            }
        });
        $(".voiceTemplateAdd .parmsDes").each(function(_i){
            if(!window.GLOBAL.checkFun.isNotEmpty($(this),$(this).parent().siblings(".errorTips"))){
                isOk = false;
            }
        });
        if(isOk){
            window.GLOBAL.promise["checkVoiceTemplateName"] = $.Deferred();
            this.checkVoiceTemplateName();
            $.when(window.GLOBAL.promise["checkVoiceTemplateName"]).done(function(r1){
                if(r1.code!=401){
                    let parms = {
                        name:this.state.name,
                        content:this.state.content,
                        parms:JSON.stringify(this.state.parms),
                        scene:this.state.scene,
                        submitType:1,
                        token:window.GLOBAL.token,
                        key1:MD5(this.state.name+this.state.content+this.state.scene+window.GLOBAL.token+"devPortal")
                    };
                    window.GLOBAL.ajaxMap.setParms("addVoiceTemplate",parms);
                    let ajax = window.GLOBAL.ajaxMap.getAjaxParms("addVoiceTemplate");
                    ajax.success=function(r){
                        if(r.code===3){
                            window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
                        }else if(r.code){
                            this.handleSubmit();
                        }
                    }.bind(this);
                    $.ajax(ajax);
                }
            }.bind(this))
        }

    }
    handleCancel(){
        this.setState({showTips:-1})
    }
    handleSubmit(){
        hashHistory.push("/voiceTemplate");
    }
    render() {
        let voiceTemplateAdd = window.GLOBAL.pageData.voiceTemplate.voiceTemplateAdd;
        let voiceTemplateText ="";
        this.state.voiceTemplateList.map((item,i) => {
            if(item.value===this.state.voiceTemplateItem){
                voiceTemplateText = item.text;
            }
        });
        let tips;
        if(this.state.showTips===0){
            tips = (<Tips {...voiceTemplateAdd.tips[this.state.showTips]} onCancel={this.handleCancel}/>);
        }else if(this.state.showTips===1){
            tips = (<Tips {...voiceTemplateAdd.tips[this.state.showTips]} onSubmit={this.handleSubmit}/>);
        }
        return (
            <div className="voiceTemplateAdd">
                <div className="MainTitle">
                    <h1>{voiceTemplateAdd.title}</h1>
                    <Button className="backBtn" onClick={this.goToBack}>返回</Button>
                </div>
                <div className="whiteSpace">
                    <ButtonToolbar>
                        <div className="inputLine fl">
                            <span className="fl">模板名称：</span>
                            <input className="voiceTemplateName fl" type="text" maxLength={voiceTemplateAdd.name.maxLength} onChange={this.setVoiceTemplateName} value={this.state.name} onBlur={this.checkVoiceTemplateName}/>
                            <div className="errorTips fl"></div>
                            <div className="underTips fl">* 请输入自定的短信模板名称,不超过15个字符.</div>
                        </div>
                        <div className="inputLine fl">
                            <CheckBox style={{float:"left"}}  s={this.state.isSHowDropdown} onClick={this.showDropdown}/>
                            <span className="fl" style={{marginRight:"10px"}}>复用</span>
                            <Dropdown id="voiceTemplateItem" style={{display:this.state.isSHowDropdown?"block":"none"}}>
                                <Dropdown.Toggle>
                                    <input className="text" placeholder="请选择" style={{width:"80px",backgroundColor:"transparent",border:"0"}} disabled value={voiceTemplateText}/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {this.state.voiceTemplateList.map((item,i) => (
                                        <MenuItem eventKey={item.value} key={i} onSelect={this.handleTurnModify}>{item.text}</MenuItem>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="title fl">模板内容</div>
                        <div className="content fl">
                            <div className="textArea fl">
                                <div className="heightAuto">{this.state.content}</div>
                                <textarea className="voiceTemplateContent" maxLength={voiceTemplateAdd.content.maxLength} onChange={this.setContent} onBlur={this.checkContent} value={this.state.content}/>
                            </div>
                            <div className="errorTips fl"></div>
                            <div className="underTips fl" dangerouslySetInnerHTML={{__html: voiceTemplateAdd.content.underTips}}></div>
                        </div>
                        <div className="title fl">模板参数列表</div>
                        <div className="content fl bgf4">
                            <span>* 请对模板内容中参数标识定义：</span>
                            <span>1.点击生成参数，可根据模板内容自动生成需要配置的参数；</span>
                            <span>2.参数个数必须和模板内容中参数个数保持一致；</span>
                            <span>3.参数描述用于模板审核；</span>
                            <span>4.参数类型用于接口参数格式校验；</span>
                            <span>5.如选择string类型，请合理填写字符串长度，注意不区分单、双字节。</span>
                        </div>
                        <Button className="fl addParms"  bsStyle="primary" disabled={this.state.isSHowAddBtn?false:true} onClick={this.setNewParms}>生成参数</Button>
                        <div className="line fl">
                            {this.state.parms.length > 0?(
                                <ul>
                                    {this.state.parms.map((item,i) => (
                                        <li key={i} className="item fl">
                                            <div className="inputLine fl">
                                                <span className="fl">参数名称:</span>
                                                <input className="parmsName" type="text" value={item.name} readOnly disabled/>
                                            </div>
                                            <div className="inputLine fl">
                                                <Row>
                                                    <Col xs={4}>
                                                        <span className="fl">参数类型：</span>
                                                        <Dropdown id={"parmsType_"+i}>
                                                            <Dropdown.Toggle>
                                                                <input className="text parmsType" placeholder="请选择" style={{width:"80px",backgroundColor:"transparent",border:"0"}} disabled value={item.type}/>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {voiceTemplateAdd.parmsType.map((_type,j) => (
                                                                    <MenuItem eventKey={_type.value+"_"+i} key={j} onSelect={this.selectParmsType}>{_type.text}</MenuItem>
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        <div className="errorTips fl"></div>
                                                    </Col>
                                                    <Col xs={8}>
                                                        <span className="fl">长度：</span>
                                                        <input className="parmsLength fl" id={"parmsLength_"+i} type="text" value={item.length} onChange={this.setParmsLength} maxLength={voiceTemplateAdd.parmsLength.maxLength} onBlur={this.checkParmsLength}/>
                                                        <div className="errorTips fl"></div>
                                                        <div className="underTips fl">* 接口对参数进行长度校验,范围最长为1-100。</div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="inputLine">
                                                <span className="fl">参数描述：</span>
                                                <div className="textArea fl">
                                                    <div className="heightAuto">{item.des}</div>
                                                    <textarea className="parmsDes" id={"parmsDes_"+i} onChange={this.setParmsDes} value={item.des} maxLength={voiceTemplateAdd.parmsDes.maxLength} onBlur={this.checkParmsDes}/>
                                                </div>
                                                <div className="errorTips fl"></div>
                                                <div className="underTips fl">* 对参数的详细描述，不超过150字符。</div>
                                            </div>
                                            <div className="inputLine fl">
                                                <Button className="delParms" onClick={this.removItem} value={i}>删除</Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ):""}
                        </div>
                        <div className="title fl">模板使用场景</div>
                        <div className="content fl">
                            <div className="textArea fl">
                                <div className="heightAuto">{this.state.scene}</div>
                                <textarea className="voiceTemplateScene" maxLength={voiceTemplateAdd.scene.maxLength} onChange={this.setScene} onBlur={this.checkScene} value={this.state.scene}/>
                            </div>
                            <div className="errorTips fl"></div>
                            <div className="underTips fl">* 请详细描述单向语音模板使用的场景，方便管理员顺利审核模板，内容不超过300字符。</div>
                        </div>
                        <div className="inputLine fl">
                            <Button className="submit" bsStyle="primary" onClick={this.submit}>提交</Button>
                            <Button className="save" bsStyle="success" onClick={this.save}>保存</Button>
                        </div>
                    </ButtonToolbar>
                </div>
                {tips}
            </div>
        )
    }
}
module.exports = voiceTemplateAdd;