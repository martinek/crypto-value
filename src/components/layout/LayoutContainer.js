import React from 'react';
import PropTypes from 'prop-types';

const LayoutContainer = ({children}) => (
    <section className="hero is-primary is-fullheight is-bold">
        <div className="hero-body">
            <div className="container">
                {children}
            </div>
        </div>
        <div className="hero-foot">
            <footer className="footer">
                <div className="container has-text-centered">
                    <p className="credits">
                            ©&nbsp;<a href="https://www.freevision.sk" target="new">freevision.sk</a>&nbsp;2017 | 
                            Created by <a href="https://www.freevision.sk" target="new">freevision.sk</a> | 
                            Market&nbsp;data&nbsp;by&nbsp;<a href="https://www.cryptocompare.com/" target="new">cryptocompare.com</a>
                    </p>
                    <p className="version">Version: {BUILD.VERSION}</p>
                    <a className="button is-primary is-inverted is-outlined donation" onClick={() => modal(
                        <div className="message is-info donation-info has-text-centered">
                            <div className="message-body">
                                <img src="1457PgXio7wV8vQmD1dxpBLNGUaAfDjSUV.png" />
                                <p className="donation-address">
                                    <span className="fab fa-bitcoin" />
                                    <span>1457PgXio7wV8vQmD1dxpBLNGUaAfDjSUV</span>
                                </p>
                            </div>
                        </div>
                    )}>Donate BTC</a>
                </div>
            </footer>     
        </div>
    </section>
);

LayoutContainer.propTypes = {
    children: PropTypes.element,
};

export default LayoutContainer;
