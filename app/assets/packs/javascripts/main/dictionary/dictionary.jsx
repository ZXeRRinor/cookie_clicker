import React, {Component} from 'react'
import {connect} from 'react-redux'

class Dictionary extends Component {

    constructor(props) {
        super(props);
        this.state = {changes: 0};
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    inputChange = (event) => {
        let text = event.target.value;
        this.setState({in_text: text});
        //this.setState({changes: this.state.changes + 1})
    };

    translate = (word, origin_lang, target_lang) => {
        $.get('/translate/', {word: word, origin_lang: origin_lang, target_lang: target_lang}, (data) => {
            this.setState({translation_result: data['translation_result']});
        });
    };

    render() {
        this.translate('привет', 'mari')
        return (
            <div>
                <input onChange={this.inputChange} className='translate_input'/>
            </div>
        )
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Dictionary);