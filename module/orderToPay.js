/**
 * Created by hqer on 2017/2/9.
 */
import React from 'react';
import { Link,hashHistory } from 'react-router';
import { Table,Button } from 'react-bootstrap';
import MD5 from 'md5';

class orderToPay extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            levelText:'',
            APIType:'',
            validity:'',
            data:{},
            typeId:'',
            appInfo:{},
            APIData:[]
        };
        this.submit = this.submit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount () {
        if (sessionStorage['orderInfo']) {
            const orderInfo = JSON.parse(sessionStorage['orderInfo']);
            // sessionStorage.removeItem("orderInfo");
            const parms = {
                eaId:this.props.params.eaId,
                typeId:orderInfo.typeId
            };
            window.GLOBAL.ajaxMap.setParms('getOrderPackItem',parms);
            const ajax = window.GLOBAL.ajaxMap.getAjaxParms('getOrderPackItem');
            ajax.success = function (r) {
                this.setState({
                    typeId:orderInfo.typeId,
                    appInfo:orderInfo.appInfo,
                    APIData:orderInfo.APIData,
                    levelText:r.levelText,
                    APIType:r.APIType,
                    validity:r.validity,
                    data:r.data
                });
            }.bind(this);
            $.ajax(ajax);
        } else {
            hashHistory.push(`/order/${this.props.params.eaId}`);
        }
    }
    submit () {
        const parms = {
            eaId:this.props.params.eaId,
            typeId:this.state.typeId,
            appId:this.state.appInfo.id,
            APIData:JSON.stringify(this.state.APIData),
            token:window.GLOBAL.token,
            key1:MD5(`${this.props.params.eaId + this.state.typeId + this.state.appId + this.state.appId + JSON.stringify(this.state.APIData) + window.GLOBAL.token}devPortal`)
        };
        window.GLOBAL.ajaxMap.setParms('postOrder',parms);
        const ajax = window.GLOBAL.ajaxMap.getAjaxParms('postOrder');
        ajax.success = function (r) {
            if (r.code === 3) {
                window.GLOBAL.ajaxMap.checkError(r.codeStatus,hashHistory);
            } else if (r.code) {
                hashHistory.push(`/orderResult/${r.orderId}`);
            }
        }.bind(this);
        $.ajax(ajax);
    }
    handleCancel () {
        this.setState({showTips:false});
    }
    render () {
        const orderToPay = window.GLOBAL.pageData.orderToPay;
        return (
            <div className='order'>
                <div className='whiteSpace'>
                    <ul className='bigCircleProgress'>
                        <li className='bigCircle select'>
                            <div className='text'>配置订单</div>
                            <div className='num'>1</div>
                            <div className='circleSmall'>
                                <div />
                                <div />
                                <div />
                            </div>
                        </li>
                        <li className='bigCircle select'>
                            <div className='text'>确认订单</div>
                            <div className='num'>2</div>
                            <div className='circleSmall'>
                                <div />
                                <div />
                                <div />
                            </div>
                        </li>
                        <li className='bigCircle'>
                            <div className='text'>订购成功</div>
                            <div className='num'>3</div>
                        </li>
                    </ul>
                    <div className='title'>订单详情</div>
                    <div className='inputLine'>所属API集：{this.state.levelText}</div>
                    <div className='inputLine'>所属API类：{this.state.APIType}</div>
                    <div className='inputLine'>有效期：{this.state.validity}</div>
                    <div className='inputLine'>计费详情：</div>
                    <Table striped hover responsive className='basicList other fl' style={{borderTop:'1px solid #ddd'}}>
                        <thead>
                            <tr>
                                {orderToPay.listTitle.map((item,i) => (
                                    <th className={`th${i}`} key={i}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {orderToPay.showKey.map((item,i) => (
                                    <td key={i} className={`th${i}`}>
                                        {Object.prototype.toString.call(this.state.data[item]) === '[object Array]' ? (
                                            this.state.data[item].map((e,j) => (
                                                <div className='line' key={j}>{e}</div>
                                            ))
                                        ) : (
                                            <div className='ShowTxt'>{this.state.data[item]}</div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                    <div className='title'>订单所属应用</div>
                    <div className='inputLine'>
                        <Button bsStyle='info' className='active' value={this.state.appInfo.id}>{this.state.appInfo.name}</Button>
                    </div>
                    {this.state.APIData.length > 0 ? (<div className='title'>API产品配置</div>) : ''}
                    {
                        this.state.APIData.map((item,i) => (
                            item.type === 0 ? (
                                <div key={i} className='inputLine' style={{width:'100%'}}>
                                    {item.text}{item.value}
                                </div>
                            ) : (
                                item.type === 1 ? (
                                    <div key={i} className='inputLine' style={{width:'50%'}}>
                                        {item.text}{item.child.map((n,i) => (n.value === item.value ? n.text : '')).toString().replace(/\,/g,'')}
                                    </div>
                                ) : (
                                    item.type === 2 ? (
                                        <div key={i} className='inputLine' style={{width:'100%'}}>
                                            <span className='fl'>{item.text}</span>
                                            <span className='fl' style={{display:'block',maxWidth:'700px',wordBreak:'break-all'}}>{item.child.map((n,i) => (item.value.find((e) => e === n.value) ? `${n.text}、` : '')).toString().replace(/\,/g,'').split('').reverse().toString().substring(1).split('').reverse().toString().replace(/\,/g,'')}</span>
                                        </div>
                                    ) : (
                                        item.type === 3 && (item.value === '' || typeof item.value === 'string') ? (
                                            <div key={i} className='inputLine' style={{width:'100%'}}>
                                                <span className='fl'>{item.text}</span>
                                                <span className='fl' style={{display:'block',maxWidth:'700px',wordBreak:'break-all'}}>{item.value}</span>
                                            </div>
                                        ) : (
                                            item.type === 4 ? (
                                                <div key={i} className='inputLine' style={{width:'100%'}}>
                                                    {item.text}{item.value ? item.value.split('/')[item.value.split('/').length - 1] : ''}
                                                    <a target='_blank' role='button' className='btn btn-default' href={item.value} download>下载文件</a>
                                                </div>
                                            ) : ''
                                        )
                                    )
                                )

                            )
                        ))
                    }
                    <div className='inputLine center'>
                        <Button bsStyle='success' onClick={this.submit}>确认订单</Button>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = orderToPay;
