
import React, {
    Component,
} from 'react'
import {
    View,
    ViewPropTypes,
    requireNativeComponent,
    Platform,
} from 'react-native'
import PropTypes from 'prop-types'

export default class ListItem extends Component {


    static propTypes = {
        ...ViewPropTypes,
        renderChildren: PropTypes.func,
    }

    constructor(props) {
        super(props)
        this.state = {
            hidden: true,
        }
    }

    render() {
        //console.log(`rowID = ${this.props.rowID} -> hidden = ${this.state.hidden}`)
        //return (
        //    <NativeListItem {...this.props} onWindowVisibilityChange={this._onWindowVisibilityChange}>
        //        {!this.state.hidden ? this.props.children : null}
        //    </NativeListItem>
        //)
        return (
            <NativeListItem
                ref={ component => this._nativeComponent = component }
                {...this.props}
                onWindowVisibilityChange={this._onWindowVisibilityChange}>
                {this.props.renderChildren ?
                        this.props.renderChildren.call(this, this.state.hidden)
                        : !this.state.hidden ? this.props.children : null}
            </NativeListItem>
        )
    }

    _onWindowVisibilityChange = (e) => {
        let hidden = e.nativeEvent.hidden
        //console.log(`hidden = ${hidden}`)
        this.setState({
            hidden,
        })
    }
}

const NativeListItem = Platform.OS == 'ios' ? View : requireNativeComponent('RCTLazyLoadView', ListItem)


