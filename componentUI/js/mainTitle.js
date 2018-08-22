/**
 * Created by hqer on 2016/12/20.
 */
import React from 'react'
class MainTitle extends React.Component{
    render() {
        return (
            <div className="MainTitle">
                <h1>{this.props.title}</h1>
                {this.props.children}
            </div>
        )
    }
}
module.exports = MainTitle;