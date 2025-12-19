// import MenuButton from "@/components/common/MenuButton";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import MenuButton from "@/components/uis/common/MenuButton";

const MenuBarBottom = () => {
  return (
    <div className="flex justify-between p-3 text-2xl">
      <MenuButton text="" icon={FaSearch} path="/dictionary" />
      <MenuButton text="" icon={FaBook} path="/" />
      <MenuButton text="" icon={CiSettings} path="/" />
      <MenuButton text="" icon={BiLogOut} path="/" />
    </div>
  );
};

export default MenuBarBottom;
