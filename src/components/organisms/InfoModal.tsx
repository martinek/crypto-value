import Modal, { IModalProps } from "../molecules/Modal";

const InfoModal = (props: IModalProps) => (
  <Modal {...props}>
    <div className="message is-info donation-info">
      <div className="message-body">
        <div className="content">
          <p>
            <strong>What is this?</strong>
          </p>
          <p>
            crypto-value.info is a website where you can track current value of cryptocurrency you own in a simple and
            practical way.
          </p>
          <strong>Is my data safe?</strong>
          <ul>
            <li>
              All data about your holdings is stored <strong>IN YOUR BROWSER</strong> using local storage technology.
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
);

export default InfoModal;
