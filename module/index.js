/**
 * Created by hqer on 2016/12/8.
 */
import React from 'react'

class index extends React.Component{
    render() {
        return (
            <div>
                <h2>index</h2>
                <div>{window.GLOBAL._environment}</div>
                {this.props.children}
            </div>
        )
    }
}
module.exports = index;