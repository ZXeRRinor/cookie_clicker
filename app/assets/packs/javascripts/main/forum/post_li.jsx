import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {Col, List, Row} from 'antd';

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
            <List.Item>
                <Row>
                    <Col span={18}>
                        <Link
                            to={'/discussion/' + this.props.sub_id + '/' + this.props.id + '/'}>{this.props.title}</Link>
                    </Col>
                    <Col spanw={6}>
                        /* delete and change buttons */
                    </Col>
                </Row>
            </List.Item>
        )
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(PostListElement);