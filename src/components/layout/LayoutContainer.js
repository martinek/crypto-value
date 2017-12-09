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
                <div className="container">
                    <div className="content has-text-centered">
                        <p>©&nbsp;<a href="https://www.freevision.sk" target="new">freevision.sk</a>&nbsp;2017 | Market&nbsp;data&nbsp;by&nbsp;<a href="https://www.cryptocompare.com/" target="new">cryptocompare.com</a></p>
                    </div>
                </div>
            </footer>     
        </div>
    </section>
);

LayoutContainer.propTypes = {
    children: PropTypes.element,
};

export default LayoutContainer;
