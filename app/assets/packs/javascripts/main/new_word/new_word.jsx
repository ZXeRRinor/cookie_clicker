import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Input, Icon, Button, Row, Col} from 'antd'

let id = 0;

class AddNewWord extends Component {

    constructor(props) {
        super(props);
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    remove = (k) => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $.get('/add_new_word', {values: values});
            }
        });
    };

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 20, offset: 4},
            },
        };
        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Значения' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Please enter word's значение or delete this field.",
                    }],
                })(
                    <Input placeholder="Значение" style={{width: '60%', marginRight: 8}}/>
                )}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <div>
                <Row style={{height: '70px'}}/>
                <Row>
                    <Col span={10}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                {getFieldDecorator('word', {
                                    rules: [{required: true, message: 'Please input word!'}],
                                })(
                                    <Input placeholder="Word"/>
                                )}
                            </Form.Item>
                            {formItems}
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                                    <Icon type="plus"/> Add field
                                </Button>
                            </Form.Item>
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Form.create({name: 'dynamic_form_item'})(AddNewWord));