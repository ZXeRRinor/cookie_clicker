import React, {Component} from 'react'
import {connect} from 'react-redux'
import SubforumListElement from "./subforum_li";
import {Provider} from 'react-redux';
import PostListElement from "./post_li";

class Forum extends Component {

    constructor(props) {
        super(props);
        this.state = {content: null};
        //console.log('sub_id: ' + this.props.params.sub_id);
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    componentDidMount() {
        $.get('/forum/0', (data) => {
            this.setState({content: data});
            this.compileComponent();
        });
    }

    compileComponent() {
        let sub_list = [];
        let post_list = [];
        this.state.content.posts.map((elem, key) => {
            post_list.push(<PostListElement id={elem.id} sub_id={elem.subforum_id} title={elem.title}
                                            key={'post_' + elem.id}/>)
        });
        this.state.content.subs.map((elem, key) => {
            post_list.push(<SubforumListElement id={elem.id} title={elem.title} subs_in={elem.subs_in}
                                                posts_in={elem.posts_in} key={'sub_' + elem.id}/>)
        });
        this.setState({subs: sub_list, posts: post_list});
    }

    render() {
        if (this.state.content !== null) {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <ul className="list-group list-group-flush posts_list">
                                {this.state.posts}
                            </ul>
                            <ul className="list-group list-group-flush subforums_list">
                                {this.state.subs}
                            </ul>
                        </div>
                    </div>
                </div>
                /*<div dangerouslySetInnerHTML={{ __html: this.state.navbar }} />*/
            )
        } else {
            return (<div/>);
        }
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Forum);