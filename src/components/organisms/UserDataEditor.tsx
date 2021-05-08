import { IPrices } from "../../lib/dataSource";
import { IUserData, IUserItem } from "../AppContext";
import ItemForm from "../molecules/ItemForm";

interface IProps {
  onChange: (newUserData: IUserData) => void;
  onPricesChange?: (newPrices: IPrices) => void;
  userData: IUserData;
  prices?: IPrices;
}

const UserDataEditor = ({ onChange, onPricesChange, prices, userData }: IProps) => {
  const { investment, items, tSym } = userData;

  const updateItem = (oldItem: IUserItem, newItem: IUserItem) => {
    onChange({ ...userData, items: userData.items.map((it) => (it === oldItem ? newItem : it)) });
    if (onPricesChange && prices) {
      if (oldItem.fSym !== newItem.fSym) {
        const newPrices = { ...prices, [newItem.fSym]: prices[oldItem.fSym] };
        delete newPrices[oldItem.fSym];
        onPricesChange(newPrices);
      }
    }
  };

  const removeItem = (oldItem: IUserItem) => {
    onChange({ ...userData, items: userData.items.filter((it) => it !== oldItem) });
    if (onPricesChange) {
      const newPrices = { ...prices };
      delete newPrices[oldItem.fSym];
      onPricesChange(newPrices);
    }
  };

  const addItem = () => {
    onChange({ ...userData, items: [...userData.items, { amount: "0", fSym: "" }] });
    // No need to handle onPriceChange as price is not required, and it will be created when updated
  };

  const handlePriceChange = (item: IUserItem, newPrice: string) => {
    if (onPricesChange) {
      onPricesChange({ ...prices, [item.fSym]: { [tSym]: Number(newPrice) } });
    }
  };

  const handleTSymChange = (newTSym: string) => {
    onChange({ ...userData, tSym: newTSym });
    if (onPricesChange) {
      const newPrices = { ...prices };
      Object.keys(newPrices).forEach((key) => {
        newPrices[key] = { [newTSym]: newPrices[key][tSym] };
      });
      onPricesChange(newPrices);
    }
  };

  const itemPrice = (item: IUserItem): string | undefined => {
    if (!prices) return undefined;
    return prices[item.fSym]?.[userData.tSym]?.toString() || "";
  };

  return (
    <>
      <div className="field">
        <label className="label">Display symbol</label>
        <p className="control">
          <input
            type="text"
            className="input is-fullwidth"
            value={tSym}
            onChange={(e) => handleTSymChange(e.target.value)}
          />
        </p>
      </div>
      <hr />
      <label className="label">Holding</label>
      {items.map((item, i) => (
        <ItemForm
          key={i}
          item={item}
          onChange={(newItem) => updateItem(item, newItem)}
          onPriceChange={(newPrice) => handlePriceChange(item, newPrice)}
          onRemove={() => removeItem(item)}
          price={itemPrice(item)}
          tSym={tSym}
        />
      ))}
      <button className="button is-success" onClick={() => addItem()}>
        <span className="icon">
          <span className="fas fa-plus" />
        </span>
      </button>
      <hr />
      <label className="label">Total investment</label>
      <div className="field has-addons is-fullwidth">
        <p className="control is-expanded">
          <input
            className="input has-text-right"
            type="number"
            value={investment}
            onChange={(e) => onChange({ ...userData, investment: e.target.value })}
          />
        </p>
        <p className="control">
          <a className="button is-static">{tSym}</a>
        </p>
      </div>
    </>
  );
};

export default UserDataEditor;
