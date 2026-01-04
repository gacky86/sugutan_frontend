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

  // フォームで選ばれた登録先となる単語帳
  // 初期値を単語帳一覧の最初の単語帳にする必要がある
  // でregFlashcardTitleをセットする
  // ただし、まだ単語帳がない場合はフォームを表示しないで、フォーム作成用のボタンを表示する
  const regFlashcardTitle = useSelector(
    (state: RootState) => state.dictionary.regFlashcardTitle
  );
  // flashcardSlice.flashcardsにユーザーが持つ単語帳を取得する
  useEffect(() => {
    dispatch(fetchFlashcards());
  }, [dispatch]);
  // flashcardSlice.flashcards取得
  const flashcards = useSelector(
    (state: RootState) => state.flashcards.flashcards
  );
  // flashcardSlice.flashcardsのtitleだけを抜き出してstateに保持
  const extractFlashcardTitles = (flashcards: Flashcard[]): string[] => {
    return flashcards.map((flashcard) => flashcard.title);
  };
  // flashcardSlice.flashcardsが更新されたら、本コンポーネント内で定義している
  // セレクタフォームのオプションに使う単語帳のtitle一覧のリストを更新する
  useEffect(() => {
    setFlashcardTitles(extractFlashcardTitles(flashcards));
    if (flashcards.length > 0) {
      dispatch(setRegFlashcardTitle(flashcards[0].title));
    }
  }, [flashcards, dispatch]);

  return (
    <div>
      {flashcards.length > 0 ? (
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
      ) : (
        <>
          <p>単語帳がまだありません</p>
        </>
      )}
    </div>
  );
};

export default SelectFlashcardForm;
