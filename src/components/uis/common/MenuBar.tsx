import MenuButton from "@/components/uis/common/MenuButton";
import SignOutButton from "@/components/uis/common/SignOutButton";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

const MenuBar = () => {
  return (
    <div className="relative h-full bg-[#49678F] text-white">
      <div className="p-2">
        <MenuButton text="単語帳一覧" icon={FaBook} path="/" />
        <MenuButton text="AI辞書" icon={FaSearch} path="/dictionary" />
        <MenuButton text="設定" icon={CiSettings} path="/" />
      </div>
      <div className="p-2 absolute bottom-0">
        <SignOutButton />
      </div>
    </div>
  );
};

export default MenuBar;
