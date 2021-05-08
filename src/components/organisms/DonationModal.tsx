import Modal, { IModalProps } from "../molecules/Modal";

const DonationModal = (props: IModalProps) => (
  <Modal {...props}>
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
);

export default DonationModal;
