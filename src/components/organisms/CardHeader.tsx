interface IProps {
  children?: React.ReactNode;
  back?: string;
}

const TITLE = "crypto-value.info";

const CardHeader = ({ children }: IProps) => (
  <header className="card-header">
    <p className="card-header-title has-text-centered">
      <span>{TITLE}</span>
    </p>
    {children}
  </header>
);

export default CardHeader;
