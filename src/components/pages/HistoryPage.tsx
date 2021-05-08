import { useState } from "react";
import { Link } from "react-router-dom";
import { IDataHistoryEntry } from "../../lib/DataHistoryDatabase";
import { buildViewData, formatDate } from "../../lib/helpers";
import useDataHistory from "../../lib/useDataHistory";
import CalculatorView from "../molecules/CalculatorView";
import CardHeader from "../organisms/CardHeader";

const HistoryPage = () => {
  const { isSupported, history, removeEntry } = useDataHistory();
  const [iCurrentEntryIndex, setCurrentEntryIndex] = useState(0);

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
      <CardHeader back="/" />
      <div className="card-content">
        {currentEntry && (
          <>
            <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
              <button
                className="button is-small is-default"
                disabled={currentEntryIndex <= 0}
                onClick={() => setCurrentEntryIndex(currentEntryIndex - 1)}
              >
                <span className="icon">
                  <span className="fa fa-arrow-left" />
                </span>
              </button>
              <span>{formatDate(currentEntry.timestamp)}</span>
              <button
                className="button is-small"
                disabled={currentEntryIndex >= history.length - 1}
                onClick={() => setCurrentEntryIndex(currentEntryIndex + 1)}
              >
                <span className="icon">
                  <span className="fa fa-arrow-right" />
                </span>
              </button>
            </div>
            <hr />
            <CalculatorView data={buildViewData(currentEntry.userData, currentEntry.prices)} />
            <div className="is-flex is-justify-content-space-between">
              <button className="button is-small is-danger" onClick={() => confirmDelete(currentEntry)}>
                Delete
              </button>
              <Link
                to={`/edit-history/${currentEntry.id}`}
                className="button is-small is-default"
                onClick={() => setCurrentEntryIndex(currentEntryIndex + 1)}
              >
                Edit
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
