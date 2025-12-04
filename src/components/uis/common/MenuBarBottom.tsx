// import MenuButton from "@/components/common/MenuButton";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";

const MenuBarBottom = () => {
  return (
    <div className="flex justify-between p-3 text-2xl">
      <FaSearch />
      <FaBook />
      <AiOutlineGlobal />
      <CiSettings />
      <BiLogOut />
    </div>
  );
};

export default MenuBarBottom;
