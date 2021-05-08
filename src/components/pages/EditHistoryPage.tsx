import DatePicker from "react-datepicker";
import { useParams } from "react-router";
import { IDataHistoryEntry } from "../../lib/DataHistoryDatabase";
import useDataHistory from "../../lib/useDataHistory";
import Message from "../molecules/Message";
import CardHeader from "../organisms/CardHeader";
import UserDataEditor from "../organisms/UserDataEditor";

const EditHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { history, editEntry } = useDataHistory();

  const numId = Number(id);
  const entry = history.find((e) => e.id === numId);

  const changeEntry = (newEntry: Partial<IDataHistoryEntry>) => {
    if (!entry) return;
    editEntry(numId, newEntry);
  };

  return (
    <div className="card main-card">
      {/* maybe use state to preselect item in history? */}
      <CardHeader back="/history" />
      <div className="card-content">
        {entry ? (
          <>
            <div className="field">
              <label className="label">Time</label>
              <div className="control">
                <DatePicker
                  selected={new Date(entry.timestamp)}
                  onChange={(date: Date) => changeEntry({ timestamp: date.getTime() })}
                  customInput={<input className="input is-fullwidth" />}
                  timeFormat="HH:mm"
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                  withPortal
                />
              </div>
            </div>
            <UserDataEditor
              onChange={(userData) => changeEntry({ userData })}
              onPricesChange={(prices) => changeEntry({ prices })}
              userData={entry.userData}
              prices={entry.prices}
            />
          </>
        ) : (
          <Message variant="danger">Could not find entry with id "{id}"</Message>
        )}
      </div>
    </div>
  );
};

export default EditHistoryPage;
