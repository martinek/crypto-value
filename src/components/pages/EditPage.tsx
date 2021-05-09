import { useEffect } from "react";
import { useLocation } from "react-router";
import { useAppContext } from "../AppContext";
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
        <CardHeader back="/">
          <a className="card-header-icon has-text-primary" onClick={open}>
            <span className="icon">
              <span className="fas fa-download" />
            </span>
          </a>
        </CardHeader>
        <div className="card-content">
          <UserDataEditor userData={userData} onChange={setUserData} />
        </div>
      </div>
      <BackupUserDataModal {...modalProps} />
    </>
  );
};

export default EditPage;
