import MenuButton from "@/components/uis/common/MenuButton";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";

const MenuBar = () => {
  return (
    <div className="relative h-full">
      <div className="p-2">
        <MenuButton text="表現検索" icon={FaSearch} path="/" />
        <MenuButton text="単語帳一覧" icon={FaBook} path="/" />
        <MenuButton text="公開単語帳" icon={AiOutlineGlobal} path="/" />
        <MenuButton text="設定" icon={CiSettings} path="/" />
      </div>
      <div className="p-2 absolute bottom-0">
        <MenuButton text="ログアウト" icon={BiLogOut} path="/" />
      </div>
    </div>
  );
};

export default MenuBar;
