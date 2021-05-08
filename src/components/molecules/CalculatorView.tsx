import cx from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import CalculatorItem, { ICalculatorItemProps } from "./CalculatorItem";

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

const CalculatorView = ({ data, error, loading }: IProps) => {
  return (
    <React.Fragment>
      {error && (
        <div className="message is-danger">
          <div className="message-body">
            <p>Could not load prices</p>
            <p className="is-size-7" style={{ whiteSpace: "pre-wrap" }}>
              {error.message}
            </p>
          </div>
        </div>
      )}
      {data.items.length > 0 ? (
        data.items.map((itemProps, i) => <CalculatorItem key={i} {...itemProps} loading={loading} error={error} />)
      ) : (
        <div className="message is-info has-text-centered">
          <div className="message-body">
            Add some items in <Link to="/edit">configuration</Link>
          </div>
        </div>
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
};

export default CalculatorView;
