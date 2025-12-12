import { FaBook } from "react-icons/fa";

import SelectFlashcardForm from "@/components/uis/dictionary/uis/SelectFlashcardForm";
import { openModal } from "@/stores/modalSlice";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";

const RegFlashcard = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="mt-3">
      <h2 className="text-xl">登録先の単語帳</h2>
      <div className="flex items-center">
        <FaBook className="text-2xl mr-3" />
        <SelectFlashcardForm />
      </div>
      {/* 単語帳作成モーダルを開くボタン */}
      <div
        className="flex items-center cursor-pointer mt-3"
        onClick={() => dispatch(openModal({ modalContent: "newFlashcard" }))}
      >
        <IoMdAddCircle className="text-4xl text-blue-500" />
        <p className="text-lg">単語帳を新規作成</p>
      </div>
    </div>
  );
};

export default RegFlashcard;
