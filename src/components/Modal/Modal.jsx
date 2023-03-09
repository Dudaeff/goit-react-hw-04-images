import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onKeyClose)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyClose)
    };

    onKeyClose = (e) => e.code === 'Escape' && this.props.onClose();

    handleOverlayClick = e => e.currentTarget === e.target && this.props.onClose();

    render() {
        const { children } = this.props;

        return (
            createPortal(
            <Overlay onClick={this.handleOverlayClick}>
                <ModalWindow>
                    {children}
                </ModalWindow>
            </Overlay>, modalRoot)
        );
    };
};
    
export { Modal };

Modal.propTypes = {
    children: PropTypes.object,
};