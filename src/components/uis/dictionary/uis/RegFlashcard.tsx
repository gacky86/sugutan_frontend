import { FaBook } from "react-icons/fa";

import SelectFlashcardForm from "@/components/uis/dictionary/uis/SelectFlashcardForm";

const RegFlashcard = () => {
  return (
    <div className="mt-3">
      <h2 className="text-base">登録先の単語帳</h2>
      <div className="flex items-center">
        <FaBook className="text-2xl mr-3" />
        <SelectFlashcardForm />
      </div>
    </div>
  );
};

export default RegFlashcard;
