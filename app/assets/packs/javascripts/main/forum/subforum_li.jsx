import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class SubforumListElement extends Component {

    constructor(props) {
        super(props);
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    render() {
        return (
            <li className="list-group-item bg-dark list-group-item-success">
                <div className="row">
                    <div className="subforum_link col-7 text-light">
                        <Link to={'/forum/' + this.props.id + '/'}>{this.props.title}</Link>
                    </div>
                    <div className="col-1 sub_amount">
                        Posts: {this.props.posts_in}
                    </div>
                    <div className="col-1 sub_amount">
                        Subs: {this.props.subs_in}
                    </div>
                    <div className="col-3">
                        /* delete and change buttons */
                    </div>
                </div>
            </li>
        )
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(SubforumListElement);