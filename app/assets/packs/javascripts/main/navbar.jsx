import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import RegisterModal from "./modals/register_modal";
import LoginModal from "./modals/login_modal";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {navbar: null, current_user: null, permissions: 0};
    }


    componentDidMount() {
        $.get('/navbar', (data) => {
            this.setState({permissions: data.permissions, current_user: data.current_user})
        });
    }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg bg-dark">
                    <Link to='/' className="navbar-brand">Dictionary</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/forum/0/" className="nav-link">Forum</Link>
                            </li>
                            {
                                this.state.permissions >= 2 ?
                                    <li className="nav-item">
                                        <Link to="/admin/panel/" className="nav-link">Administrating</Link>
                                    </li>
                                    : ''
                            }
                        </ul>
                        {
                            this.state.current_user !== null ?
                                <ul className="navbar-nav right_block row">
                                    <li>
                                        <RegisterModal/>
                                    </li>
                                    <span className="col-1"/>
                                    <li>
                                        <LoginModal/>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav right_block"/>
                        }
                        {
                            //<
                            //% if current_user %>
                            //<
                            //%= render 'partials/dropdown', open_btn:
                            //current_user.email, items: {:Profile => {controller: 'users', action: 'profile'}}, last_item_text: 'Logout', last_item_path: {controller: 'sessions', action: 'logout'} %>
                            //<
                            //% else %>
                            //<div>
                            //    <
                            //    %= render 'partials/login_modal' %>
                            //    <
                            //    %= render 'partials/register_modal' %>
                            //</div>
                            // <
                            // % end %>
                        }
                    </div>
                </nav>
            </div>
        );

    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Navbar);