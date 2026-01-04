import { openModal } from "@/stores/modalSlice";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";

const NewFlashcardButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className="flex items-center cursor-pointer mt-3"
      onClick={() => dispatch(openModal({ modalContent: "newFlashcard" }))}
      role="button"
      aria-label="単語帳新規作成"
    >
      <IoMdAddCircle className="text-2xl text-blue-500" />
      <p className="text-base">単語帳を新規作成</p>
    </div>
  );
};

export default NewFlashcardButton;
