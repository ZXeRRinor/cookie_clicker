import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {reg_form: null, modal: false};
        this.getForm();
    }

    store = () => {
        return (this.props.store)
    };
    dispatch = (type, payload) => {
        this.props.dispatch(type, payload)
    };

    getForm() {
        $.get('/get_comp/login_form', (data) => {
            this.setState({reg_form: data});
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    render() {
        if (this.state.reg_form) {
            return (
                <div className="bg-dark">
                    <Button color="primary" onClick={this.toggle}>Login</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="bg-dark">
                        <ModalHeader toggle={this.toggle} className="bg-dark">Login</ModalHeader>
                        <ModalBody className="bg-dark">
                            <div dangerouslySetInnerHTML={{__html: this.state.reg_form}}/>
                        </ModalBody>
                    </Modal>
                </div>
            );
        } else {
            return (<div/>);
        }
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(LoginModal);