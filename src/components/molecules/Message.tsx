import cx from "classnames";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "danger" | "info" | "warning";
}

const Message = ({ children, className, variant = "info" }: IProps) => (
  <div
    className={cx("message", className, {
      "is-danger": variant === "danger",
      "is-info": variant === "info",
      "is-warning": variant === "warning",
    })}
  >
    <div className="message-body">{children}</div>
  </div>
);

export default Message;
