// モーダル画面用レイアウト
// 表示非表示はredux state管理
// 表示内容はModalManager管理

// components
import ModalCloseButton from "@/components/common/ModalCloseButton";
import ModalBackButton from "@/components/common/ModalBackButton";

const ModalLayout = () => {
  return (
    <div className="w-full h-screen bg-black/70 fixed top-0 left-0">
      {/* <div className="w-full h-screen bg-black/70 fixed top-0 left-0" data-testid="modal" onClick={() => dispatch(closeModal())}> */}
      <div
        className="mx-auto my-30 bg-white min-w-[350px] max-w-[800px] w-[60%] min-h-[300px] max-h-[550px] rounded-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalBackButton />
        <ModalCloseButton />
        <div className="p-3">{/* <ModalManager /> */}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
