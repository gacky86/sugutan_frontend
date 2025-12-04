// ユーザーの単語帳一覧をreduxで定義したfetchFlashcardで取得し、state経由で受け取り、FlashcardCardに渡して、単語帳の一覧を表示する
import { useEffect } from "react";
// react-icon
import { FaBook } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
// components
import FlashcardsCard from "@/components/uis/flashcards/uis/FlashcardsCard";
import PageTitle from "@/components/uis/common/PageTitle";
// redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/stores/index";
import { fetchFlashcards } from "@/stores/flashcardsSlice";
import { openModal } from "@/stores/modalSlice";

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
      <div className="flex flex-wrap gap-4 m-4 justify-center max-h-[70vh] overflow-y-auto ">
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

      {/* 単語帳作成モーダルを開く */}
      <div
        className="flex items-center absolute bottom-15 right-5 cursor-pointer"
        onClick={() => dispatch(openModal({ modalContent: "newFlashcard" }))}
      >
        <IoMdAddCircle className="text-4xl text-blue-500" />
        <p className="text-lg">単語帳を新規作成</p>
      </div>
    </div>
  );
};

export default FlashcardsList;
