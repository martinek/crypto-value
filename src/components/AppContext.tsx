import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { IPrices, loadUserData, saveUserData } from "../lib/dataSource";

export interface IUserItem {
  amount: string;
  fSym: string;
}

export interface IUserData {
  tSym: string;
  items: IUserItem[];
  investment: string;
}

interface IAppContext {
  prices: IPrices | undefined;
  setPrices: (prices: IPrices) => void;
  setUserData: (data: IUserData) => void;
  userData: IUserData;
}

export const INITIAL_USER_DATA: IUserData = {
  investment: "0",
  items: [],
  tSym: "EUR",
};

const AppContext = createContext<IAppContext>({
  prices: undefined,
  setPrices: () => {},
  setUserData: () => {},
  userData: INITIAL_USER_DATA,
});

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const initialUserData = loadUserData() || INITIAL_USER_DATA;
  const [userData, iSetUserData] = useState<IUserData>(initialUserData);
  const [prices, iSetPrices] = useState<IPrices>();

  const setUserData = useCallback((userData: IUserData) => {
    saveUserData(userData);
    iSetUserData(userData);
  }, []);

  const setPrices = useCallback((prices: IPrices) => {
    // FUTURE: store prices for historic purposes
    iSetPrices(prices);
  }, []);

  const value = useMemo(
    () => ({
      prices,
      setPrices,
      setUserData,
      userData,
    }),
    [prices, userData]
  );

  return <AppContext.Provider value={value} {...props} />;
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
