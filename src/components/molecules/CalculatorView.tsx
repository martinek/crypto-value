import cx from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import CalculatorItem, { ICalculatorItemProps } from "./CalculatorItem";
import ErrorDisplay from "./ErrorDisplay";
import Message from "./Message";

export interface ICalculatorViewData {
  items: ICalculatorItemProps[];
  foot: {
    value: string;
    difference?: string;
    isSuccess: boolean;
  };
}

interface IProps {
  data: ICalculatorViewData;
  error?: Error;
  loading?: boolean;
}

const CalculatorView = ({ data, error, loading }: IProps) => (
  <React.Fragment>
    <ErrorDisplay error={error} />
    {data.items.length > 0 ? (
      data.items.map((itemProps, i) => <CalculatorItem key={i} {...itemProps} loading={loading} error={error} />)
    ) : (
      <Message variant="info" className="has-text-centered">
        Add some items in <Link to="/edit">configuration</Link>
      </Message>
    )}

    <div className="level is-mobile total">
      <div className="level-left">Total</div>
      <div className="level-right">
        <div className="has-text-right">
          <p>{data.foot.value}</p>
          {data.foot.difference && (
            <p
              className={cx("small", {
                skeleton: loading,
                "has-text-grey-lighter": !!error,
                "has-text-success": data.foot.isSuccess,
                "has-text-danger": !data.foot.isSuccess,
              })}
            >
              {data.foot.difference}
            </p>
          )}
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default CalculatorView;
