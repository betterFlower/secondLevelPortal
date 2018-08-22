/**
 * Created by hqer on 2017/3/8.
 */
import React from 'react'
class restAPI extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            height:"600px"
        };
        this.setHight = this.setHight.bind(this);
    }
    setHight(){
        let _height = $("#box")[0].contentWindow.document.documentElement.scrollHeight;
        this.setState({height:_height+"px"});
    }
    render() {
        return (
            <iframe style={{width:"100%",height:this.state.height,border:0}} id="box" src={decodeURIComponent(this.props.location.query.d)} onLoad={this.setHight}></iframe>
        )
    }
}
module.exports = restAPI;