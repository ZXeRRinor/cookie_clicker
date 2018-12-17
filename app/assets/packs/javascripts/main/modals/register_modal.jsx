import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class RegisterModal extends Component {

    constructor(props) {
        super(props);
        this.state = {reg_form: null, modal: false};
        this.getForm();
    }

    getForm() {
        $.get('/get_comp/register_form', (data) => {
            this.setState({reg_form: data});
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        return (
            <div className="bg-dark">
                <Button color="primary" onClick={this.toggle}>Register</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="bg-dark">
                    <ModalHeader toggle={this.toggle} className="bg-dark">Register</ModalHeader>
                    <ModalBody className="bg-dark">
                        <div dangerouslySetInnerHTML={{__html: this.state.reg_form}}/>
                    </ModalBody>
                </Modal>
            </div>
        );
        //<div dangerouslySetInnerHTML={{__html: this.state.reg_form}}/>
    }
}

export default RegisterModal;