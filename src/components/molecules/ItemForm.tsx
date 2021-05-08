import { IUserItem } from "../AppContext";
import cx from "classnames";

interface IProps {
  item: IUserItem;
  onChange: (item: IUserItem) => void;
  onPriceChange: (newPrice: string) => void;
  onRemove: () => void;
  price?: string;
  tSym: string;
}

const ItemForm = ({ item, onChange, onPriceChange, onRemove, price, tSym }: IProps) => {
  const hasPriceInput = price !== undefined;

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
        </div>
      )}
    </>
  );
};

export default ItemForm;
