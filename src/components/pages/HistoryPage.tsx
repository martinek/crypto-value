import { useState } from "react";
import { IDataHistoryEntry } from "../../lib/DataHistoryDatabase";
import { useAppContext } from "../AppContext";
import BackFlagButton from "../molecules/BackFlagButton";
import FlagButtons, { FlagButton } from "../molecules/FlagButtons";
import HistoryPagination from "../molecules/HistoryPagination";
import Message from "../molecules/Message";
import { useModalState } from "../molecules/Modal";
import BackupHistoryModal from "../organisms/BackupHistoryModal";
import CardHeader from "../organisms/CardHeader";
import HistoryEntryView from "../organisms/HistoryEntryView";

const HistoryPage = () => {
  const {
    history: { isSupported, history, removeEntry },
  } = useAppContext();
  const [iCurrentEntryIndex, setCurrentEntryIndex] = useState(0);
  const { modalProps, open } = useModalState();

  // cap entry index to range of history
  const currentEntryIndex = Math.max(0, Math.min(iCurrentEntryIndex, history.length - 1));
  const currentEntry: IDataHistoryEntry | undefined = history[currentEntryIndex];

  const confirmDelete = (entry: IDataHistoryEntry) => {
    if (window.confirm("Are you sure you want to delete this entry? Entry data will be lost forever!")) {
      removeEntry(entry);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="card main-card">
      <CardHeader />
      <div className="card-content">
        <FlagButtons>
          <BackFlagButton />
          <FlagButton icon="download" title="Backup history data" onClick={open} />
        </FlagButtons>
        {history.length === 0 && (
          <Message className="has-text-centered">
            There are no entries in history.
            <br />
            Try saving an entry first.
          </Message>
        )}
        {currentEntry && (
          <>
            <HistoryPagination
              current={currentEntryIndex}
              length={history.length}
              onChange={setCurrentEntryIndex}
              currentEntry={currentEntry}
            />
            <hr />
            <HistoryEntryView entry={currentEntry} onDelete={confirmDelete} />
          </>
        )}
      </div>
      <BackupHistoryModal {...modalProps} />
    </div>
  );
};

export default HistoryPage;
