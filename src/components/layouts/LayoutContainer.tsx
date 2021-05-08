import { useModalState } from "../molecules/Modal";
import DonationModal from "../organisms/DonationModal";

interface IProps {
  children?: React.ReactNode;
}

const LayoutContainer = ({ children }: IProps) => {
  const { open, modalProps } = useModalState();
  return (
    <section className="hero is-primary is-fullheight is-bold">
      <div className="hero-body">
        <div className="container">{children}</div>
      </div>
      <div className="hero-foot">
        <footer className="footer">
          <div className="container has-text-centered">
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
      </div>
      <DonationModal {...modalProps} />
    </section>
  );
};

export default LayoutContainer;
