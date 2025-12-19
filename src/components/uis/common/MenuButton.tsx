import type { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
  icon: IconType;
  path: string;
};

const MenuButton = ({ text, icon: Icon, path }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="md:text-xl md:flex md:items-center md:gap-2 md:py-3 md:rounded-lg cursor-pointer duration-300 hover:bg-orange-50"
      onClick={() => navigate(path)}
    >
      <Icon />
      <p className="hidden md:inline">{text}</p>
    </div>
  );
};

export default MenuButton;
