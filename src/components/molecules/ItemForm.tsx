import cx from "classnames";
import { useState } from "react";

interface IProps {
  item: IUserItem;
  onChange: (item: IUserItem) => void;
  onFetchPrice?: () => Promise<any>;
  onPriceChange: (newPrice: string) => void;
  onRemove: () => void;
  price?: string;
  tSym: string;
}

const ItemForm = ({ item, onChange, onPriceChange, onRemove, price, tSym, onFetchPrice }: IProps) => {
  const hasPriceInput = price !== undefined;
  const [fetching, setFetching] = useState(false);

  const handleFetchPrice = () => {
    if (!onFetchPrice) return;
    setFetching(true);
    onFetchPrice().finally(() => setFetching(false));
  };

  return (
    <>
      <div className={cx("field has-addons is-fullwidth", { "mb-1": hasPriceInput })}>
        <p className="control">
          <button className="button is-danger" onClick={onRemove}>
            <span className="icon">
              <span className="fas fa-minus fa-sm" />
            </span>
          </button>
        </p>
        <p className="control is-expanded">
          <input
            className="input has-text-right"
            value={item.amount || "0"}
            type="number"
            placeholder="Amount"
            onChange={(e) => onChange({ ...item, amount: e.target.value })}
          />
        </p>
        <p className="control">
          <input
            type="text"
            className="input"
            value={item.fSym}
            onChange={(e) => onChange({ ...item, fSym: e.target.value })}
          />
        </p>
      </div>
      {price !== undefined && (
        <div className="field has-addons is-fullwidth">
          <p className="control">
            <a className="button is-static">1 {item.fSym}</a>
          </p>
          <p className="control is-expanded">
            <input
              className="input has-text-right"
              value={price}
              type="number"
              placeholder="Amount"
              onChange={(e) => onPriceChange(e.target.value)}
            />
          </p>
          <p className="control">
            <a className="button is-static">{tSym}</a>
          </p>
          {onFetchPrice && (
            <p className="control">
              <button className={cx("button is-default", { "is-loading": fetching })} onClick={handleFetchPrice}>
                <span className="icon">
                  <span className="fas fa-sync" />
                </span>
              </button>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ItemForm;
