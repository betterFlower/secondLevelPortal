/**
 * Created by hqer on 2016/12/23.
 */
import React from 'react'

class CheckBox extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        if(typeof this.props.onClick ==="function"){
            this.props.onClick();
        }else{
            if(this.state.s){
                this.setState({s:false});
            }else{
                this.setState({s:true});
            }
        }
    }
    render() {
        let other = Object.assign({},this.props);
        delete other.v;
        delete other.s;
        delete other.style;
        return (
            <div style={this.props.style} className="checkBoxArea">
                <input
                    {...other}
                    type="checkbox"
                    className={this.props.s?"checkBoxBtn s1":"checkBoxBtn"}
                    checked={this.props.s}
                    value={this.props.v}
                    onClick={this.handleClick}
                />
                <div></div>
            </div>
        )
    }
}

CheckBox.propTypes = {
    name: React.PropTypes.string.isRequired,
    s: React.PropTypes.bool.isRequired,
    v:React.PropTypes.string.isRequired
};
CheckBox.defaultProps = {
    name:"",
    s:false,
    v:""

};
module.exports = CheckBox;