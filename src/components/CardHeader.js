import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardHeader = ({children, back}) => {
    return (
        <header className="card-header">
            <p className="card-header-title">
                {back ? 
                    <Link className="has-text-primary" to="/">
                        <span className="fas fa-chevron-left fa-lg" />
                        CryptoValue
                    </Link>
                    : <span>CryptoValue</span>
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
