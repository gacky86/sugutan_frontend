import { FaBook } from "react-icons/fa";
import { useState } from "react";
import SelectInput from "../../common/SelectInput";
const RegFlashcard = () => {
  const [text, setText] = useState({ input: "", lengthCheck: true });
  return (
    <div className="mt-3">
      <h2 className="text-xl">登録先の単語帳</h2>
      <div className="flex items-center">
        <FaBook className="text-2xl mr-3" />
        <SelectInput
          label=""
          name=""
          id=""
          options={["english words", "Deutsch Wörter"]}
          text={text}
          setText={setText}
        />
      </div>
    </div>
  );
};

export default RegFlashcard;
