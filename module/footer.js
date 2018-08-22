/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'
import { Link } from 'react-router'

class footer extends React.Component{
    render() {
        let footerDate = window.GLOBAL.pageData.footer;
        return (
            <div className="pageLevel0" style={{"minHeight":($(window).height()>700?$(window).height():700)+"px"}}>
                {this.props.children}
                <div className="footer">
                    <ul className="footerUl">
                        <li className="fl"><Link to={footerDate.gsjj.url}>{footerDate.gsjj.text}</Link></li>
                        <li className="fl"><Link to={footerDate.lxwm.url}>{footerDate.lxwm.text}</Link></li>
                        <li className="fl">{footerDate.txbq.text}</li>
                        <li className="fr"><a href={footerDate.ghs.url}><img className="ghs" src={footerDate.ghs.img}/><span>{footerDate.ghs.text}</span></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
module.exports = footer;