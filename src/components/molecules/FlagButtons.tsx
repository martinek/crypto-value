import * as React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

const ICONS = {
  save: "fa fa-save",
  history: "fa fa-history",
  cog: "fas fa-cog",
  sync: "fas fa-sync",
  download: "fas fa-download",
  info: "fas fa-info-circle",
  chevronLeft: "fas fa-chevron-left",
};

export interface IFlagButtonProps {
  to?: string;
  onClick?: () => void;
  icon: keyof typeof ICONS;
  title?: string;
  disabled?: boolean;
  className?: string;
}

export const FlagButton = ({ to, className, onClick, icon, title, disabled }: IFlagButtonProps) => {
  const Icon = (
    <span className="icon">
      <i className={cx(ICONS[icon])} />
    </span>
  );

  const cname = cx("button is-white has-text-primary", className);

  if (to) {
    return (
      <Link to={to} className={cname} title={title} onClick={onClick}>
        {Icon}
      </Link>
    );
  } else {
    return (
      <button className={cname} title={title} onClick={onClick} disabled={disabled}>
        {Icon}
      </button>
    );
  }
};

interface IProps {
  buttons?: IFlagButtonProps[];
  children?: React.ReactNode;
}

const FlagButtons = ({ buttons, children }: IProps) => (
  <div className="flag-buttons">
    {buttons && buttons.map((buttonProps, i) => <FlagButton key={i} {...buttonProps} />)}
    {children}
  </div>
);

export default FlagButtons;
