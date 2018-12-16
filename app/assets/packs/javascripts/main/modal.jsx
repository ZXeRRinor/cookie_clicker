import React, {Component} from 'react'
import {connect} from 'react-redux'

class Modal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary modal_btn" data-toggle="modal"
                        data-target={'#' + this.props.id + 'Modal'}>
                    {this.props.open}
                </button>
                <div className="modal fade" id={'#' + this.props.id + 'Modal'} tabIndex="-1" role="dialog"
                     aria-labelledby={'#' + this.props.id + 'Modal'} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={'#' + this.props.id + 'ModalLabel'}>
                                    {this.props.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal_content">
                                {this.props.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;