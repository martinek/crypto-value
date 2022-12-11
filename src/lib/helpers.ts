import { ICalculatorItemProps } from "../components/molecules/CalculatorItem";
import { ICalculatorViewData } from "../components/molecules/CalculatorView";

export const formatPrice = (value: number | undefined | null, symbol?: string): string => {
  const unit = symbol ? ` ${symbol}` : "";
  if (value === undefined || value === null || isNaN(value)) {
    return "-" + unit;
  }

  return value.toFixed(2) + unit;
};

export const formatDate = (time: number): string => {
  const date = new Date(time);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const fixNumber = (number: number, sig = 7): number => {
  const n = Math.pow(10, sig);
  return Math.round(number * n) / n;
};

export const buildViewData = (
  userData: IUserData,
  prices?: IPrices,
  previousUserData?: IUserData,
  previousPrices?: IPrices
): ICalculatorViewData => {
  const res: ICalculatorViewData = {
    items: [],
    foot: {
      value: "-",
      isSuccess: false,
    },
  };

  const { investment, items, tSym } = userData;

  let total = 0;

  res.items = items.map(
    ({ amount, fSym }): ICalculatorItemProps => {
      const itemSymPrice = prices?.[fSym]?.[tSym] || NaN;
      const itemAmount = Number(amount);
      const itemPrice = itemSymPrice * itemAmount;

      total += isNaN(itemPrice) ? 0 : itemPrice;

      let diff: ICalculatorItemProps["diff"];

      if (previousPrices && previousUserData && !isNaN(itemSymPrice) && !isNaN(itemAmount)) {
        diff = buildDiff(itemAmount, itemSymPrice, fSym, tSym, previousUserData, previousPrices);
      }

      return {
        amount: `${itemAmount} ${fSym}`,
        itemValue: isNaN(itemSymPrice) ? "Unavailable" : formatPrice(itemSymPrice, tSym),
        label: fSym,
        value: formatPrice(itemPrice, tSym),
        diff,
      };
    }
  );

  res.foot.value = formatPrice(total, tSym);

  const investmentNumber = Number(investment);
  const diff = total - investmentNumber;
  const diffPerc = (diff * 100) / investmentNumber;

  if (investmentNumber > 0 && !isNaN(diff)) {
    const positive = diff >= 0;
    res.foot.isSuccess = positive;
    res.foot.difference = `${positive ? "+" : ""} ${formatPrice(diff, tSym)} `;
    res.foot.difference += `(${positive ? "+" : ""} ${diffPerc.toFixed(2)}%)`;
  }

  return res;
};

const buildDiff = (
  amount: number,
  itemSymPrice: number,
  fSym: string,
  tSym: string,
  previousUserData: IUserData,
  previousPrices: IPrices
): ICalculatorItemProps["diff"] => {
  const res: ICalculatorItemProps["diff"] = {
    itemValue: "",
    positive: true,
    amount: "",
  };

  const prevItemSymPrice = previousPrices[fSym]?.[tSym] || NaN;
  if (!isNaN(prevItemSymPrice)) {
    const change = itemSymPrice - prevItemSymPrice;

    res.positive = change >= 0;
    res.itemValue = `${res.positive ? "+" : ""}${((change / prevItemSymPrice) * 100).toFixed(2)}% (${formatPrice(
      change,
      tSym
    )})`;
  }

  let prevAmount = Number(previousUserData.items.find((i) => i.fSym === fSym)?.amount);
  if (isNaN(prevAmount)) prevAmount = 0;

  const amountDiff = amount - prevAmount;

  if (amountDiff !== 0) {
    res.amount = `${amountDiff > 0 ? "+" : ""}${fixNumber(amountDiff)}`;
  }

  return res;
};
