import MenuBar from "@/components/common/MenuBar";

type Props = {
  childrenContent: React.ReactNode;
};

const MainLayout = ({ childrenContent }: Props) => {
  return (
    <div>
      <div className="border border-black">header</div>
      <div className="grid grid-cols-5 grid-rows-1 gap-4 h-screen">
        <div className="border border-black">
          <MenuBar />
        </div>
        <div className="col-span-4 border border-black">{childrenContent}</div>
      </div>
    </div>
  );
};

export default MainLayout;
