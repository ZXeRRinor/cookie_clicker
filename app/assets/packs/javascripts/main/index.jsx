import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from './navbar';
import Forum from './forum'

class Index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Router>
                    <Route exact path='/forum' component={Forum}/>
                </Router>
            </div>
        );
    }
}

export default Index;