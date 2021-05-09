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

export const buildViewData = (userData: IUserData, prices?: IPrices): ICalculatorViewData => {
  const res: ICalculatorViewData = {
    items: [],
    foot: {
      value: "-",
      isSuccess: false,
    },
  };

  const { investment, items, tSym } = userData;

  let total = 0;

  res.items = items.map(({ amount, fSym }) => {
    const itemSymPrice = prices?.[fSym]?.[tSym] || NaN;
    const itemAmount = Number(amount);
    const itemPrice = itemSymPrice * itemAmount;

    total += isNaN(itemPrice) ? 0 : itemPrice;

    return {
      amount: `${itemAmount} ${fSym}`,
      itemValue: isNaN(itemSymPrice) ? "Unavailable" : formatPrice(itemSymPrice, tSym),
      label: fSym,
      value: formatPrice(itemPrice, tSym),
    };
  });

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
