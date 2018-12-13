import React, {Component} from 'react'
import {connect} from 'react-redux'

class Forum extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $.get('/forum/0', (data) => {
           console.log(data);
        });
    }

    render() {
        return (
            <div>Kek!</div>
            /*<div dangerouslySetInnerHTML={{ __html: this.state.navbar }} />*/
        )
    }
}

export default Forum