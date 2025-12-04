// images
import Logo from "@/assets/sugutan_logo.svg?react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[70px]">
      <Logo
        className="w-[70px] h-[70px] ml-2 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default Header;
