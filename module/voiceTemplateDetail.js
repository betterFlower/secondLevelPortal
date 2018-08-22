/**
 * Created by hqer on 2017/2/4.
 */
import React from 'react'
import { hashHistory } from 'react-router'
import { Button,Row,Col } from 'react-bootstrap'

class voiceTemplateDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            status:"",
            statusDes:"",
            time1:"",
            time2:"",
            content:"",
            parms:[],
            scene:""
        };
        this.getInfo = this.getInfo.bind(this);
        this.goToBack = this.goToBack.bind(this);
    }
    componentDidMount(){
        this.getInfo(this.props.params.voiceTemplateId);
    }
    goToBack(){
        hashHistory.goBack();
    }
    getInfo(_id){
        window.GLOBAL.ajaxMap.setParm("voiceTemplateDetail",'voiceTemplateId',_id);
        window.GLOBAL.ajaxMap.setParm("voiceTemplateDetail",'token',window.GLOBAL.token);
        let parms = window.GLOBAL.ajaxMap.getAjaxParms("voiceTemplateDetail");
        parms.success=function(r){
            this.setState({
                name:r.name,
                status:r.status,
                statusDes:r.statusDes,
                time1:r.time1,
                time2:r.time2,
                content:r.content,
                parms:r.parms,
                scene:r.scene
            });
        }.bind(this);
        $.ajax(parms);
    }
    render() {
        let voiceTemplateDetail = window.GLOBAL.pageData.voiceTemplate.voiceTemplateDetail;
        return (
            <div className="smsTemplateDetail">
                <div className="MainTitle">
                    <h1>{voiceTemplateDetail.title}</h1>
                    <Button className="backBtn" onClick={this.goToBack}>返回</Button>
                </div>
                <div className="whiteSpace">
                    <Row>
                        <Col xs={4}>
                            语音模板ID：
                            <span className="color666">{this.props.params.voiceTemplateId}</span>
                        </Col>
                        <Col xs={4}>
                            模板名称：
                            <span className="color666">{this.state.name}</span>
                        </Col>
                        <Col xs={4}>
                            审核状态：
                            <span className="color666">{this.state.status}</span>
                            {this.state.statusDes?(
                                <div className="icon-help" style={{display:"inline-block"}}></div>
                            ):""}
                            {this.state.statusDes?(
                                <div className="titleTips">
                                    <div className="arrow">
                                        <em></em><span></span>
                                    </div>
                                    {this.state.statusDes}
                                </div>
                            ):""}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            提交时间：
                            <span className="color666">{this.state.time1}</span>
                        </Col>
                        <Col xs={4}>
                            审核时间：
                            <span className="color666">{this.state.time2}</span>
                        </Col>
                    </Row>
                    <div className="title">模板内容</div>
                    <div className="content color666">{this.state.content}</div>
                    <div className="title">模板参数列表</div>
                    {this.state.parms.map((item,i) =>(
                        <div key={i} className="item">
                            <Row>
                                <Col xs={4}>
                                    参数名称：
                                    <span className="color666">{item.name}</span>
                                </Col>
                                <Col xs={4}>
                                    参数类型：
                                    <span className="color666">{item.type}</span>
                                </Col>
                                <Col xs={4}>
                                    长度：
                                    <span className="color666">{item.length}</span>
                                </Col>
                            </Row>
                            <div className="text">
                                <span className="absolute">参数描述：</span>
                                <span className="color666">{item.des}</span>
                            </div>
                        </div>
                    ))}
                    <div className="title">模板使用场景</div>
                    <div className="content color666">{this.state.scene}</div>
                </div>
            </div>
        )
    }
}
module.exports = voiceTemplateDetail;