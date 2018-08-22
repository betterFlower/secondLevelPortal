/**
 * Created by hqer on 2017/3/8.
 */
import React from 'react'
import { Link } from 'react-router'
class devDoc extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            restAPIlist:[]
        };
    }
    componentDidMount(){
        window.GLOBAL.action.header.select(1);
        $(".leftLi.selected").removeClass("selected").find(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        $(".itemMenu a").each(function(_e,_i){
            if($(this).hasClass("active")){
                $(this).parents(".leftLi").addClass("selected").find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
            }
        });
        let ajax = window.GLOBAL.ajaxMap.getAjaxParms("getRestAPI");
        ajax.success=function(r){
            this.setState({restAPIlist:r.data});
        }.bind(this);
        $.ajax(ajax);
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.pathname!== this.props.location.pathname||prevState.restAPIlist!==this.state.restAPIlist){
            $(".leftLi.selected").removeClass("selected").find(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
            $(".itemMenu a").each(function(_e,_i){
                if($(this).hasClass("active")){
                    $(this).parents(".leftLi").addClass("selected").find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
                }
            })
        }
    }
    render() {
        let devDoc = window.GLOBAL.pageData.devDoc;
        return (
            <div className="workBench">
                <div className="pageLevel3">
                    {this.props.children}
                </div>
                <div className="leftMenu">
                    <ul className="leftUl">
                        {
                            devDoc.leftMenu.map((element,index) => (
                                <li className="leftLi" key={index}>
                                    {
                                        element&&element.child?(
                                            <ul className="itemMenu">
                                                <Link to={element.child[0].url} title={element.text}>
                                                    <div className="item">
                                                        <div className={"leftIcon icon-devdoc_icon"+element.icon}></div>
                                                        <span className="fl">{element.text}</span>
                                                        <span className="fr glyphicon glyphicon-plus"></span>
                                                    </div>
                                                </Link>
                                                {
                                                    element.child.map((item,i) => (
                                                        <Link to={item.url} key={i+1} title={item.text} activeClassName="active">
                                                            <li className="linkBtn" key={i}>
                                                                {item.text}
                                                            </li>
                                                        </Link>
                                                    ))
                                                }
                                            </ul>
                                        ):(
                                        this.state.restAPIlist.length > 1&&element.key==="restAPI"?(
                                            <ul className="itemMenu">
                                                <Link to={element.url+"?d="+encodeURIComponent(this.state.restAPIlist[0].url)} title={element.text}>
                                                    <div className="item">
                                                        <div className={"leftIcon icon-devdoc_icon"+element.icon}></div>
                                                        <span className="fl">{element.text}</span>
                                                        <span className="fr glyphicon glyphicon-plus"></span>
                                                    </div>
                                                </Link>
                                                {
                                                    this.state.restAPIlist.map((item,i) => (
                                                        <Link to={element.url+"?d="+encodeURIComponent(item.url)}  key={i+1} title={item.text} activeClassName="active">
                                                            <li className="linkBtn" key={i}>
                                                                {item.text}
                                                            </li>
                                                        </Link>
                                                    ))
                                                }
                                            </ul>
                                        ):(
                                            <ul className="itemMenu">
                                                <Link to={element.url} title={element.text} activeClassName="active">
                                                    <div className="item">
                                                        <div className={"leftIcon icon-devdoc_icon"+element.icon}></div>
                                                        <span className="fl">{element.text}</span>
                                                    </div>
                                                </Link>
                                            </ul>
                                        ))
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
module.exports = devDoc;