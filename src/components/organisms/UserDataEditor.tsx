import { IUserData, IUserItem } from "../AppContext";
import ItemForm from "../molecules/ItemForm";

interface IProps {
  onChange: (newUserData: IUserData) => void;
  userData: IUserData;
}

const UserDataEditor = ({ onChange, userData }: IProps) => {
  const updateItem = (oldItem: IUserItem, newItem: IUserItem) => {
    onChange({ ...userData, items: userData.items.map((it) => (it === oldItem ? newItem : it)) });
  };

  const removeItem = (oldItem: IUserItem) => {
    onChange({ ...userData, items: userData.items.filter((it) => it !== oldItem) });
  };

  const addItem = () => {
    onChange({ ...userData, items: [...userData.items, { amount: "0", fSym: "" }] });
  };

  return (
    <>
      <div className="field">
        <label className="label">Display symbol</label>
        <p className="control">
          <input
            type="text"
            className="input is-fullwidth"
            value={userData.tSym}
            onChange={(e) => onChange({ ...userData, tSym: e.target.value })}
          />
        </p>
      </div>
      <hr />
      <label className="label">Holding</label>
      {userData.items.map((item, i) => (
        <ItemForm
          key={i}
          item={item}
          onChange={(newItem) => updateItem(item, newItem)}
          onRemove={() => removeItem(item)}
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
            value={userData.investment}
            onChange={(e) => onChange({ ...userData, investment: e.target.value })}
          />
        </p>
        <p className="control">
          <a className="button is-static">{userData.tSym}</a>
        </p>
      </div>
    </>
  );
};

export default UserDataEditor;
