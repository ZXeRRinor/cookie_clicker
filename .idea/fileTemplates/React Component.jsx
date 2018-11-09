import React, {Component} from 'react'
import {connect} from 'react-redux'

class App extends Component {

}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(App);