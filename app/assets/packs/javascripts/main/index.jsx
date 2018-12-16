import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Navbar from './navbar';
import Forum from './forum';
import RegisterModal from "./register_modal";

const initialState = {};
let mainReducer = (store = initialState, action) => {
    console.log(action.type + ': ' + action.payload);
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
                    <Route component={Navbar}>
                        <Route path='/forum' component={Forum}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default Index;