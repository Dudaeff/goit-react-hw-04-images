import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
    useEffect(() => {
        const onKeyClose = (e) => e.code === 'Escape' && onClose();
        window.addEventListener('keydown', onKeyClose)
    
        return () => {
            window.removeEventListener('keydown', onKeyClose)
        }
    }, [onClose]);
    
    const handleOverlayClick = e => e.currentTarget === e.target && onClose();

    return (
        createPortal(
            <Overlay onClick={handleOverlayClick}>
                <ModalWindow>
                    {children}
                </ModalWindow>
            </Overlay>, modalRoot)
    );
};
    
export { Modal };

Modal.propTypes = {
    children: PropTypes.object,
};