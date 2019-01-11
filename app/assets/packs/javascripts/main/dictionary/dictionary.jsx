import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, Switch, Row, Col, Card, Select, Button} from 'antd'
import {Link} from "react-router-dom";

const Search = Input.Search;
const Option = Select.Option;

class Dictionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            origin_lang: 'mari',
            target_lang: 'rus',
            translation_result: [],
            backtranslations: false,
            backtrans_mode: false
        };
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    onChangeLangSelect = (value) => {
        this.setState({origin_lang: value, target_lang: value === 'rus' ? 'mari' : 'rus'});
        if (value === 'mari') {
            this.setState({backtranslations: false});
        }
    };

    updateOutput = () => {
        this.setState({translation_result: this.state.translation_result === undefined ? [] : this.state.translation_result});
    };

    onChangeBacktransSwitch = (checked) => {
        this.setState({backtranslations: !this.state.backtranslations})
    };

    translateClick = (value) => {
        this.translate(value, this.state.origin_lang, this.state.target_lang);
        this.setState({input_word: value})
    };

    translate = (word, origin_lang, target_lang) => {
        $.get('/translate', {
            backtranslations: this.state.backtranslations,
            word: word,
            origin_lang: origin_lang,
            target_lang: target_lang
        }, (data) => {
            console.log(this.state.backtranslations);
            console.log(data);
            this.setState({translation_result: data['translation_result']});
            this.updateOutput();
            this.setState({backtrans_mode: this.state.backtranslations})
        });
    };

    render() {
        return (
            <div>
                <Row style={{height: '70px'}}/>
                <Row>
                    <Col span={6}>
                        <Search
                            placeholder={"Enter #{this.state.origin_lang === 'rus' ? 'russian' : this.state.origin_lang} word"}
                            enterButton="Translate"
                            onSearch={value => this.translateClick(value)}
                        />
                    </Col>
                    <Col span={1}/>
                    <Col span={4}>
                        <span>Backtranslations (can be slow) </span>
                        {
                            this.state.origin_lang === 'mari' ?
                                <Switch disabled/> :
                                <Switch onChange={this.onChangeBacktransSwitch}/>
                        }
                    </Col>
                    <Col span={1}/>
                    <Col span={4}>
                        <Select defaultValue="mari" onChange={this.onChangeLangSelect}>
                            <Option value="mari">Mari -> Russian</Option>
                            <Option value="rus">Russian -> Mari</Option>
                        </Select>
                    </Col>
                    <Col span={1}/>
                    <Col span={3}>
                        <Link to="/add_new_word/">
                            <Button type="primary"></Button>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col span={16}>
                        <Card title={this.state.input_word} bordered={false}>
                            {
                                this.state.translation_result.map((val, key) =>
                                    this.state.backtrans_mode ?
                                        <Row key={key}>
                                            <Col span={5}>
                                                <p>{val['mari_word']}</p>
                                            </Col>
                                            <Col span={19}>
                                                <p>{val['rus']}</p>
                                            </Col>
                                        </Row> :
                                        <Row key={key}>
                                            <Col span={20}>
                                                <p>{val['word']}</p>
                                            </Col>
                                        </Row>
                                )
                            }
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Dictionary);