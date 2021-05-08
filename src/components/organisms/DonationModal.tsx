import Message from "../molecules/Message";
import Modal, { IModalProps } from "../molecules/Modal";

const DonationModal = (props: IModalProps) => (
  <Modal {...props}>
    <Message className="donation-info has-text-centered">
      <img src="1457PgXio7wV8vQmD1dxpBLNGUaAfDjSUV.png" alt="1457PgXio7wV8vQmD1dxpBLNGUaAfDjSUV" />
      <p className="donation-address">
        <span className="fab fa-bitcoin" />
        <span>1457PgXio7wV8vQmD1dxpBLNGUaAfDjSUV</span>
      </p>
    </Message>
  </Modal>
);

export default DonationModal;
