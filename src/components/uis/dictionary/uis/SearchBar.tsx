// import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import TextInput from "../../common/TextInput";
import { useState } from "react";

const SearchBar = () => {
  const [text, setText] = useState({ input: "", lengthCheck: true });
  const [dictionaryMode, setDictionaryMode] = useState<"search" | "translate">(
    "search"
  );
  return (
    <div className="mx-6">
      <div className="flex items-center gap-2 text-lg justify-center">
        <p>日本語</p>
        <div className="" onClick={() => setDictionaryMode("translate")}>
          {dictionaryMode === "search" ? <FaArrowRight /> : <FaArrowRight />}
        </div>
        <p>English</p>
      </div>
      <div className="relative mt-4">
        <TextInput
          label=""
          name="search"
          id="search"
          placeholder="英語で表現したい単語・フレーズを入力"
          maxLength={256}
          text={text}
          setText={setText}
        />
        <button className="border-indigo-400 text-indigo-500 border rounded-md px-1 absolute right-1 top-[5px] hover:bg-indigo-400 hover:text-white duration-300">
          検索
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
