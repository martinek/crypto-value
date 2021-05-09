import { useCallback, useMemo, useState } from "react";
import { loadUserData, saveUserData } from "./dataSource";

export const INITIAL_USER_DATA: IUserData = {
  investment: "0",
  items: [],
  tSym: "EUR",
};

const useUserData = () => {
  const initialUserData = loadUserData() || { ...INITIAL_USER_DATA };
  const [userData, iSetUserData] = useState<IUserData>(initialUserData);
  const [prices, iSetPrices] = useState<IPrices>();

  const setUserData = useCallback((userData: IUserData) => {
    saveUserData(userData);
    iSetUserData(userData);
    // reset prices to force reload
    iSetPrices(undefined);
  }, []);

  const setPrices = useCallback((prices: IPrices) => {
    // FUTURE: store prices for historic purposes
    iSetPrices(prices);
  }, []);

  return useMemo(
    () => ({
      prices,
      setPrices,
      setUserData,
      userData,
    }),
    [prices, userData]
  );
};

export default useUserData;
