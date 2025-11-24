import { IoIosArrowBack } from "react-icons/io";

const ModalBackButton = () => {
  return (
    <div className="absolute top-3 left-2">
      <button className="text-4xl text-gray-600 cursor-pointer">
        <IoIosArrowBack />
      </button>
    </div>
  );
};

export default ModalBackButton;
