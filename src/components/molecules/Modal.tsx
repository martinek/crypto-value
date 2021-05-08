import { useMemo, useState } from "react";
import cx from "classnames";

export interface IModalProps {
  isActive: boolean;
  isCard?: boolean;
  onBackdropClick?: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isActive, isCard = false, onBackdropClick, children }: IModalProps) => (
  <div className={cx("modal", { "is-active": isActive })}>
    <div className="modal-background" onClick={onBackdropClick} />
    <div className={cx({ "modal-card": isCard, "modal-content": !isCard })}>{children}</div>
    <button className="modal-close is-large" aria-label="close" onClick={onBackdropClick} />
  </div>
);

export const useModalState = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const res = useMemo(
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
      modalProps: { isActive: open, onBackdropClick: () => setOpen(false) },
    }),
    [open]
  );

  return res;
};

export default Modal;
