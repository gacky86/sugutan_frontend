import MenuBar from "@/components/uis/common/MenuBar";
import MenuBarBottom from "@/components/uis/common/MenuBarBottom";
import Header from "@/components/uis/common/Header";

type Props = {
  childrenContent: React.ReactNode;
};

const MainLayout = ({ childrenContent }: Props) => {
  return (
    <div className="h-dvh flex flex-col">
      {/* Header: PCのみ */}
      <div className="hidden md:block border border-gray-300">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: PCのみ */}
        <div className="hidden md:block w-1/5 border border-gray-300">
          <MenuBar />
        </div>

        {/* Main Content: 常に1つだけ配置 */}
        <main className="flex-1 overflow-y-auto bg-white border border-gray-300">
          {childrenContent}
        </main>
      </div>

      {/* Bottom Nav: モバイルのみ */}
      <div className="md:hidden border border-gray-300">
        <MenuBarBottom />
      </div>
    </div>
  );
};

export default MainLayout;
