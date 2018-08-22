/**
 * Created by hqer on 2017/3/1.
 */
import React from 'react'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'

class orderResult extends React.Component{
    render() {
        return (
            <div className="rechargeResult">
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
                        <li className="bigCircle select">
                            <div className="text">确认订单</div>
                            <div className="num">2</div>
                            <div className="circleSmall">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
                        <li className="bigCircle select">
                            <div className="text">订购成功</div>
                            <div className="num">3</div>
                        </li>
                    </ul>
                    <div className="resultPay">
                        <div className="center">
                            <div className="icon-payResultSuccess"></div>
                            恭喜您,您已经成功订购API产品！
                            <div className="des">订单编号：{this.props.params.orderId}</div>
                            <div className="text1">您可以进行以下操作：</div>
                            <div className="text2">
                                <p>查看 <Link className="link" to={"/orderItemDetail/"+this.props.params.orderId}>订单详情</Link> 了解当前订单的详细进展</p>
                                <p>进入 <Link className="link" to="/myServer">我的API产品</Link> 订购其他API产品</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = orderResult;