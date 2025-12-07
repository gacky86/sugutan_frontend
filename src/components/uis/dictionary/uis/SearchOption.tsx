import { useState } from "react";
import TextAreaInput from "@/components/uis/common/TextAreaInput";

const SearchOption = () => {
  const [text, setText] = useState({ input: "", lengthCheck: true });
  return (
    <div className="border border-gray-400 rounded-lg p-2 mr-4">
      <h2 className="text-gray-500">シチュエーション</h2>
      <TextAreaInput
        label=""
        name="situation"
        id="situation"
        placeholder="単語・表現が使われるシチュエーションを入力"
        maxLength={256}
        text={text}
        setText={setText}
      />
      <div className="mt-3">
        <h2 className="text-gray-500">トーン</h2>
        <div className="flex gap-2">
          <button className="my-2 bg-gray-400 text-white rounded-md p-1">
            カジュアル・会話
          </button>
          <button className="my-2 bg-gray-400 text-white rounded-md p-1">
            フォーマル・文章
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchOption;
