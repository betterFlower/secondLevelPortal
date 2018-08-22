/**
 * Created by zyb on 2016/12/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'

let that = null;
const container = document.createElement('div');

class GlobalTips extends React.Component {
    constructor(props) {
        super(props)
        that = this;
        this.state = {
            type: "default",
            content: "",
            style: {},
            callback: null
        };
        this.handleConfirmBtn = this.handleConfirmBtn.bind(this);
        this.handleCancelBtn = this.handleCancelBtn.bind(this);
    }
    componentWillUnmount() {
        document.body.removeChild(container);
    }
    //确定 btn
    handleConfirmBtn(e) {
        document.body.removeChild(container);
        if(this.state.callback) this.state.callback();
    }
    //取消 btn
    handleCancelBtn(e) {
        document.body.removeChild(container);
    }
    render() {
        let confirmBtn = (<div className="confirmBtn blurBorderBtn selected" onClick={this.handleConfirmBtn}>确定</div>);
        let cancelBtn = (<div className="cancelBtn greyBtn" onClick={this.handleCancelBtn}>取消</div>);
        let tipsHtml1 = (
            <div className="tipsBox">
                <div className="tips">
                    <div className="title">提示</div>
                    <div className="containerBox">
                        <div className="container">
                            <div className="text" style={this.state.style}>{this.state.content}</div>
                            <div className="tipsBtnList">
                                {confirmBtn}
                                {cancelBtn}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        let tipsHtml = tipsHtml1;
        if(this.state.type == "default") tipsHtml = tipsHtml1;
        return (
            <div className="tipsBg" style={{display:"table"}}>
                {tipsHtml}
            </div>
        );
    }
}

module.exports = function(options){
    document.body.appendChild(container);
    ReactDOM.render(<GlobalTips />, container);
    that.setState({
        type: options.type ? options.type : "default",
        content: options.content ? options.content : "default",
        style: options.style ? options.style : {},
        callback: options.callback ? options.callback : null
    });
};
