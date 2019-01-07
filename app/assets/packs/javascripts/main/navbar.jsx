import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
//import RegisterModal from "./modals/register_modal";
//import LoginModal from "./modals/login_modal";
import {Menu, Icon, Button} from 'antd';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {navbar: null, current_user: null, permissions: 0, collapsed: 'dict'};
    }

    componentDidMount() {
        $.get('/navbar', (data) => {
            this.setState({permissions: data.permissions, current_user: data.current_user})
        });
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div style={{width: 256}}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                </Button>
                <Menu
                    defaultSelectedKeys={['dictionary']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="home">
                        <Link to="/" className="nav-link">
                            <Icon type="home"/>
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="dictionary">
                        <Link to="" className="nav-link">
                            <Icon type="interation"/>
                            <span>Dictionary</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="notifications">
                        <Link to="" className="nav-link">
                            <Icon type="bell"/>
                            <span>Notifications</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="my_discussions">
                        <Link to="" className="nav-link">
                            <Icon type="exclamation-circle"/>
                            <span>My discussions</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="messages">
                        <Link to="" className="nav-link">
                            <Icon type="message"/>
                            <span>Messages</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="settings">
                        <Link to="" className="nav-link">
                            <Icon type="setting"/>
                            <span>Settings</span>
                        </Link>
                    </Menu.Item>
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