import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button, Form, Icon, Input,} from 'antd';

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    openRegisterModal = () => {
        this.dispatch('set_register_modal_visibility', true)
        this.dispatch('set_login_modal_visibility', false)
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Username"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                <span> or </span>
                <Button type="primary" onClick={this.openRegisterModal}>
                    Register
                </Button>
            </Form>
        );
    }
}

const LoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(LoginForm);