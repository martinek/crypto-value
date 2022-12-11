import { IDataHistoryEntry } from "./DataHistoryDatabase";
import { isUserData } from "./dataSource";

export const serializeDataHistory = (history: IDataHistoryEntry[]): string => {
  const data = { version: 1, history };
  return JSON.stringify(data, null, 2);
};

export const deserializeDataHistory = (input: string): IDataHistoryEntry[] => {
  const data = JSON.parse(input);
  const history = data.history;

  if (!isDataHistory(history)) {
    throw new Error("Data is invalid");
  }
  return history;
};

const isDataHistory = (data: IDataHistoryEntry[] | any): data is IDataHistoryEntry[] => {
  if (!data || data.length === undefined) return false;

  for (const item of data) {
    if (!item) return false;
    if (!item.id || typeof item.id !== "number") return false;
    if (!item.timestamp || typeof item.timestamp !== "number") return false;
    if (!isUserData(item.userData)) return false;
    if (!isPrices(item.prices)) return false;
  }

  return true;
};

const isPrices = (data: IPrices | any): data is IPrices => {
  if (!data) return false;

  for (const fSym in data) {
    if (Object.prototype.hasOwnProperty.call(data, fSym)) {
      const element = data[fSym];
      if (!element) return false;

      for (const tSym in element) {
        if (Object.prototype.hasOwnProperty.call(element, tSym)) {
          const price = element[tSym];
          if (price === undefined || price === null) return false;
          if (typeof price !== "number") return false;
        }
      }
    }
  }

  return true;
};
