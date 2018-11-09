import React, {Component} from 'react'
import {connect} from 'react-redux'

class LeaderBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
        this.getLeaderList();
    }

    getLeaderList() {
        $.get('/game/leaderboard', {}, (data, status, y) => {
            this.setState({users: data});
        });
    }

    render() {
        return (
            <table className='leaderboard'>
                <thead>
                <tr>
                    <td>Position</td>
                    <td>User ID</td>
                    <td>Name</td>
                    <td>User's cookies</td>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map((user, index) =>
                    <tr className='leaderboard_item' key={index}>
                        <td>{index + 1}</td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.cookies}</td>
                    </tr>
                )}
                </tbody>
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