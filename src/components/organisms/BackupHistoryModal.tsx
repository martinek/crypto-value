import { useEffect, useState } from "react";
import { deserializeDataHistory, serializeDataHistory } from "../../lib/dataHistorySerializer";
import { useAppContext } from "../AppContext";
import ErrorDisplay from "../molecules/ErrorDisplay";
import Message from "../molecules/Message";
import Modal, { IModalProps } from "../molecules/Modal";

const BackupHistoryModal = (props: IModalProps) => {
  const {
    history: { history, importEntries },
  } = useAppContext();

  const [data, setData] = useState("");
  const [error, setError] = useState<Error>();
  const changed = data !== serializeDataHistory(history);

  useEffect(() => {
    setData(serializeDataHistory(history));
  }, [history]);

  const handleImport = () => {
    try {
      const newHistory = deserializeDataHistory(data);
      console.log("Import history", newHistory);
      importEntries(newHistory);
    } catch (error) {
      setError(new Error(`Could not deserialize data\n${(error as any)?.message || error}`));
    }
  };

  return (
    <Modal {...props}>
      <Message className="backup-info">
        <div className="content">
          <p>
            This is your history in JSON format. You can backup it if you ever want to move this history to another
            browser. Just open this dialog in new browser and paste this JSON in.
          </p>
          <textarea
            className="textarea is-family-monospace"
            value={data}
            onChange={(e) => {
              setError(undefined);
              setData(e.target.value);
            }}
          />
          <ErrorDisplay error={error} className="mt-2 mb-0" />
          <button className="button is-primary is-fullwidth mt-2" disabled={!changed} onClick={handleImport}>
            Import history
          </button>
        </div>
      </Message>
    </Modal>
  );
};

export default BackupHistoryModal;
