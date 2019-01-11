import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Navbar from './navbar';
import Forum from './forum/forum';
import Dictionary from "./dictionary/dictionary";
import {Row, Col} from 'antd';

const initialState = {navbar_state: 'collapsed'};
let mainReducer = (store = initialState, action) => {
    let type = action.type;
    let payload = action.payload;
    switch (type) {
        case ('set_curr_user'): {
            return ({
                ...store,
                curr_user: payload
            });
        }
        case ('set_navbar_state'): {
            return ({
                ...store,
                navbar_state: payload
            });
        }

    }
    return store;
};

let store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.navbarSizeToState();
        store.subscribe(this.navbarSizeToState);
    }

    navbarSizeToState = () => {
        this.setState({navbar_size: store.getState().navbar_state === 'collapsed' ? 2 : 4});
    };

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Row>
                            <Col span={this.state.navbar_size}>
                                <Route component={Navbar}/>
                            </Col>
                            <Col span={24 - this.state.navbar_size}>
                                <Route path="/dictionary" component={Dictionary}/>
                                <Route path="/discussion/:discussion_id" component={Forum}/>
                            </Col>
                        </Row>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default Index;