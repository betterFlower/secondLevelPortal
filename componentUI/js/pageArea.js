/**
 * Created by hqer on 2016/12/21.
 */
import React from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import { Pagination , DropdownButton , MenuItem , Button } from 'react-bootstrap'
import Input from '../../componentUI/js/Input'

class pageArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageNow:this.props.pageNow,
            i:this.props.pageList.i
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this._setInputVal = this._setInputVal.bind(this);
    }
    componentWillReceiveProps(newProps){
        if(newProps.pageNow!=this.state.pageNow&&newProps.i!=this.state.i){
            this.setState({pageNow:newProps.pageNow,i:newProps.i});
        }else if(newProps.pageNow!=this.state.pageNow){
            this.setState({pageNow:newProps.pageNow});
        }else if(newProps.i!=this.state.i){
            this.setState({i:newProps.i});
        }
    }
    _setInputVal(_obj){
        if(!_obj.state.v){
            _obj.setState({v:this.state.pageNow});
        }
    }
    handleSelect(i){
        if(this.state.pageNow!=i){
            if(typeof this.props.onSelect === "function"){
                this.props.onSelect(i);
            }else{
                this.setState({pageNow:i});
            }
        }
    }
    handleSearch(){
        let _e = findDOMNode(this);
        let _pageN = $(_e).find("input.pageInput").val();
        if(_pageN*1&&this.state.pageNow!=_pageN*1){
            if(typeof this.props.onSearch === "function"){
                this.props.onSearch(_pageN*1);
            }else{
                this.setState({pageNow:_pageN});
            }
        }
    }
    handleSelectItem(eventKey){
        let _i = eventKey*1;
        if(_i!=this.state.i){
            if(typeof this.props.onSelectItem === "function"){
                this.props.onSelectItem(_i);
            }else{
                this.setState({i:_i});
            }
        }
    }
    render() {
        let dropdown;
        if(this.props.isShow){
            dropdown=(<DropdownButton>
                {this.props.pageList.a.map((item,i) => (
                    <MenuItem eventKey={i} key={i} onSelect={this.handleSelectItem}>{item.t}</MenuItem>
                ))}
            </DropdownButton>);
        }
        return (
            <div className="pageArea">
                {dropdown}
                <Pagination
                    prev
                    next
                    items={this.props.totalPage}
                    maxButtons={this.props.maxPage}
                    activePage={this.state.pageNow}
                    onSelect={this.handleSelect} className="basicPagination"/>
                <div className="pageText">共 {this.props.totalPage}页 到第</div>
                <Input type="positiveInt" maxValue={this.props.totalPage} className="pageInput" v={this.state.pageNow} onBlur={this._setInputVal}/>
                <div className="pageText">页</div>
                <Button onClick={this.handleSearch}>确定</Button>
            </div>
        )
    }
}

pageArea.propTypes = {
    isShow: React.PropTypes.bool.isRequired,
    totalPage: React.PropTypes.number.isRequired,
    maxPage: React.PropTypes.number.isRequired,
    pageNow: React.PropTypes.number.isRequired,
    pageList: React.PropTypes.object.isRequired
};
pageArea.defaultProps = {
    isShow:false,
    totalPage:1,
    maxPage:1,
    pageNow:1,
    pageList:{i:0,a:[{t:10,v:10},{t:30,v:30},{t:50,v:50}]}
};
module.exports = pageArea;