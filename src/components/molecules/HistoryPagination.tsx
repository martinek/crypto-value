import cx from "classnames";
import { IDataHistoryEntry } from "../../lib/DataHistoryDatabase";
import { formatDate } from "../../lib/helpers";

interface IProps {
  current: number;
  currentEntry?: IDataHistoryEntry;
  length: number;
  onChange: (newNumber: number) => void;
}

const HistoryPagination = ({ current, currentEntry, length, onChange }: IProps) => {
  const isFirst = current <= 0;
  const isLast = current >= length - 1;

  return (
    <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
      <button
        className={cx("button is-small is-default", {
          "is-invisible": isLast,
        })}
        disabled={isLast}
        onClick={() => onChange(current + 1)}
      >
        <span className="icon">
          <span className="fa fa-arrow-left" />
        </span>
      </button>
      <span className="is-unselectable">{currentEntry ? formatDate(currentEntry.timestamp) : "-"}</span>
      <button
        className={cx("button is-small is-default", { "is-invisible": isFirst })}
        disabled={isFirst}
        onClick={() => onChange(current - 1)}
      >
        <span className="icon">
          <span className="fa fa-arrow-right" />
        </span>
      </button>
    </div>
  );
};

export default HistoryPagination;
