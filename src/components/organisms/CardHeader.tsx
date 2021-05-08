import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useModalState } from "../molecules/Modal";
import InfoModal from "./InfoModal";

interface IProps {
  children?: React.ReactNode;
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
          <span className="fas fa-info-circle" />
        </a>
      </p>
      {children}
      <InfoModal {...modalProps} />
    </header>
  );
};

CardHeader.propTypes = {
  back: PropTypes.bool,
  children: PropTypes.node,
};

export default CardHeader;
