import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, Switch, Row, Col, Card} from 'antd'

const Search = Input.Search;

class Dictionary extends Component {

    constructor(props) {
        super(props);
        this.state = {changes: 0, translation_result: [], backtranslations: false};
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    inputChange = (event) => {
        let text = event.target.value;
        this.setState({input_text: text});
    };

    updateOutput = () => {
        this.setState({translation_result: this.state.translation_result === undefined ? [] : this.state.translation_result});
    };

    onChangeBacktransSwitch = (checked) => {
        this.setState({backtranslations: !this.state.backtranslations})
    };

    translateClick = (value) => {
        const or_l = 'rus';
        const targ_l = 'mari';
        this.translate(value, or_l, targ_l);
        this.setState({origin_lang: or_l, target_lang: targ_l, input_word: value})
    };

    translate = (word, origin_lang, target_lang) => {
        $.get(this.state.backtranslations ? '/translate/with_backtrans' : '/translate', {
            word: word,
            origin_lang: origin_lang,
            target_lang: target_lang
        }, (data) => {
            this.setState({translation_result: data['translation_result']});
            this.updateOutput();
        });
    };

    render() {
        return (
            <div>
                <Row style={{height: '70px'}}/>
                <Row>
                    <Col span={6}>
                        <Search
                            placeholder={"Input " + this.state.origin_lang + " word"}
                            enterButton="Translate"
                            onSearch={value => this.translateClick(value)}
                            theme="dark"
                        />
                    </Col>
                    <Col span={1}/>
                    <Col span={4}>
                        <span>Backtranslations (can be very slow) </span><Switch
                        onChange={this.onChangeBacktransSwitch}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <Card title={this.state.input_word} bordered={false}>
                            {
                                this.state.translation_result.map((val, key) =>
                                    this.state.backtranslations ?
                                        <Row key={key}>
                                            <Col span={5}>
                                                <p>{val[0]}</p>
                                            </Col>
                                            <Col span={19}>
                                                <p>{val[1]}</p>
                                            </Col>
                                        </Row> :
                                        <Row key={key}>
                                            <Col span={5}>
                                                <p>{val}</p>
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