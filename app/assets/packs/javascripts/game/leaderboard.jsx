import React, {Component} from 'react'
import {connect} from 'react-redux'

class LeaderBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {users: {}};
    }

    getResults() {
        $.get('/game/get_results', {}, (data, status, y) => {
            this.setState(data);
        });
    }

    render() {
        return (
            <table className='leaderboard'>
                {this.state.users.map((user, index) => {

                })
                }
            </table>
        )
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(LeaderBoard);