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
            <div className='clicker col-2' onClick={this.cookie_click}>
                <button className='click_button'>
                    <img src="https://avatanplus.com/files/resources/mid/578cdb575613a155fe38cd39.png" width="300px"
                         height="300px"/>
                </button>
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