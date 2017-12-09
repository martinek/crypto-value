import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import Modal from 'components/Modal';

const modal = (children) => {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
    };
    const props = _.assign({ isActive: true }, { children, onBackdropClick: cleanup });
    ReactDOM.render(<Modal {...props} />, wrapper);
};

window.modal = modal;

export default modal;
