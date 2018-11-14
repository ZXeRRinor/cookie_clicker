import React, {Component} from 'react'
import {connect} from 'react-redux'

class LeaderBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [], updateTimer: setInterval(this.getLeaderList, 6000)};
        this.getLeaderList();
    }

    getLeaderList() {
        $.get('/game/leaderboard', {}, (data, status, y) => {
            this.setState({users: data});
        });
    }

    render() {
        return (
            <table className='leaderboard table table-bordered col-4'>
                <thead>
                <tr>
                    <th scope='col'>Position</th>
                    <th scope='col'>User ID</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>User's cookies</th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map((user, index) =>
                    <tr className='leaderboard_item' key={index}>
                        <td scope='col'>{index + 1}</td>
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