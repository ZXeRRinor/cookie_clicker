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
        this.setState({input_text: text});
    };

    translateClick = () => {
        this.translate(this.state.input_text, 'rus', 'mari');
        console.log(this.state.translation_result);
        document.querySelector('.translate_output').value = this.state.translation_result;
    };

    translate = (word, origin_lang, target_lang) => {
        $.get('/translate/', {word: word, origin_lang: origin_lang, target_lang: target_lang}, (data) => {
            this.setState({translation_result: data['translation_result']});
        });
    };

    render() {
        return (
            <div>
                <input onChange={this.inputChange} className='translate_input'/>
                <input className='translate_output' size='50x50'/>
                <button onClick={this.translateClick}>Translate</button>
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