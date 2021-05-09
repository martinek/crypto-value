import { INITIAL_USER_DATA, IUserData, IUserItem } from "../components/AppContext";

const BASE_URL = "https://min-api.cryptocompare.com/data";

export interface IPrices {
  [key: string]: { [key: string]: number };
}

export const fetchPrices = (fSyms: string[], tSyms: string[]): Promise<IPrices> => {
  const url = `${BASE_URL}/pricemulti?fsyms=${fSyms.join(",")}&tsyms=${tSyms.join(",")}`;
  return fetch(url).then((res) => res.json()) as Promise<IPrices>;
};

export const fetchPrice = (fSym: string, tSym: string, timestamp: number): Promise<number> => {
  const url = `${BASE_URL}/v2/histoday?fsym=${fSym}&tsym=${tSym}&toTs=${timestamp}&limit=1`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "Success") {
        return data.Data.Data[0].close as number;
      } else {
        throw new Error("Could not fetch data");
      }
    });
};

export const serializeUserData = (userData: IUserData) => {
  return [
    "v2",
    userData.tSym,
    userData.investment,
    userData.items.map((i) => [i.fSym, i.amount].join(":")).join("|"),
  ].join("|");
};

export const deserializeUserData = (data: string): IUserData => {
  if (data[0] === "v" && data[1] === "2" && data[2] === "|") {
    return deserializeV2(data);
  } else {
    return deserializeV1(data);
  }
};

const deserializeV2 = (data: string): IUserData => {
  const result: IUserData = { ...INITIAL_USER_DATA };

  const stream = data.trim().split("|").reverse();
  const _version = stream.pop();
  result.tSym = stream.pop() as string;
  result.investment = stream.pop() as string;
  result.items = stream.reverse().map((itemData) => {
    const pts = itemData.split(":");
    return {
      amount: pts[1],
      fSym: pts[0],
    };
  });

  if (!isUserData(result)) {
    throw new Error("Data is invalid");
  }

  return result;
};

const deserializeV1 = (data: string): IUserData => {
  const result: IUserData = { ...INITIAL_USER_DATA };
  const stream = data.trim().split("|").reverse();
  const _exchange = stream.pop(); // ignore exchange
  result.tSym = stream.pop() as string;
  result.investment = stream.pop() as string;
  result.items = stream.reverse().map((itemData) => {
    const pts = itemData.split(":");
    return {
      amount: pts[1],
      fSym: pts[0],
    };
  });

  if (!isUserData(result)) {
    throw new Error("Data is invalid");
  }

  return result;
};

export const isUserData = (data: IUserData | any): data is IUserData => {
  if (!data) return false;
  if (!data.tSym || typeof data.tSym !== "string") return false;
  if (!data.items || data.items.length === undefined) return false;
  for (const item of data.items) {
    if (!isUserItem(item)) return false;
  }
  // investment is optional, but must be string
  if (data.investment !== undefined) {
    if (typeof data.investment !== "string") return false;
  }

  return true;
};

const isUserItem = (item: IUserItem | any): item is IUserItem => {
  if (!item) return false;
  if (!item.amount || typeof item.amount !== "string") return false;
  if (isNaN(Number(item.amount))) return false;
  if (!item.fSym || typeof item.fSym !== "string") return false;
  return true;
};

export const saveUserData = (userData: IUserData) => {
  try {
    const json = JSON.stringify({ userData });
    localStorage.setItem("state", json);
  } catch (err) {
    console.error(`Could not save UserData`, err);
  }
};

export const loadUserData = (): IUserData | undefined => {
  try {
    const serializedUserData = localStorage.getItem("state");
    if (serializedUserData === null) {
      return undefined;
    }
    return JSON.parse(serializedUserData)["userData"];
  } catch (err) {
    console.error(`Could not load UserData`, err);
    return undefined;
  }
};
