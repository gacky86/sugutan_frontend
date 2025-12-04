import type { IconType } from "react-icons";
type Props = {
  text: string;
  icon: IconType;
};

const PageTitle = ({ text, icon: Icon }: Props) => {
  return (
    <div className="flex items-center text-2xl m-3">
      <Icon />
      <h1 className="ml-2">{text}</h1>
    </div>
  );
};

export default PageTitle;
