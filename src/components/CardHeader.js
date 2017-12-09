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
                <a className="info-icon has-text-primary" onClick={() => modal((
                    <div className="message is-info donation-info">
                        <div className="message-body">
                            <div className="content">
                                <p><strong>What is this?</strong></p>
                                <p>crypto-value.info is a website where you can track current value of cryptocurrency you own in a simple and practical way.</p>
                                <strong>Are my data safe?</strong>
                                <ul>
                                    <li>All data about your holdings is stored <strong>IN YOUR BROWSER</strong> using local storage technology.</li>
                                    <li>Your data <strong>IS NOT</strong> stored on our servers. We <strong>DO NOT</strong> know how much you have, we don’t care.</li>
                                    <li>Use this website at your own risk.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}>
                    <span className="fas fa-info-circle" />
                </a>
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
