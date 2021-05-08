import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPrices as iFetchPrices, IPrices } from "../../lib/dataSource";
import { buildViewData } from "../../lib/helpers";
import { useAppContext } from "../AppContext";
import CalculatorView from "../molecules/CalculatorView";
import CardHeader from "../organisms/CardHeader";

const Calculator = () => {
  const { userData } = useAppContext();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<IPrices>();

  const fetchPrices = useCallback(() => {
    if (userData.items.length === 0) return;

    setLoading(true);
    setError(undefined);
    iFetchPrices(
      userData.items.map((i) => i.fSym),
      [userData.tSym]
    )
      .then(setPrices)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userData]);

  useEffect(() => fetchPrices(), [fetchPrices]);

  const viewData = buildViewData(userData, prices);

  return (
    <div className="card main-card">
      <CardHeader>
        <a className="card-header-icon has-text-primary" title="Reload price data" onClick={() => fetchPrices()}>
          <span className="icon">
            <span className="fas fa-sync" />
          </span>
        </a>
        <Link className="card-header-icon has-text-primary" to="/edit">
          <span className="icon">
            <span className="fas fa-cog" />
          </span>
        </Link>
      </CardHeader>
      <div className="card-content">
        <CalculatorView data={viewData} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Calculator;
