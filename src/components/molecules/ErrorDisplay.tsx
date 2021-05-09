import Message from "./Message";

interface IProps {
  className?: string;
  error?: Error;
}

const ErrorDisplay = ({ className, error }: IProps) => {
  if (!error) return null;
  return (
    <Message className={className} variant="danger">
      <p className="is-size-7" style={{ whiteSpace: "pre-wrap" }}>
        {error.message}
      </p>
    </Message>
  );
};

export default ErrorDisplay;
