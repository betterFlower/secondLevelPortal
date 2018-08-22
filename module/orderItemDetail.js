/**
 * Created by hqer on 2016/12/16.
 */
import React from 'react';
import { hashHistory } from 'react-router';
import { Table,Button,Row,Col } from 'react-bootstrap';

class orderItemDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            status:'',
            times:[],
            validity:'',
            ability:'',
            levelText:'',
            APIType:'',
            data:{},
            APIData:[]
        };
        this.goToBack = this.goToBack.bind(this);
    }
    componentDidMount () {
        const parms = {
            orderId:this.props.params.orderId,
            token:window.GLOBAL.token
        };
        window.GLOBAL.ajaxMap.setParms('orderItemDetail',parms);
        const ajax = window.GLOBAL.ajaxMap.getAjaxParms('orderItemDetail');
        ajax.success = function (r) {
            this.setState({
                status:r.status,
                times:r.times,
                validity:r.validity,
                ability:r.ability,
                levelText:r.levelText,
                APIType:r.APIType,
                data:r.data
            });
        }.bind(this);
        $.ajax(ajax);
        const parms1 = {
            orderId:this.props.params.orderId,
            token:window.GLOBAL.token
        };
        window.GLOBAL.ajaxMap.setParms('abilityAPIData',parms1);
        const ajax1 = window.GLOBAL.ajaxMap.getAjaxParms('abilityAPIData');
        ajax1.success = function (r) {
            this.setState({
                APIData:r.data
            });
        }.bind(this);
        $.ajax(ajax1);
    }
    goToBack () {
        hashHistory.goBack();
    }
    render () {
        const orderItemDetail = window.GLOBAL.pageData.orderManage.orderItemDetail;
        console.log(this.state.times.length);
        return (
            <div className='orderItemDetail'>
                <div className='MainTitle'>
                    <h1>{orderItemDetail.title}</h1>
                    <Button className='backBtn' onClick={this.goToBack}>返回</Button>
                </div>
                <div className='whiteSpace'>
                    {this.state.times && this.state.times.length === 4 ? (
                        <ul className='bigCircleProgress'>
                            <li className={this.state.times && this.state.times[0] ? 'bigCircle select' : 'bigCircle'}>
                                <div className='text'>申请订单</div>
                                <div className='num'>1</div>
                                <div className='circleSmall'>
                                    <div />
                                    <div />
                                    <div />
                                </div>
                                <div className='underTips'>{this.state.times && this.state.times[0] ? this.state.times[0] : ''}</div>
                            </li>
                            <li className={this.state.times && this.state.times[1] ? 'bigCircle select' : 'bigCircle'}>
                                <div className='text'>订购订单</div>
                                <div className='num'>2</div>
                                <div className='underTips'>{this.state.times && this.state.times[1] ? this.state.times[1] : ''}</div>
                                <div className='circleSmall'>
                                    <div />
                                    <div />
                                    <div />
                                </div>
                            </li>
                            <li className={this.state.times && this.state.times[2] && (this.state.status === 2 || this.state.status === 3) ? 'bigCircle select' : 'bigCircle'}>
                                <div className='text'>申请退订</div>
                                <div className='num'>3</div>
                                <div className='underTips'>{this.state.times && this.state.times[2] ? this.state.times[2] : ''}</div>
                                <div className='circleSmall'>
                                    <div />
                                    <div />
                                    <div />
                                </div>
                            </li>
                            <li className={this.state.times && this.state.times[3] && this.state.status === 2 ? 'bigCircle select' : 'bigCircle'}>
                                <div className='text'>订单失效</div>
                                <div className='num'>4</div>
                                <div className='underTips'>{this.state.times && this.state.times[3] ? this.state.times[3] : ''}</div>
                            </li>
                        </ul>
                    ) : (
                        <ul className='bigCircleProgress'>
                            <li className={this.state.times && this.state.times[0] ? 'bigCircle select' : 'bigCircle'}>
                                <div className='text'>申请订单</div>
                                <div className='num'>1</div>
                                <div className='circleSmall'>
                                    <div />
                                    <div />
                                    <div />
                                </div>
                                <div className='underTips'>{this.state.times && this.state.times[0] ? this.state.times[0] : ''}</div>
                            </li>
                            <li className={this.state.times && this.state.times[1] ? 'bigCircle select' : 'bigCircle'}>
                                <div className='text'>订购订单</div>
                                <div className='num'>2</div>
                                <div className='underTips'>{this.state.times && this.state.times[1] ? this.state.times[1] : ''}</div>
                                <div className='circleSmall'>
                                    <div />
                                    <div />
                                    <div />
                                </div>
                            </li>
                            <li className={this.state.times && this.state.times[2] && this.state.status === 2 ? 'bigCircle select' : 'bigCircle'}>
                                <div className='text'>订单失效</div>
                                <div className='num'>3</div>
                                <div className='underTips'>{this.state.times && this.state.times[2] ? this.state.times[2] : ''}</div>
                            </li>
                        </ul>
                    )}
                    <Row>
                        <Col xs={5}>订单编号: {this.props.params.orderId}</Col>
                        <Col xs={4}>订单状态: {
                            window.GLOBAL.pageData.orderManage.status.map((item,i) => {
                                if (item.value === this.state.status) {
                                    return item.text;
                                }
                            })
                        }</Col>
                        <Col xs={3}>有效期: {this.state.validity}</Col>
                    </Row>
                    <Row>
                        <Col xs={5}>所属应用: {this.state.ability}</Col>
                        <Col xs={4}>所属API集: {this.state.levelText}</Col>
                        <Col xs={3}>所属API类: {this.state.APIType}</Col>
                    </Row>
                    <Row>
                        <Col xs={12}>有效时间: {this.state.times.length === 3 ? `${this.state.times[1]} - ${this.state.times[2]}` : this.state.times.length === 4 ? `${this.state.times[1]} - ${this.state.times[3]}` : '--'}</Col>
                    </Row>
                    <Table striped hover responsive className='basicList' style={{borderTop:'1px solid #ddd'}}>
                        <thead>
                            <tr>
                                {orderItemDetail.listTitle.map((item,i) => (
                                    <th className={`th${i}`} key={i}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={0}>
                                {orderItemDetail.showKey.map((item,i) => (
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
                    {this.state.APIData.length > 0 ? (<div className='title'>API产品配置</div>) : ''}
                    {
                        this.state.APIData.map((item,i) => (
                            item.type === 0 ? (
                                <div key={i} className='fl' style={{width:'100%'}}>
                                    {item.text}{item.value}
                                </div>
                            ) : (
                                item.type === 1 ? (
                                    <div key={i} className='fl' style={{width:'50%'}}>
                                        {item.text}{item.child.map((n,i) => (n.value === item.value ? n.text : '')).toString().replace(/\,/g,'')}
                                    </div>
                                ) : (
                                    item.type === 2 ? (
                                        <div key={i} className='fl' style={{width:'100%'}}>
                                            <span className='fl'>{item.text}</span>
                                            <span className='fl' style={{display:'block',maxWidth:'700px',wordBreak:'break-all'}}>{item.child.map((n,i) => (item.value.find((e) => e === n.value) ? `${n.text}、` : '')).toString().replace(/\,/g,'').split('').reverse().toString().substring(1).split('').reverse().toString().replace(/\,/g,'')}</span>
                                        </div>
                                    ) : (
                                        item.type === 3 ? (
                                            typeof item.value === 'object' && Object.prototype.toString.call(item.value) === '[object Array]' ? (
                                                <div key={i} className='fl' style={{width:'100%'}}>
                                                    <span className='fl'>{item.text}</span>
                                                    <div className='fl' style={{display:'block',maxWidth:'700px',wordBreak:'break-all'}}>
                                                        {
                                                            item.value.map((n,i) => (
                                                                <div key={i} className='fl'>
                                                                    <span className='fl text'>{n.text}</span>
                                                                    <span className={`fl icon icon-APIData-${n.icon}`} />
                                                                    <span className='fl text'>；</span>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={i} className='fl' style={{width:'100%'}}>
                                                    <span className='fl'>{item.text}</span>
                                                    <span className='fl' style={{display:'block',maxWidth:'700px',wordBreak:'break-all'}}>{item.value}</span>
                                                </div>
                                            )
                                        ) : (
                                            item.type === 4 ? (
                                                <div key={i} className='fl' style={{width:'100%'}}>
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

                </div>
            </div>
        );
    }
}
module.exports = orderItemDetail;
