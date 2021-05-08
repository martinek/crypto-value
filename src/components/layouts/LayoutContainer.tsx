import { useModalState } from "../molecules/Modal";
import DonationModal from "../organisms/DonationModal";

interface IProps {
  children?: React.ReactNode;
}

const LayoutContainer = ({ children }: IProps) => {
  const { open, modalProps } = useModalState();
  return (
    <div className="layout-container">
      <div className="layout-container__body">
        <div className="container">{children}</div>
      </div>
      <footer className="layout-container__footer footer">
        <div className="container has-text-centered has-text-white">
          <p className="credits">
            ©&nbsp;
            <a href="https://www.freevision.sk" target="new">
              freevision.sk
            </a>
            &nbsp;2017 | Created by{" "}
            <a href="https://www.freevision.sk" target="new">
              freevision.sk
            </a>{" "}
            | Market&nbsp;data&nbsp;by&nbsp;
            <a href="https://www.cryptocompare.com/" target="new">
              cryptocompare.com
            </a>
          </p>
          <p className="version">Version: {process.env.REACT_APP_GIT_SHA}</p>
          <a className="button is-primary is-inverted is-outlined donation" onClick={open}>
            Donate BTC
          </a>
        </div>
      </footer>
      <DonationModal {...modalProps} />
    </div>
  );
};

export default LayoutContainer;
