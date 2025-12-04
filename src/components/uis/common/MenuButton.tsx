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
      className="text-xl flex items-center gap-2 py-3 rounded-lg cursor-pointer duration-300 hover:bg-orange-50"
      onClick={() => navigate(path)}
    >
      <Icon />
      <p>{text}</p>
    </div>
  );
};

export default MenuButton;
