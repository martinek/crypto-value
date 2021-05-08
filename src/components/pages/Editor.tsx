import { useEffect } from "react";
import { useLocation } from "react-router";
import { IUserItem, useAppContext } from "../AppContext";
import CardHeader from "../molecules/CardHeader";
import ItemForm from "../molecules/ItemForm";
import Modal, { useModalState } from "../molecules/Modal";
import BackupInfo from "../organisms/BackupInfo";

const Editor = () => {
  const { userData, setUserData } = useAppContext();
  const { open, modalProps } = useModalState();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      open();
    }
  }, []);

  const updateItem = (oldItem: IUserItem, newItem: IUserItem) => {
    setUserData({ ...userData, items: userData.items.map((it) => (it === oldItem ? newItem : it)) });
  };

  const removeItem = (oldItem: IUserItem) => {
    setUserData({ ...userData, items: userData.items.filter((it) => it !== oldItem) });
  };

  const addItem = () => {
    setUserData({ ...userData, items: [...userData.items, { amount: "0", fSym: "" }] });
  };

  return (
    <>
      <div className="card editor-card">
        <CardHeader back={true}>
          <a className="card-header-icon has-text-primary" onClick={open}>
            <span className="icon">
              <span className="fas fa-download" />
            </span>
          </a>
        </CardHeader>
        <div className="card-content">
          <div className="field">
            <label className="label">Display symbol</label>
            <p className="control">
              <input
                type="text"
                className="input is-fullwidth"
                value={userData.tSym}
                onChange={(e) => setUserData({ ...userData, tSym: e.target.value })}
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
                onChange={(e) => setUserData({ ...userData, investment: e.target.value })}
              />
            </p>
            <p className="control">
              <a className="button is-static">{userData.tSym}</a>
            </p>
          </div>
        </div>
      </div>
      <Modal {...modalProps}>
        <BackupInfo />
      </Modal>
    </>
  );
};

export default Editor;
