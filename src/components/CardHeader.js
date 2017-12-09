import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardHeader = ({children}) => {
    return (
        <header className="card-header">
            <p className="card-header-title">
                <Link to="/">CryptoValue</Link>
            </p>
            {children}
        </header>
    );
};

CardHeader.propTypes = {
    children: PropTypes.node,
};

export default CardHeader;
