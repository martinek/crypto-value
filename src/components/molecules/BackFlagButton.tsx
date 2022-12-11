import { FlagButton } from "./FlagButtons";

interface IProps {
  to?: string;
}

const BackFlagButton = ({ to = "/" }: IProps) => <FlagButton icon="chevronLeft" to={to} title="Back" />;

export default BackFlagButton;
