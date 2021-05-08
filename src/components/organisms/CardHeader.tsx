import React from "react";
import { Link } from "react-router-dom";
import { useModalState } from "../molecules/Modal";
import InfoModal from "./InfoModal";

interface IProps {
  children?: React.ReactNode;
  back?: string;
}

const CardHeader = ({ children, back }: IProps) => {
  const { open, modalProps } = useModalState();

  const title = "crypto-value.info";
  return (
    <header className="card-header">
      <p className="card-header-title">
        {back ? (
          <Link className="has-text-primary" to={back}>
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

export default CardHeader;
