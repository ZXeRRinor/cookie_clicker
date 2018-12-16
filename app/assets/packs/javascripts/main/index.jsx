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

let store = createStore(mainReducer);

class Index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Navbar/>
                    </div>
                </Router>
            </Provider>
        );
        //<div className="routes">
        //    <Route exact path='/forum' component={Forum}/>
        //</div>
    }
}

export default Index;