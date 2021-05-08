import database, { IDataHistoryEntry } from "./DataHistoryDatabase";
import { useEffect, useState } from "react";
import { IUserData } from "../components/AppContext";
import { IPrices } from "./dataSource";

interface IDataHistory {
  isSupported: boolean;
  history: IDataHistoryEntry[];
  addEntry: (entry: IDataHistoryEntry) => Promise<number>;
  removeEntry: (entry: IDataHistoryEntry) => Promise<void>;
}

const DB = {
  addEntry: (entry: IDataHistoryEntry) => {
    return database.transaction("rw", database.entries, async () => database.entries.add({ ...entry }));
  },

  getEntries: () => {
    return database.transaction("r", database.entries, async () => database.entries.toArray());
  },

  removeEntry: (entry: IDataHistoryEntry) => {
    return database.transaction("rw", database.entries, async () => database.entries.delete(entry.id!));
  },
};

const HistoryNotSupportedError = new Error("History is not supported on this browser");

const useDataHistory = (): IDataHistory => {
  const isSupported = !!indexedDB;
  const [history, setHistory] = useState<IDataHistoryEntry[]>([]);

  useEffect(() => {
    if (!isSupported) return;

    DB.getEntries().then(setHistory);
  }, []);

  const addEntry = async (entry: IDataHistoryEntry) => {
    if (!isSupported) return Promise.reject(HistoryNotSupportedError);

    const entryId = await DB.addEntry(entry);
    setHistory(await DB.getEntries());
    return entryId;
  };

  const removeEntry = async (entry: IDataHistoryEntry) => {
    if (!isSupported) return Promise.reject(HistoryNotSupportedError);

    await DB.removeEntry(entry);
    setHistory(await DB.getEntries());
  };

  return {
    isSupported,
    history,
    addEntry,
    removeEntry,
  };
};

export default useDataHistory;
