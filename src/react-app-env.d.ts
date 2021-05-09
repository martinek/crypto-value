/// <reference types="react-scripts" />

interface IUserItem {
  amount: string;
  fSym: string;
}

interface IUserData {
  tSym: string;
  items: IUserItem[];
  investment: string;
}

interface IPrices {
  [key: string]: { [key: string]: number };
}
