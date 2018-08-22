/**
 * Created by hqer on 2016/12/27.
 */
import React from 'react'
import { Button } from 'react-bootstrap'

class Tips extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handCancel = this.handCancel.bind(this);
    }
    handleClick(){
        if(typeof this.props.onSubmit === "function"){
            this.props.onSubmit()
        }
    }
    handCancel(){
        if(typeof this.props.onCancel === "function"){
            this.props.onCancel()
        }
    }
    render() {
        let btns = [];
        if(this.props.btns.length){
            this.props.btns.map((element,index) => {
                btns.push(<Button key={index} bsStyle={index===0?"primary":"default"} onClick={element.type?this.handleClick:this.handCancel}>{element.text}</Button>)
            })
        }
        return (
            <div className="tipsBg">
                <div className="tipsBox">
                    <div className={"tips "+this.props.className}>
                        <div className="tipsTitle">{this.props.title}</div>
                        <div className="tipsContext">{this.props.text}</div>
                        <div className="tipsBtnArea">
                            {btns}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Tips.propTypes = {
    className: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    text:React.PropTypes.string.isRequired,
    btns: React.PropTypes.array.isRequired
};
Tips.defaultProps = {
    className:"",
    title:"提示",
    text:"",
    btns:[{text:"确定",type:1},{text:"取消",type:0}]

};
module.exports = Tips;