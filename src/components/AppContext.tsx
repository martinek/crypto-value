import { createContext, useContext, useMemo } from "react";
import useDataHistory, { IDataHistory } from "../lib/useDataHistory";
import useUserData from "../lib/useUserData";

interface IAppContext {
  prices: IPrices | undefined;
  setPrices: (prices: IPrices) => void;
  setUserData: (data: IUserData) => void;
  userData: IUserData;
  history: IDataHistory;
}

// Do not use AppContext outside of AppContext.Provider
const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const history = useDataHistory();
  const userData = useUserData();

  const value = useMemo(() => ({ history, ...userData }), [history, userData]);

  return <AppContext.Provider value={value} {...props} />;
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
