import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal} from 'antd';
import LoginForm from './login_form'

class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {reg_form: null, visible: false};
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    showModal = () => {
        this.dispatch('set_login_modal_visibility', true)
    };

    handleOk = (e) => {
        this.dispatch('set_login_modal_visibility', false)
    };

    handleCancel = (e) => {
        this.dispatch('set_login_modal_visibility', false)
    };

    getForm() {
        $.get('/get_comp/login_form', (data) => {
            this.setState({reg_form: data});
        });
    }

    render() {
        return (
            <div>
                <Modal
                    title="Log in"
                    visible={this.store()['login_modal_visibility']}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <LoginForm/>
                </Modal>
            </div>
        );
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(LoginModal);