import cx from "classnames";

export interface ICalculatorItemProps {
  amount: string;
  itemValue: string;
  label: string;
  value: string;
  loading?: boolean;
  error?: Error;
}

const CalculatorItem = ({ amount, itemValue, label, value, loading, error }: ICalculatorItemProps) => (
  <div className="level is-mobile item">
    <div className="level-left">
      <div>
        <p>{label}</p>
        <p className={cx("small", { skeleton: loading, "has-text-grey-lighter": !!error })}>{itemValue}</p>
      </div>
    </div>
    <div className="level-right">
      <div className="has-text-right">
        <p className={cx({ "has-text-grey-lighter": !!error })}>{value}</p>
        <p className="small">{amount}</p>
      </div>
    </div>
  </div>
);

export default CalculatorItem;
