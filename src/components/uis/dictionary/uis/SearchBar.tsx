// import { FaArrowLeft } from "react-icons/fa";
import TextInput from "../../common/TextInput";
import { useState } from "react";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores/index";
import { getGeminiResults } from "@/stores/dictionarySlice";

const SearchBar = () => {
  const [text, setText] = useState({ input: "", lengthCheck: true });
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mx-6">
      <div className="relative mt-4">
        <TextInput
          label=""
          name="search"
          id="search"
          placeholder="調べたい単語・フレーズを英語または日本語で入力"
          maxLength={256}
          text={text}
          setText={setText}
        />
        <button
          className="border-indigo-400 text-indigo-500 bg-white border rounded-md px-1 absolute right-1 top-[5px] hover:bg-indigo-400 hover:text-white duration-300 cursor-pointer"
          onClick={() => dispatch(getGeminiResults(text.input))}
        >
          検索
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
