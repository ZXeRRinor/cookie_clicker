import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
//import RegisterModal from "./modals/register_modal";
//import LoginModal from "./modals/login_modal";
import {Button, Icon, Menu} from 'antd';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {navbar: null, current_user: null, permissions: 0, collapsed: true};
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    componentDidMount() {
        $.get('/navbar', (data) => {
            this.setState({permissions: data.permissions, current_user: data.current_user})
        });
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
        this.dispatch('set_navbar_state', this.state.collapsed ? 'not_collapsed' : 'collapsed');
    };

    showLoginModal = () => {
        this.dispatch('set_login_modal_visibility', true)
    };

    showRegisterModal = () => {
        this.dispatch('set_register_modal_visibility', true)
    };

    render() {
        return (
            <div style={{width: 256}}>
                <Menu
                    defaultSelectedKeys={['home']}
                    mode="inline"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="home">
                        <Link to="/" className="nav-link">
                            <Icon type="home"/>
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="dictionary">
                        <Link to="/dictionary" className="nav-link">
                            <Icon type="interation"/>
                            <span>Dictionary</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="notifications">
                        <Link to="/notifications" className="nav-link">
                            <Icon type="bell"/>
                            <span>Notifications</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="my_discussions">
                        <Link to="/discussion/0" className="nav-link">
                            <Icon type="exclamation-circle"/>
                            <span>My discussions</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="messages">
                        <Link to="/messages" className="nav-link">
                            <Icon type="message"/>
                            <span>Messages</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="settings">
                        <Link to="/settings" className="nav-link">
                            <Icon type="setting"/>
                            <span>Settings</span>
                        </Link>
                    </Menu.Item>
                    {this.store().curr_user === null ?
                        <Menu.Item key="login">
                            <a onClick={this.showLoginModal}>
                                <Icon type="login"/>
                                <span>Login</span>
                            </a>
                        </Menu.Item>
                        : ''
                    }
                    {this.store().curr_user === null ?
                        <Menu.Item key="register">
                            <a onClick={this.showRegisterModal}>
                                <Icon type="plus-circle"/>
                                <span>Register</span>
                            </a>
                        </Menu.Item>
                        : ''
                    }
                    {this.state.permissions >= 2 ?
                        <Menu.Item key="administrating">
                            <Link to="/admin/panel/" className="nav-link">
                                <Icon type="code"/>
                                <span>Administrating</span>
                            </Link>
                        </Menu.Item>
                        : ''
                    }
                </Menu>
                <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                </Button>
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