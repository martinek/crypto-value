import { useEffect, useState } from "react";
import database, { IDataHistoryEntry } from "./DataHistoryDatabase";

interface IDataHistory {
  isSupported: boolean;
  history: IDataHistoryEntry[];
  addEntry: (entry: IDataHistoryEntry) => Promise<number>;
  removeEntry: (entry: IDataHistoryEntry) => Promise<void>;
  editEntry: (key: number, entry: Partial<IDataHistoryEntry>) => Promise<number | undefined>;
  importEntries: (entries: IDataHistoryEntry[]) => Promise<void>;
}

const DB = {
  database,

  addEntry: (entry: IDataHistoryEntry) => {
    return database.transaction("rw", database.entries, async () => database.entries.add({ ...entry }));
  },

  getEntries: () => {
    return database.transaction("r", database.entries, async () =>
      database.entries.orderBy("timestamp").reverse().toArray()
    );
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

  importEntries: (entries: IDataHistoryEntry[]) => {
    return database.transaction("rw", database.entries, async () => {
      await database.entries.clear();
      return database.entries.bulkPut(entries);
    });
  },
};

const HistoryNotSupportedError = new Error("History is not supported on this browser");

const useDataHistory = (): IDataHistory => {
  const isSupported = !!indexedDB;
  const [history, setHistory] = useState<IDataHistoryEntry[]>([]);

  useEffect(() => {
    if (!isSupported) return;

    const { database, getEntries } = DB;

    const updateHistory = () => getEntries().then(setHistory);
    database.on("changes", updateHistory);
    updateHistory();

    return () => {
      database.on("changes").unsubscribe(updateHistory);
    };
  }, []);

  const addEntry = async (entry: IDataHistoryEntry) => {
    if (!isSupported) return Promise.reject(HistoryNotSupportedError);

    return DB.addEntry(entry);
  };

  const removeEntry = async (entry: IDataHistoryEntry) => {
    if (!isSupported) return Promise.reject(HistoryNotSupportedError);

    return DB.removeEntry(entry);
  };

  const editEntry = async (key: number, entry: Partial<IDataHistoryEntry>) => {
    if (!isSupported) return Promise.reject(HistoryNotSupportedError);

    DB.editEntry(key, entry);
  };

  const importEntries = async (entries: IDataHistoryEntry[]) => {
    if (!isSupported) return Promise.reject(HistoryNotSupportedError);

    DB.importEntries(entries);
  };

  return {
    isSupported,
    history,
    addEntry,
    removeEntry,
    editEntry,
    importEntries,
  };
};

export default useDataHistory;
