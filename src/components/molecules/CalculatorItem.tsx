import cx from "classnames";

export interface ICalculatorItemProps {
  amount: string;
  itemValue: string;
  label: string;
  value: string;
  loading?: boolean;
  error?: Error;
  diff?: {
    positive: boolean;
    amount: string;
    itemValue: string;
  };
}

const CalculatorItem = ({ amount, itemValue, label, value, loading, error, diff }: ICalculatorItemProps) => {
  const showDiff = !loading && !error;
  return (
    <div className="item is-flex is-justify-content-space-between mb-5">
      <div>
        <div>
          <p>{label}</p>
          <p className={cx("small", { skeleton: loading, "has-text-grey-lighter": !!error })}>{itemValue}</p>
          {showDiff && diff && (
            <p
              className={cx("small", {
                skeleton: loading,
                "has-text-grey-lighter": !!error,
                "has-text-success": diff.positive,
                "has-text-danger": !diff.positive,
              })}
            >
              {diff.itemValue}
            </p>
          )}
        </div>
      </div>
      <div>
        <div className="has-text-right">
          <p className={cx({ "has-text-grey-lighter": !!error })}>{value}</p>
          <p className="small">{amount}</p>
          {showDiff && diff && diff.amount && <p className="small">{diff.amount}</p>}
        </div>
      </div>
    </div>
  );
};

export default CalculatorItem;
