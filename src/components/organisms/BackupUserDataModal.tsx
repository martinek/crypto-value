import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { deserializeUserData, serializeUserData } from "../../lib/dataSource";
import { useAppContext } from "../AppContext";
import ErrorDisplay from "../molecules/ErrorDisplay";
import Message from "../molecules/Message";
import Modal, { IModalProps } from "../molecules/Modal";

const BackupUserDataModal = (props: IModalProps) => {
  const { userData, setUserData } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const hash = location.hash.substr(1);

  const [data, setData] = useState("");
  const [error, setError] = useState<Error>();
  const changed = data !== serializeUserData(userData);

  useEffect(() => {
    if (hash) {
      setData(atob(hash));
    } else {
      setData(serializeUserData(userData));
    }
  }, [hash]);

  const handleImport = () => {
    try {
      const newUserData = deserializeUserData(data);
      console.log("Import user data", newUserData);
      setUserData(newUserData);
      navigate(location.pathname, { replace: true });
    } catch (error) {
      setError(new Error(`Could not deserialize data\n${(error as any)?.message || error}`));
    }
  };

  const importUrl = `${window.location.href.split("#")[0]}#${btoa(serializeUserData(userData))}`;

  return (
    <Modal {...props}>
      <Message className="backup-info">
        <div className="content">
          <p>
            These are your serialized settings. You can backup them if you ever want to use same setup in another
            browser. Just open this dialog in new browser and paste these settings in.
          </p>
          <textarea
            className="textarea"
            value={data}
            onChange={(e) => {
              setError(undefined);
              setData(e.target.value);
            }}
          />
          <ErrorDisplay error={error} className="mt-2 mb-0" />
          <button className="button is-primary is-fullwidth mt-2" disabled={!changed} onClick={handleImport}>
            Import user data
          </button>
          <br />
          <p>
            You can also use following link to set these settings. Be careful though, it will override any previous
            settings set in the browser.
          </p>
          <p>
            <a className="backup-link" href={importUrl}>
              {importUrl}
            </a>
          </p>
        </div>
      </Message>
    </Modal>
  );
};

export default BackupUserDataModal;
