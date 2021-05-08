import Modal, { useModalState } from "../molecules/Modal";

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
      <Modal {...modalProps}>
        <div className="message is-info donation-info has-text-centered">
          <div className="message-body">
            <img src="1457PgXio7wV8vQmD1dxpBLNGUaAfDjSUV.png" alt="1457PgXio7wV8vQmD1dxpBLNGUaAfDjSUV" />
            <p className="donation-address">
              <span className="fab fa-bitcoin" />
              <span>1457PgXio7wV8vQmD1dxpBLNGUaAfDjSUV</span>
            </p>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default LayoutContainer;
