import { FaBook } from "react-icons/fa";

import SelectFlashcardForm from "@/components/uis/dictionary/uis/SelectFlashcardForm";

const RegFlashcard = () => {
  return (
    <div className="mt-3">
      <div className="flex items-center">
        <FaBook className="text-lg mr-1" />
        <SelectFlashcardForm />
      </div>
    </div>
  );
};

export default RegFlashcard;
