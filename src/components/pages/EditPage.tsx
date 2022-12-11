import { useEffect } from "react";
import { useLocation } from "react-router";
import { useAppContext } from "../AppContext";
import BackFlagButton from "../molecules/BackFlagButton";
import FlagButtons, { FlagButton } from "../molecules/FlagButtons";
import { useModalState } from "../molecules/Modal";
import BackupUserDataModal from "../organisms/BackupUserDataModal";
import CardHeader from "../organisms/CardHeader";
import UserDataEditor from "../organisms/UserDataEditor";

const EditPage = () => {
  const { userData, setUserData } = useAppContext();
  const { open, modalProps } = useModalState();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      open();
    }
  }, []);

  return (
    <>
      <div className="card main-card">
        <CardHeader />
        <div className="card-content">
          <FlagButtons>
            <BackFlagButton />
            <FlagButton icon="download" title="Backup user data" onClick={open} />
          </FlagButtons>

          <UserDataEditor userData={userData} onChange={setUserData} />
        </div>
      </div>
      <BackupUserDataModal {...modalProps} />
    </>
  );
};

export default EditPage;
