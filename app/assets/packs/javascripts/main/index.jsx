import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Navbar from './navbar';
import Forum from './forum/forum';
import Dictionary from "./dictionary/dictionary";

const initialState = {};
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

    }
    return store;
};

let store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route component={Navbar}/>
                        <Route component={Dictionary}/>
                        <Route path="/forum/:sub_id" component={Forum}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default Index;