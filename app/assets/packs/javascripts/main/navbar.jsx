import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {navbar: null};
    }

    componentDidMount() {
        $.get('/navbar', (data) => {
            console.log(data);
            this.setState({permissions: data['permissions']})
        });
    }

    render() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <Link to='/' className="navbar-brand">Dictionary</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/forum" className="nav-link">Forum</Link>
                        </li>
                        {
                            // % if current_user && current_user.permissions>= ADMINPERMS %>
                            //
                            //<li className="nav-item"><
                            //     %= link_to 'Administrating', {controller: 'admin', action: 'admin_panel'}, class: 'nav-link' %>
                            //</li>
                            //<
                            //% end %>
                        }
                    </ul>
                    <ul className="navbar-nav right_block">
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
                    </ul>
                </div>
            </nav>
        );

    }
}

export default Navbar;