import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Navbar from './navbar';
import Forum from './forum'

class Index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Navbar/>
                    <Route exact path='/forum' component={Forum}/>
                </div>
            </Router>
        );
    }
}

export default Index;