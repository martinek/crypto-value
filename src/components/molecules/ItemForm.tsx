import { IUserItem } from "../AppContext";

interface IProps {
  item: IUserItem;
  onChange: (item: IUserItem) => void;
  onRemove: () => void;
}

const ItemForm = ({ item, onChange, onRemove }: IProps) => (
  <div className="field has-addons is-fullwidth">
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
);

export default ItemForm;
