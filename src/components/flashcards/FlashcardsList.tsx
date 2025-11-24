// ユーザーの単語帳一覧をreduxで定義したfetchFlashcardで取得し、state経由で受け取り、FlashcardCardに渡して、単語帳の一覧を表示する
import { useEffect } from "react";
// react-icon
import { FaBook } from "react-icons/fa";
// components
import FlashcardsCard from "@/components/flashcards/FlashcardsCard";
import PageTitle from "@/components/common/PageTitle";
// redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/stores/index";
import { fetchFlashcards } from "@/stores/flashcardsSlice";

const FlashcardsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const flashcards = useSelector(
    (state: RootState) => state.flashcards.flashcards
  );

  useEffect(() => {
    dispatch(fetchFlashcards());
  }, [dispatch]);

  return (
    <div>
      <PageTitle text="単語帳一覧" icon={FaBook} />
      <div className="flex flex-wrap gap-4 m-4">
        {flashcards.length > 0 ? (
          flashcards.map((flashcard, key) => {
            return <FlashcardsCard key={key} flashcard={flashcard} />;
          })
        ) : (
          <>
            <h3 className="text-center">単語帳がまだありません。</h3>
            <h3 className="text-center">
              右下の作成ボタンから単語帳を作成してください。
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default FlashcardsList;
