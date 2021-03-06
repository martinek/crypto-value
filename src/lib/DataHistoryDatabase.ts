import Dexie from "dexie";
import "dexie-observable";

export interface IDataHistoryEntry {
  id?: number;
  timestamp: number;
  prices: IPrices;
  userData: IUserData;
}

class DataHistoryDatabase extends Dexie {
  public entries: Dexie.Table<IDataHistoryEntry, number>;

  public constructor() {
    super("dataHistory");
    this.version(2).stores({
      entries: "++id,timestamp",
    });
    this.entries = this.table("entries");
  }
}

const DB = new DataHistoryDatabase();
export default DB;
