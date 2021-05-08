import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Modal, { useModalState } from "./Modal";

interface IProps {
  children: React.ReactNode;
  back?: boolean;
}

const CardHeader = ({ children, back }: IProps) => {
  const { open, modalProps } = useModalState();

  const title = "crypto-value.info";
  return (
    <header className="card-header">
      <p className="card-header-title">
        {back ? (
          <Link className="has-text-primary" to="/">
            <span className="fas fa-chevron-left fa-lg" />
            {title}
          </Link>
        ) : (
          <span>{title}</span>
        )}
        <a className="info-icon has-text-primary" onClick={open}>
          <span className="icon">
            <span className="fas fa-info-circle" />
          </span>
        </a>
      </p>
      {children}
      <Modal {...modalProps}>
        <div className="message is-info donation-info">
          <div className="message-body">
            <div className="content">
              <p>
                <strong>What is this?</strong>
              </p>
              <p>
                crypto-value.info is a website where you can track current value of cryptocurrency you own in a simple
                and practical way.
              </p>
              <strong>Is my data safe?</strong>
              <ul>
                <li>
                  All data about your holdings is stored <strong>IN YOUR BROWSER</strong> using local storage
                  technology.
                </li>
                <li>
                  Your data <strong>IS NOT</strong> stored on our servers. We <strong>DO NOT</strong> know how much you
                  have, we don’t care.
                </li>
                <li>Use this website at your own risk.</li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </header>
  );
};

CardHeader.propTypes = {
  back: PropTypes.bool,
  children: PropTypes.node,
};

export default CardHeader;
