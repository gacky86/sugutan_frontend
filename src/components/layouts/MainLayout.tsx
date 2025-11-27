import MenuBar from "@/components/common/MenuBar";
import Header from "@/components/common/Header";

type Props = {
  childrenContent: React.ReactNode;
};

const MainLayout = ({ childrenContent }: Props) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="border border-gray-300">
        <Header />
      </div>
      <div className="grid grid-cols-5 grid-rows-1 flex-1">
        <div className="border border-gray-300">
          <MenuBar />
        </div>
        <div className="col-span-4 border border-gray-300 bg-white">
          {childrenContent}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
