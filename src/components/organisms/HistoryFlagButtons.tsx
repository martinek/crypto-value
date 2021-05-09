import cx from "classnames";
import { useState } from "react";
import { useAppContext } from "../AppContext";
import { FlagButton } from "../molecules/FlagButtons";

const HistoryFlagButtons = () => {
  const {
    prices,
    userData,
    history: { isSupported, addEntry },
  } = useAppContext();
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
    <>
      <hr />
      <FlagButton to="/history" title="Show history" icon="history" />
      <FlagButton
        onClick={handleSave}
        title="Save to history"
        icon="save"
        className={cx({ "is-loading": saving })}
        disabled={!canSave}
      />
    </>
  );
};

export default HistoryFlagButtons;
