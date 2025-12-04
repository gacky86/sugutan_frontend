import MenuBar from "@/components/uis/common/MenuBar";
import MenuBarBottom from "@/components/uis/common/MenuBarBottom";
import Header from "@/components/uis/common/Header";

type Props = {
  childrenContent: React.ReactNode;
};

const MainLayout = ({ childrenContent }: Props) => {
  return (
    <div className="h-screen flex flex-col">
      {/* --- Header（MD以上で表示） --- */}
      <div className="border border-gray-300 hidden md:block">
        <Header />
      </div>

      {/* --- PCレイアウト（md 以上）--- */}
      <div className="hidden md:grid md:grid-cols-5 md:flex-1 md:grid-rows-1">
        <div className="border border-gray-300">
          <MenuBar />
        </div>

        <div className="col-span-4 border border-gray-300 bg-white overflow-y-auto">
          {childrenContent}
        </div>
      </div>

      {/* --- モバイル / タブレットレイアウト（md 未満）--- */}
      <div className="flex flex-col flex-1 md:hidden">
        <div className="flex-1 overflow-y-auto bg-white border border-gray-300">
          {childrenContent}
        </div>

        <div className="border border-gray-300">
          <MenuBarBottom />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
