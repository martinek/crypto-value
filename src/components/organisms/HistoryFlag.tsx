import cx from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import useDataHistory from "../../lib/useDataHistory";
import { useAppContext } from "../AppContext";

const HistoryFlag = () => {
  const { prices, userData } = useAppContext();
  const { isSupported, addEntry } = useDataHistory();
  const [saving, setSaving] = useState(false);

  if (!isSupported) return null;

  const canSave = !!(prices && userData);
  const handleSave = () => {
    if (!prices || !userData) return;

    setSaving(true);
    addEntry({
      prices,
      userData,
      timestamp: new Date().getTime(),
    })
      .then(() => {
        setTimeout(() => setSaving(false), 1000);
      })
      .catch(() => {
        setSaving(false);
      });
  };

  return (
    <div className="history-flag">
      <Link to="/history" className="button is-white has-text-primary" title="Show history">
        <span className="icon">
          <span className="fa fa-history" />
        </span>
      </Link>
      <button
        className={cx("button is-white has-text-primary", { "is-loading": saving })}
        disabled={!canSave}
        onClick={handleSave}
      >
        <span className="icon">
          <i className="fa fa-save" />
        </span>
      </button>
    </div>
  );
};

export default HistoryFlag;
