import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col, List, Row} from 'antd';

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
            <List.Item>
                <Row>
                    <Col span={14}>
                        <Link to={'/forum/' + this.props.id + '/'}>{this.props.title}</Link>
                    </Col>
                    <Col span={2}>
                        Posts: {this.props.posts_in}
                    </Col>
                    <Col span={2}>
                        Subs: {this.props.subs_in}
                    </Col>
                    <Col span={6}>
                        /* delete and change buttons */
                    </Col>
                </Row>
            </List.Item>
        );
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(SubforumListElement);