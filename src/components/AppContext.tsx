import { createContext, useCallback, useContext, useState } from "react";
import { loadUserData, saveUserData } from "../lib/dataSource";

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
  setUserData: (data: IUserData) => void;
  userData: IUserData;
}

export const INITIAL_USER_DATA: IUserData = {
  investment: "0",
  items: [],
  tSym: "EUR",
};

const AppContext = createContext<IAppContext>({
  setUserData: () => {},
  userData: INITIAL_USER_DATA,
});

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const initialUserData = loadUserData() || INITIAL_USER_DATA;
  const [userData, iSetUserData] = useState<IUserData>(initialUserData);

  const setUserData = useCallback((userData: IUserData) => {
    saveUserData(userData);
    iSetUserData(userData);
  }, []);

  return <AppContext.Provider value={{ userData, setUserData }} {...props} />;
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
