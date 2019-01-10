import React, {Component} from 'react'
import {connect} from 'react-redux'
import SubforumListElement from "./subforum_li";
import PostListElement from "./post_li";
import {Link} from 'react-router-dom';
import { List } from 'antd';

class Forum extends Component {

    constructor(props) {
        super(props);
        this.state = {id: null};
        this.compileComponent();
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    componentDidUpdate() {
        if (this.state.id !== this.props.match.params.discussion_id) {
            this.compileComponent();
            this.setState({id: this.props.match.params.discussion_id});
        }
    }

    compileComponent() {
        $.get('/discussion/' + this.props.match.params.discussion_id, (data) => {
            //this.setState({content: data});
            let content = data;
            let sub_list = [];
            let post_list = [];
            content.posts.map((elem, key) => {
                post_list.push(<PostListElement id={elem.id} sub_id={elem.subforum_id} title={elem.title}
                                                key={'post_' + elem.id}/>)
            });
            content.subs.map((elem, key) => {
                post_list.push(<SubforumListElement id={elem.id} title={elem.title} subs_in={elem.subs_in}
                                                    posts_in={elem.posts_in} key={'sub_' + elem.id}/>)
            });
            this.setState({subs: sub_list, posts: post_list, path: data.path});
        });
    }

    render() {
        if (this.state.path !== null && this.state.path !== undefined) {
            return (
                <div className="container" key={this.props.match.params.discussion_id}>
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <ol className="bg-dark breadcrumb path">
                                {this.state.path.map((elem, key) =>
                                    <li className='breadcrumb-item text-light' key={key}>
                                        <Link to={'/discussion' + '/' + elem.id + '/'}>{elem.title}</Link>
                                    </li>)
                                }
                            </ol>
                            <ul className="list-group list-group-flush posts_list bg-dark">
                                {this.state.posts}
                            </ul>
                            <ul className="list-group list-group-flush subforums_list bg-dark">
                                {this.state.subs}
                            </ul>
                        </div>
                    </div>
                </div>

            )
        } else {
            return (<div/>);
        }
        //<div dangerouslySetInnerHTML={{ __html: this.state.navbar }} />
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Forum);