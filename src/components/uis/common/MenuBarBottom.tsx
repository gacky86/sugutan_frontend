// import MenuButton from "@/components/common/MenuButton";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import MenuButton from "@/components/uis/common/MenuButton";
import SignOutButton from "@/components/uis/common/SignOutButton";

const MenuBarBottom = () => {
  return (
    <div className="flex justify-between p-3 text-2xl text-white bg-[#49678F]">
      <MenuButton text="" icon={FaBook} path="/" />
      <MenuButton text="" icon={FaSearch} path="/dictionary" />
      <MenuButton text="" icon={CiSettings} path="/setting" />
      <SignOutButton />
    </div>
  );
};

export default MenuBarBottom;
