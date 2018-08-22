/**
 * Created by hqer on 2017/3/6.
 */
import React from 'react'
import { Link,hashHistory } from 'react-router'
import { Table,Button,ButtonToolbar,DropdownButton,Dropdown,MenuItem,Row,Col } from 'react-bootstrap'

class introduction extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            trList:[]
        };
        this.goToNext = this.goToNext.bind(this);
    }
    componentDidMount(){
        window.GLOBAL.action.header.select(2);
        //let parms = {
        //    eaId:this.props.params.eaId
        //};
        //window.GLOBAL.ajaxMap.setParms("getOrderPackage",parms);
        //let ajax = window.GLOBAL.ajaxMap.getAjaxParms("getOrderPackage");
        //ajax.success=function(r){
        //    this.setState({
        //        name:r.name,
        //        data:r.data,
        //        selTypId:r.data[0].typeId
        //    });
        //}.bind(this);
        //$.ajax(ajax);
    }
    componentDidUpdate(prevProps, prevState){

    }
    goToNext(){
        if(sessionStorage&&sessionStorage["userInfo"]){
            let r = JSON.parse(sessionStorage["userInfo"]);
            if(r.isLogin){
                hashHistory.push("/myServer");
                return ;
            }
        }
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
    render() {
        let introduction = window.GLOBAL.pageData.introduction[this.props.params.apiTypeId];
        return (
            <div className="introduction">
                <div className="bannerArea" style={{backgroundColor:introduction.bannerColor}}>
                    <div className="bannerBox">
                        <img src={introduction.img} className="bigIcon"/>
                        <div className="rightText">
                            <h2 style={{color:introduction.titleColor}}>{introduction.title}</h2>
                            <p>{introduction.text}</p>
                            <Button bsStyle="primary" onClick={this.goToNext}>立即使用</Button>
                        </div>
                    </div>
                </div>
                <div className="whiteSpace">
                    <div className="titleBox">
                        <i className="left"></i>
                        <h2>{introduction.item0.title}</h2>
                        <i className="right"></i>
                    </div>
                    <Row>
                        {introduction.item0.child.map((item,i) => (
                            <Col xs={12/introduction.item0.child.length}>
                                <div className={"midIcon "+item.icon}></div>
                                <div className="textIcon">{item.text}</div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="whiteSpace">
                    <div className="titleBox">
                        <i className="left"></i>
                        <h2>{introduction.item1.title}</h2>
                        <i className="right"></i>
                    </div>
                    <Table striped bordered hover responsive className="basicList fl">
                        <thead>
                        <tr>
                            {introduction.item1.listTitle.map((item,i) => (
                                <th className={"fl th"+i} key={i}>{item}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.trList.map((tr,j) => (
                            <tr key={j}>
                                {introduction.item1.showKey.map((item,i) => (
                                    <td className={"fl th"+i} key={i}>
                                        {Object.prototype.toString.call(tr[item]) === '[object Array]'?(
                                            tr[item].map((e,z) => (
                                                <div className={"line "+z%2===0?"bgGray":"line"} key={z}>{e}</div>
                                            ))
                                        ):tr[item]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="whiteSpace">
                    <div className="titleBox">
                        <i className="left"></i>
                        <h2>{introduction.item2.title}</h2>
                        <i className="right"></i>
                    </div>
                    <ul className="sceneList">
                        {introduction.item2.child.map((item,i) => (
                            <li style={{backgroundColor:item.bgColor}}>
                                <div className="textBox fl">
                                    <h3>{item.title}</h3>
                                    <div className="text">{item.text}</div>
                                </div>
                                <div className={"smallIcon fr "+item.icon}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
module.exports = introduction;