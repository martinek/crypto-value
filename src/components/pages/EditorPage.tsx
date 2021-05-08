import { useEffect } from "react";
import { useLocation } from "react-router";
import { IUserItem, useAppContext } from "../AppContext";
import ItemForm from "../molecules/ItemForm";
import { useModalState } from "../molecules/Modal";
import BackupInfoModal from "../organisms/BackupInfoModal";
import CardHeader from "../organisms/CardHeader";
import Editor from "../organisms/Editor";

const EditorPage = () => {
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
      <div className="card editor-card">
        <CardHeader back={true}>
          <a className="card-header-icon has-text-primary" onClick={open}>
            <span className="icon">
              <span className="fas fa-download" />
            </span>
          </a>
        </CardHeader>
        <div className="card-content">
          <Editor userData={userData} onChange={setUserData} />
        </div>
      </div>
      <BackupInfoModal {...modalProps} />
    </>
  );
};

export default EditorPage;
