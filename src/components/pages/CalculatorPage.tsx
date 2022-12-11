import { useCallback, useEffect, useState } from "react";
import { fetchPrices as iFetchPrices } from "../../lib/dataSource";
import { buildViewData } from "../../lib/helpers";
import { useAppContext } from "../AppContext";
import CalculatorView from "../molecules/CalculatorView";
import FlagButtons, { FlagButton } from "../molecules/FlagButtons";
import CardHeader from "../organisms/CardHeader";
import HistoryFlagButtons from "../organisms/HistoryFlagButtons";
import InfoFlagButton from "../organisms/InfoFlagButton";

const CalculatorPage = () => {
  const { prices, setPrices, userData, history } = useAppContext();
  const prevEvent = history.history[0];
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const fetchPrices = useCallback(() => {
    if (userData.items.length === 0) return;

    setLoading(true);
    setError(undefined);
    iFetchPrices(
      userData.items.map((i) => i.fSym),
      [userData.tSym]
    )
      .then(setPrices)
      .catch((e) => setError(new Error(`Could not load prices\n${e?.message || e}`)))
      .finally(() => setLoading(false));
  }, [userData]);

  useEffect(() => {
    if (!prices) {
      fetchPrices();
    }
  }, [fetchPrices]);

  const viewData = buildViewData(userData, prices, prevEvent?.userData, prevEvent?.prices);

  return (
    <div className="card main-card">
      <CardHeader />
      <div className="card-content">
        <FlagButtons>
          <InfoFlagButton />
          <FlagButton icon="sync" title="Reload price data" onClick={() => fetchPrices()} />
          <FlagButton icon="cog" title="Edit user data" to="/edit" />
          <HistoryFlagButtons />
        </FlagButtons>

        <CalculatorView data={viewData} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CalculatorPage;
