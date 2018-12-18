import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

class PostListElement extends Component {

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
            <li className="list-group-item bg-secondary list-group-item-info">
                <div className="row">
                    <div className="post_link col-9 text-light">
                        <Link to={'/forum/' + this.props.sub_id + '/' +this.props.id + '/'}>{this.props.title}</Link>
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
)(PostListElement);