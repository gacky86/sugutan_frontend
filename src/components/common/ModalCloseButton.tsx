// react icons
import { IoIosClose } from "react-icons/io";

const ModalCloseButton = () => {
  return (
    <div className="absolute top-0 right-0">
      <button className="text-6xl text-gray-600 cursor-pointer">
        <IoIosClose />
      </button>
    </div>
  );
};

export default ModalCloseButton;
