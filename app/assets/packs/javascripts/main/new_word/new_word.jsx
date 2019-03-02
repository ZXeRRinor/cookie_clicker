import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Col, Form, Icon, Input, Row, Select} from 'antd'

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
                this.sendData(values);
            }
        });
    };

    sendData = (values) => {
        console.log('send');
        $.post('/add_new_word', {authenticity_token: this.state.authenticity_token, values: values});
    };

    componentDidMount() {
        $.get('/get_comp/csrf_tags', (data) => {
            this.setState({authenticity_token: $(data)[2].content});
        });
    }

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
                label={index === 0 ? 'Meanings' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`meanings[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Please enter word meaning or delete this field.",
                    }],
                })(
                    <Input placeholder="Meaning" style={{width: '60%', marginRight: 8}}/>
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
                    <Col span={8}>
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
                    <Col span={16}>
                        <Form.Item
                            {...formItemLayoutWithOutLabel}
                            label="Select origin language"
                            hasFeedback
                        >
                            {getFieldDecorator('origin_lang', {
                                rules: [
                                    {required: true, message: 'Please select origin language'},
                                ],
                            })(
                                <Select placeholder="Please select a country" style={{width: '120px'}}>
                                    <Select.Option value="mari">Mari</Select.Option>
                                    <Select.Option value="rus">Russian</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
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