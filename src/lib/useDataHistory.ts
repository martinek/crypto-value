import { useEffect, useState } from "react";
import database, { IDataHistoryEntry } from "./DataHistoryDatabase";

interface IDataHistory {
  isSupported: boolean;
  history: IDataHistoryEntry[];
  addEntry: (entry: IDataHistoryEntry) => Promise<number>;
  removeEntry: (entry: IDataHistoryEntry) => Promise<void>;
  editEntry: (key: number, entry: Partial<IDataHistoryEntry>) => Promise<number | undefined>;
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

  editEntry: (key: number, entry: Partial<IDataHistoryEntry>) => {
    return database.transaction("rw", database.entries, async () => {
      const existingEntry = await database.entries.get(key);
      if (!existingEntry) return Promise.resolve();
      return database.entries.put({ ...existingEntry, ...entry }, key);
    });
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

  const editEntry = async (key: number, entry: Partial<IDataHistoryEntry>) => {
    if (!isSupported) return Promise.reject(HistoryNotSupportedError);

    await DB.editEntry(key, entry);
    setHistory(await DB.getEntries());
  };

  return {
    isSupported,
    history,
    addEntry,
    removeEntry,
    editEntry,
  };
};

export default useDataHistory;
