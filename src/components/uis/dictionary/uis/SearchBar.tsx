// import { FaArrowLeft } from "react-icons/fa";
import TextInput from "../../common/TextInput";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores/index";
import { getGeminiResults } from "@/stores/dictionarySlice";

const SearchBar = () => {
  const [text, setText] = useState({ input: "", lengthCheck: true });
  const [isInputErrMsgVisible, setIsInputErrMsgVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleGetGeminiResults = () => {
    if (text.input === "") {
      setIsInputErrMsgVisible(true);
    } else {
      dispatch(getGeminiResults(text.input));
    }
  };

  useEffect(() => {
    setIsInputErrMsgVisible(false);
  }, [text]);

  return (
    <div className="mx-6">
      <div className="relative mt-4">
        <TextInput
          label=""
          name="search"
          id="search"
          placeholder="単語・フレーズを入力(日本語 / English)"
          maxLength={256}
          text={text}
          setText={setText}
        />
        <button
          className="border-indigo-400 text-indigo-500 bg-white border rounded-md px-1 absolute right-1 top-[5px] hover:bg-indigo-400 hover:text-white duration-300 cursor-pointer"
          onClick={() => handleGetGeminiResults()}
          aria-label="辞書検索"
        >
          検索
        </button>
      </div>
      {isInputErrMsgVisible && (
        <p className="text-red-600">検索ワードを入力してください</p>
      )}
    </div>
  );
};

export default SearchBar;
