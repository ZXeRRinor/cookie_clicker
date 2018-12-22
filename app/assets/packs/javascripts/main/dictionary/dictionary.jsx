import React, {Component} from 'react'
import {connect} from 'react-redux'

class Dictionary extends Component {

    constructor(props) {
        super(props);
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    inputChange = (event) => {
        console.log(event);
    };

    render() {
        return (
            <div>
                <input onChange={this.inputChange}>Word</input>
            </div>
        )
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Dictionary);