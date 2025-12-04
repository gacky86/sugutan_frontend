// react icons
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";

const ModalCloseButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="absolute top-0 right-0">
      <button
        className="text-6xl text-gray-600 cursor-pointer"
        onClick={() => dispatch(closeModal())}
      >
        <IoIosClose />
      </button>
    </div>
  );
};

export default ModalCloseButton;
