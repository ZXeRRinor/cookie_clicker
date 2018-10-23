import React, {Component} from 'react'
import {connect} from 'react-redux'

class Clicker extends Component {

    constructor(props) {
        super(props);
        this.state = {x: 0};
        this.cookie_click = this.cookie_click.bind(this);
    }


    cookie_click() {
        this.state.x += 1;
        this.props.dispatch('addUserCookie');
    }

    render() {
        return (
            <div className='clicker'>
                <img onClick={this.cookie_click} src="https://avatanplus.com/files/resources/mid/578cdb575613a155fe38cd39.png" width="200px" height="200px" />
            </div>
        )
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Clicker);