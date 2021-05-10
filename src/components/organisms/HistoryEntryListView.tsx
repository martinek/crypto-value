import { Link } from "react-router-dom";
import { IDataHistoryEntry } from "../../lib/DataHistoryDatabase";
import { buildViewData } from "../../lib/helpers";
import CalculatorView from "../molecules/CalculatorView";

interface IProps {
  entry: IDataHistoryEntry;
  previousEntry?: IDataHistoryEntry;
  onDelete?: (entry: IDataHistoryEntry) => void;
}

const HistoryEntryListView = ({ entry, previousEntry, onDelete }: IProps) => (
  <>
    <CalculatorView
      data={buildViewData(entry.userData, entry.prices, previousEntry?.userData, previousEntry?.prices)}
    />
    <div className="is-flex is-justify-content-space-between">
      {onDelete ? (
        <button className="button is-small is-danger" onClick={() => onDelete(entry)}>
          Delete
        </button>
      ) : (
        <div />
      )}
      <Link to={`/edit-history/${entry.id}`} className="button is-small is-default">
        Edit
      </Link>
    </div>
  </>
);

export default HistoryEntryListView;
