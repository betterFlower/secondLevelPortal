/**
 * Created by hqer on 2016/12/20.
 */
import React from 'react'
class whiteSpace extends React.Component{
    render() {
        return (
            <div className="whiteSpace">
                {this.props.children}
            </div>
        )
    }
}
module.exports = whiteSpace;