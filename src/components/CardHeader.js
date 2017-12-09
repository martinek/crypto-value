import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardHeader = ({children, back}) => {
    const title = PAGE_TITLE;
    return (
        <header className="card-header">
            <p className="card-header-title">
                {back ? 
                    <Link className="has-text-primary" to="/">
                        <span className="fas fa-chevron-left fa-lg" />
                        {title}
                    </Link>
                    : <span>{title}</span>
                }
            </p>
            {children}
        </header>
    );
};

CardHeader.propTypes = {
    back: PropTypes.bool,
    children: PropTypes.node,
};

export default CardHeader;
