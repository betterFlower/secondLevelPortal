/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'
import { Link,hashHistory } from 'react-router'
import { Table,Button,ButtonToolbar,DropdownButton,Dropdown,MenuItem,Row,Col } from 'react-bootstrap'
import CheckBox from '../componentUI/js/checkBox'
import FileUpload from 'react-fileupload'
import Tips from '../componentUI/js/tips'
import MD5 from "md5"

class order extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            data:[],
            selTypId:"",
            appId:"",
            appData:[],
            APIData:[],
            showTips:0,
            tipsText:"",
            upload:{
                id:"",
                text:"选择文件",
                errorTips:"",
                status:false
            }
        };
        this.selTypId = this.selTypId.bind(this);
        this.submit =this.submit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.setItemType0 = this.setItemType0.bind(this);
        this.checkItemType0Phone = this.checkItemType0Phone.bind(this);
        this.checkItemType0Number = this.checkItemType0Number.bind(this);
        this.checkItemType0Url = this.checkItemType0Url.bind(this);
        this.selectItemType1 = this.selectItemType1.bind(this);
        this.setAppId = this.setAppId.bind(this);
    }
    componentDidMount(){
        let parms = {
            eaId:this.props.params.eaId
        };
        window.GLOBAL.ajaxMap.setParms("getOrderPackage",parms);
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("getOrderPackage");
        ajax.success=function(r){
            this.setState({
                name:r.name,
                data:r.data,
                selTypId:r.data[0].typeId
            });
        }.bind(this);
        $.ajax(ajax);
        let parms1 = {
            eaId:this.props.params.eaId
        };
        window.GLOBAL.ajaxMap.setParms("abilityAPIData",parms1);
        let ajax1 = window.GLOBAL.ajaxMap.getAjaxParms("abilityAPIData");
        ajax1.success=function(r){
            this.setState({
                APIData:r.data
            });
        }.bind(this);
        $.ajax(ajax1);
        let parms2 = {
            eaId:this.props.params.eaId
        };
        window.GLOBAL.ajaxMap.setParms("getOrderAppList",parms2);
        let ajax2 = window.GLOBAL.ajaxMap.getAjaxParms("getOrderAppList");
        ajax2.success=function(r){
            this.setState({
                appData:r.data
            });
        }.bind(this);
        $.ajax(ajax2);
    }
    submit(){
        let _isOk = true;
        this.state.APIData.map((item,i) => {
            if(item.value === ""||item.value === []){
                _isOk = false;
            }
            if(item.type===4&&!this.state.upload.status){
                _isOk = false;
            }
        });
        if($(".apiType0")[0]){
            $(".apiType0").each(function(n,i){
                if($(this).hasClass("phone")&&!window.GLOBAL.checkFun.isPhoneNum($(this),$(this).siblings(".errorTips"))){
                    _isOk = false;
                }else if($(this).hasClass("url")&&!window.GLOBAL.checkFun.isUrl($(this),$(this).siblings(".errorTips"))){
                    _isOk = false;
                }
            })
        }
        if($(".phones")[0]){
            $(".phones").each(function(n,i){
                if(!window.GLOBAL.checkFun.isPhoneNums($(this),$(this).parent().siblings(".errorTips"),100)){
                    _isOk = false;
                }
            })
        }
        if(_isOk){
            let _appInfo = {};
            this.state.appData.map((n,i)=>{
                if(n.id===this.state.appId){
                    _appInfo = n;
                }
            });
            let orderInfo = {
                name:this.state.name,
                typeId:this.state.selTypId,
                appInfo:_appInfo,
                APIData:this.state.APIData
            };
            let parms = {eaId:this.props.params.eaId, token:window.GLOBAL.token,appId:this.state.appId};
            window.GLOBAL.ajaxMap.setParms("openAbility",parms);
            let ajax = window.GLOBAL.ajaxMap.getAjaxParms("openAbility");
            ajax.success=function(data){
                if(data.code===1){
                    sessionStorage["orderInfo"]=JSON.stringify(orderInfo);
                    hashHistory.push("/orderToPay/"+this.props.params.eaId);
                }else if(data.code===2){
                    this.setState({showTips:2,tipsText:data.tipsText});
                }
            }.bind(this);
            $.ajax(ajax);
        }
    }
    handleCancel(){
        this.setState({showTips:0})
    }
    selTypId(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        let _val = _eT.value;
        this.setState({selTypId:_val})
    }
    setItemType0(event) {
        let _eT = event.srcElement ? event.srcElement : event.target;
        let _val = _eT.value;
        let _i = _eT.title*1;
        let oldAPIData = Object.assign([], this.state.APIData);
        oldAPIData[_i].value = _val;
        this.setState({APIData:oldAPIData});
    }
    checkItemType0Phone(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        window.GLOBAL.checkFun.isPhoneNum($(_eT),$(_eT).siblings(".errorTips"));
    }
    checkItemType0Number(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        window.GLOBAL.checkFun.isNumberString($(_eT),$(_eT).siblings(".errorTips"));
    }
    checkItemType0Url(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        window.GLOBAL.checkFun.isUrl($(_eT),$(_eT).siblings(".errorTips"));
    }
    selectItemType1(eventKey){
        let oldAPIData = Object.assign([],this.state.APIData);
        let _p = eventKey.split("_");
        if(_p.length===2){
            oldAPIData[_p[1]].value = _p[0];
        }
        this.setState({APIData:oldAPIData});
    }
    selectItemType2(_i,_j){
        let oldAPIData = Object.assign([],this.state.APIData);
        let isSel = true;
        oldAPIData[_i].value.forEach((x,i)=>{
            if(x === oldAPIData[_i].child[_j].value){
                oldAPIData[_i].value.splice(i, 1);
                isSel = false;
            }
        });
        if(isSel){
            oldAPIData[_i].value.push(oldAPIData[_i].child[_j].value)
        }
        this.setState({APIData:oldAPIData});
    }
    checkItemType3(event){
        let _eT = event.srcElement?event.srcElement:event.target;
        window.GLOBAL.checkFun.isPhoneNums($(_eT),$(_eT).parent().siblings(".errorTips"),100);
    }
    setAppId(event){
        let _eT = event.srcElement ? event.srcElement : event.target;
        let _val = _eT.value;
        this.setState({appId:_val})
    }
    render() {
        let myServer = window.GLOBAL.pageData.myServer;
        let orderNew = window.GLOBAL.pageData.orderNew;
        let options;
        if(this.state.APIData.length>0&&this.state.APIData.find((n) => (n.type === 4))){
            let _baseUrl;
            this.state.APIData.map((item,i) => {
                if(item.type === 4){
                    _baseUrl = item.uploadUrl;
                }
            })
            options = {
                baseUrl:_baseUrl,
                param:{
                    uploadToken:window.GLOBAL.uploadToken
                },
                fileFieldName:"upload",
                chooseAndUpload:true,
                accept: orderNew.uploadMp3.accept,
                beforeChoose:function(){
                    console.log('=====START======')
                }.bind(this),
                chooseFile:function(files){
                    console.log('=====chooseFile======');
                    let oldAPIData = Object.assign([],this.state.APIData);
                    this.state.APIData.map((n,i) => {
                        if(n.type === 4){
                            if(typeof files == "String"){
                                oldAPIData[i].value = files;
                            }else{
                                oldAPIData[i].value = files[0].nam;
                            }
                        }
                    })
                    this.setState({APIData:oldAPIData})
                }.bind(this),
                beforeUpload:function(files , mill){
                    console.log('=====beforeUpload======');
                    if(typeof files == "String"){
                        return true;
                    }
                    let _upload = {id:"",text:"选择文件",errorTips:"",status:false};
                    let oldAPIData = Object.assign([],this.state.APIData);
                    this.state.APIData.map((n,i) => {
                        if(n.type === 4){
                            oldAPIData[i].value = ""
                        }
                    });
                    if(files[0].size === 0){
                        _upload.errorTips = "* 文件大小为0,请重新上传!";
                        this.setState({upload:_upload,APIData:oldAPIData});
                        return false;
                    }else if(files[0].size > orderNew.uploadMp3.maxSize){
                        _upload.errorTips = "* 文件过大,请重新上传!";
                        this.setState({upload:_upload,APIData:oldAPIData});
                        return false;
                    }
                    return true;
                }.bind(this),
                doUpload : function(files,mill,xhrID){
                    console.log('=====doUpload======')
                    let _upload = {id:xhrID,text:"上传中...",errorTips:"",status:false};
                    this.setState({upload:_upload});
                }.bind(this),
                uploadSuccess : function(resp){
                    console.log('=====uploadSuccess======')
                    if(resp.code){
                        let _upload = {id:"",text:"选择文件",errorTips:"* 上传成功!",status:true};
                        let oldAPIData = Object.assign([],this.state.APIData);
                        this.state.APIData.map((n,i) => {
                            if(n.type === 4){
                                oldAPIData[i].value = resp.data;
                            }
                        });
                        this.setState({upload:_upload,APIData:oldAPIData});
                    }else{
                        let _upload = {id:"",text:"选择文件",errorTips:resp.errorTips,status:false};
                        this.setState({upload:_upload});
                    }

                }.bind(this),
                uploadError : function(err){
                    console.log("uploadError===="+err.message)
                    let _upload = {id:"",text:"选择文件",errorTips:"* 上传失败,请重新上传!",status:false};
                    let oldAPIData = Object.assign([],this.state.APIData);
                    this.state.APIData.map((n,i) => {
                        if(n.type === 4){
                            oldAPIData[i].value = ""
                        }
                    });
                    this.setState({upload:_upload,APIData:oldAPIData});
                }.bind(this),
                uploadFail : function(resp){
                    console.log("uploadFail===="+resp)
                    let _upload = {id:"",text:"选择文件",errorTips:"* 上传失败,请重新上传!",status:false};
                    let oldAPIData = Object.assign([],this.state.APIData);
                    this.state.APIData.map((n,i) => {
                        if(n.type === 4){
                            oldAPIData[i].value = ""
                        }
                    });
                    this.setState({upload:_upload,APIData:oldAPIData});
                }.bind(this)
            }
        }
        return (
            <div className="order">
                <div className="whiteSpace">
                    <ul className="bigCircleProgress">
                        <li className="bigCircle select">
                            <div className="text">配置订单</div>
                            <div className="num">1</div>
                            <div className="circleSmall">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
                        <li className="bigCircle">
                            <div className="text">确认订单</div>
                            <div className="num">2</div>
                            <div className="circleSmall">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
                        <li className="bigCircle">
                            <div className="text">订购成功</div>
                            <div className="num">3</div>
                        </li>
                    </ul>
                    <div className="title">计费类型选择</div>
                    <Table striped hover responsive className="basicList fl" style={{borderTop:"1px solid #ddd"}}>
                        <thead>
                            <tr>
                                <th className="th0" key={0}>API名称</th>
                                <th style={{width:"80%"}}>
                                    {orderNew.listTitle.map((item,i) => (
                                        <div className={"fl th"+(i+1)} key={i+1}>{item}</div>
                                    ))}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="th0">{this.state.name}</td>
                            <td style={{width:"80%"}}>
                                <Table striped hover responsive className="basicList fl" style={{marginBottom:"0"}}>
                                    <tbody>
                                    {this.state.data.map((element,index) => (
                                        <tr className={index%2===0?"bgGray":""} key={index}>
                                            {orderNew.showKey.map((item,i) => (
                                                <td key={i} className={"th"+(i+1)}>
                                                    {item==="typeId"?(
                                                        <Button className={this.state.selTypId===element["typeId"]?"circle active":"circle"} onClick={this.selTypId} value={element["typeId"]}></Button>
                                                    ):(Object.prototype.toString.call(element[item]) === '[object Array]'?(
                                                        element[item].map((item1,j) => (
                                                            <div className="line" key={j}>{item1}</div>
                                                        ))
                                                    ):element[item])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <div className="title">订单所属应用</div>
                    <div className="appArea">
                        {
                            this.state.appData.map((item,i) => (
                                <Button key={i} onClick={this.setAppId} className={this.state.appId===item.id?"btn btn-other select fl":"btn btn-other fl"} value={item.id}>{item.name}</Button>
                            ))
                        }
                    </div>
                    <Link role="button" className="btn btn-default" to="/myAppsAdd"><span className="glyphicon glyphicon-plus"></span></Link>
                    {this.state.APIData.length>0?(<div className="title">API产品配置</div>):""}
                    <ul className="APIData">
                        <ButtonToolbar>
                            {
                                this.state.APIData.map((item,i) => (
                                    item.type===0?(
                                        <li key={i} className="fl" style={{width:"100%"}}>
                                            <span className="fl block">{item.text}</span>
                                            {
                                                item.key==="originalNumber"||item.key==="modifyNumber"||item.key==="prefixMonitorParty"||item.key==="modifyMonitorParty"?(
                                                    <input type="text" className={"fl phone apiType"+item.type} value={item.value} onChange={this.setItemType0} title={i} onBlur={this.checkItemType0Phone}/>
                                                ):(
                                                    item.key==="numberPrefix"?(
                                                        <input type="text" maxLength="7" className={"fl number apiType"+item.type} value={item.value} onChange={this.setItemType0} title={i} onBlur={this.checkItemType0Number}/>
                                                    ):(
                                                        <input type="text" className={"fl url apiType"+item.type} value={item.value} onChange={this.setItemType0} title={i} onBlur={this.checkItemType0Url}/>
                                                    )
                                                )
                                            }
                                            <div className="errorTips fl"></div>
                                        </li>
                                    ):(
                                        item.type===1?(
                                            <li key={i} className="fl" style={{width:"50%"}}>
                                                <span className="fl block">{item.text}</span>
                                                <Dropdown id={item.key}>
                                                    <Dropdown.Toggle>
                                                        <input className="text" placeholder="请选择" style={{width:"100px",backgroundColor:"transparent",border:"0"}} disabled value={item.child.map((n,i)=>(n.value === item.value?n.text:"")).toString().replace(/\,/g,"")}/>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {item.child.map((_type,j) => (
                                                            <MenuItem eventKey={_type.value+"_"+i} key={j} onSelect={this.selectItemType1}>{_type.text}</MenuItem>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <div className="errorTips fl"></div>
                                            </li>
                                        ):(
                                            item.type===2?(
                                                <li key={i} className="fl" style={{width:"100%"}}>
                                                    <span className="fl block">{item.text}</span>
                                                    <ul className="fl checkBoxList">
                                                        {item.child.map((_type,j) => (
                                                            <li className="fl" key={j}>
                                                                <CheckBox style={{float:"left"}} s={item.value.find((n) => n ===_type.value)?true:false} onClick={this.selectItemType2.bind(this,i,j)}/>
                                                                <div className="fl">{_type.text}</div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ):(
                                                item.type===3&&(item.value===""||typeof item.value === "string")?(
                                                    <li key={i} className="fl phonesBox" style={{width:"100%"}}>
                                                        <span className="fl block">{item.text}</span>
                                                        <div className="textArea fl">
                                                            <div className="heightAuto">{item.value}</div>
                                                            <textarea  className={"phones fl apiType"+item.type} onChange={this.setItemType0} onBlur={this.checkItemType3} title={i} value={item.value}/>
                                                        </div>
                                                        <div className="errorTips fl"></div>
                                                        <div className="fl underTips" style={{width:"100%"}}>多个手机号码之间请用“;”分隔！</div>
                                                    </li>
                                                ):(
                                                    item.type===4?(
                                                        <li key={i} className="fl" style={{width:"100%"}}>
                                                            <span className="fl block">{item.text}</span>
                                                            <input type="text" readOnly className="upload mp3 fl" value={item.value?item.value.split("/")[item.value.split("/").length-1]:""}/>

                                                            <FileUpload options={options} className="fl">
                                                                <button ref="chooseAndUpload" className="btn btn-default">{this.state.upload.text}</button>
                                                            </FileUpload>
                                                            <a target="_blank" style={{marginLeft:"10px"}} className="link fl" href={item.url} download>下载文件</a>
                                                            <div className="errorTips fl">{this.state.upload.errorTips}</div>
                                                        </li>
                                                    ):""
                                                )
                                            )
                                        )

                                    )
                                ))
                            }
                        </ButtonToolbar>
                    </ul>
                    {
                        this.state.APIData.find((n) => (n.value===""||(Object.prototype.toString.call(n.value) === '[object Array]'&&n.value.length===0)))?(
                            <div className="inputLine center">
                                <Button bsStyle="success" disabled onClick={this.submit}>下一步</Button>
                            </div>
                        ):(
                            this.state.appId===""?(
                                <div className="inputLine center">
                                    <Button bsStyle="success" disabled onClick={this.submit}>下一步</Button>
                                </div>
                            ):(
                                <div className="inputLine center">
                                    <Button bsStyle="success" onClick={this.submit}>下一步</Button>
                                </div>
                            )
                        )
                    }
                </div>
                {this.state.showTips===1?(<Tips {...orderNew.tips} onCancel={this.handleCancel}/>):(
                    this.state.showTips===2?(<Tips className={myServer.unOrder.className} text={this.state.tipsText} btns={myServer.unOrder.btns} onCancel={this.handleCancel}/>):""
                )}
            </div>
        )
    }
}
module.exports = order;