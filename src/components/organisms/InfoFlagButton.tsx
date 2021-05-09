import { FlagButton } from "../molecules/FlagButtons";
import { useModalState } from "../molecules/Modal";
import InfoModal from "./InfoModal";

const InfoFlagButton = () => {
  const { open, modalProps } = useModalState();
  return (
    <>
      <FlagButton icon="info" title="About" onClick={open} />
      <InfoModal {...modalProps} />
    </>
  );
};

export default InfoFlagButton;
