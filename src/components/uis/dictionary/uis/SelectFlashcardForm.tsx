// 検索結果カード内の単語帳へ登録ボタンを押下した際に、登録先となる単語帳を選ぶフォーム
// 登録先単語帳はdictionarySlice内のregFlashcardで管理する

// react
import { useState, useEffect } from "react";
// redux
import type { RootState, AppDispatch } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { setRegFlashcardTitle } from "@/stores/dictionarySlice";
import { fetchFlashcards } from "@/stores/flashcardsSlice";
// types
import type { Flashcard } from "@/types";

const SelectFlashcardForm = () => {
  const [flashcardTitles, setFlashcardTitles] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const regFlashcardTitle = useSelector(
    (state: RootState) => state.dictionary.regFlashcardTitle
  );

  const flashcards = useSelector(
    (state: RootState) => state.flashcards.flashcards
  );
  const extractFlashcardTitles = (flashcards: Flashcard[]): string[] => {
    return flashcards.map((flashcard) => flashcard.title);
  };

  useEffect(() => {
    dispatch(fetchFlashcards());
  }, [dispatch]);

  useEffect(() => {
    setFlashcardTitles(extractFlashcardTitles(flashcards));
  }, [flashcards]);

  return (
    <div>
      <select
        id="flashcardTitleList"
        name="flashcardTitleList"
        value={regFlashcardTitle}
        onChange={(e) => dispatch(setRegFlashcardTitle(e.target.value))}
        className="w-full border border-gray-300 rounded p-2 duration-300
            hover:border-purple-400 hover:shadow-lg hover:shadow-purple-300/30
            focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/30"
      >
        {flashcardTitles.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFlashcardForm;
