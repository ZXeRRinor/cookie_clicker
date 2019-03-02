import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';

class NormalRegisterForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

            }
        });
    };

    getForm() {
        $.get('/get_comp/login_form', (data) => {
            this.setState({reg_form: data});
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Username"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your e-mail!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="E-Mail"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please confirm your password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Confirm password"/>
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form>
        );
    }
}

const RegisterForm = Form.create({name: 'register'})(NormalRegisterForm);

export default RegisterForm;