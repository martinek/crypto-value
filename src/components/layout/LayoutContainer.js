import React from 'react';
import PropTypes from 'prop-types';

const LayoutContainer = ({children}) => (
    <section className="hero is-primary is-fullheight is-bold">
        <div className="hero-body">
            <div className="container">
                {children}
            </div>
        </div>
    </section>
);

LayoutContainer.propTypes = {
    children: PropTypes.element,
};

export default LayoutContainer;
