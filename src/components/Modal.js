import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({isActive, isCard = false, onBackdropClick, children}) => (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={onBackdropClick}/>
        <div className={`modal-${isCard ? 'card' : 'content'}`}>
            {children}
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={onBackdropClick}/>
    </div>
);

Modal.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool,
    isCard: PropTypes.bool,
    onBackdropClick: PropTypes.func,
};

export default Modal;
