// types
import type { Flashcard } from "@/types/index";
// components
import MainButton from "@/components/uis/common/MainButton";
// redux
import { openModal, closeModal } from "@/stores/modalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeCardProgresses } from "@/api/cardProgress";
import { setFlashcard, setMode } from "@/stores/learningSlice";
import ModalTitle from "@/components/uis/common/ModalTitle";
// import { getLanguageName } from "@/utils/langNameMapper";

type Props = {
  flashcard: Flashcard;
};

const FlashcardDetailModal = ({ flashcard }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Flashcard中のCardに対するCardProgressの初期化(CardにCardProgressがなければ初期化をして準備する)
  // を行い、学習ページに遷移させる
  // 学習モードを設定する
  const startLearning = (mode: "input" | "output") => {
    initializeCardProgresses(flashcard.id, mode);
    dispatch(setMode(mode));
    dispatch(setFlashcard(flashcard));
    dispatch(closeModal());
    navigate("/learning");
  };

  return (
    <div>
      <div className="text-center">
        <ModalTitle title={flashcard.title} />
        <div className="text-sm text-gray-500">
          {/* <p>設定言語: {getLanguageName(flashcard.language)}</p> */}
          <p>{flashcard.description}</p>
        </div>
      </div>
      <div className="mx-auto mt-3 flex justify-between text-sm text-gray-500 max-w-[300px]">
        <p>登録されているカード数: {flashcard.cardsCount}枚</p>
        <p>最終学習日: {flashcard.lastReviewedDaysAgo ?? "-"}日前</p>
      </div>
      <div className="mx-auto mt-10 w-[60%]">
        <MainButton
          text="Inputモードで学習"
          disabled={false}
          onClick={() => startLearning("input")}
        />
        <MainButton
          text="Outputモードで学習"
          disabled={false}
          onClick={() => startLearning("output")}
        />
      </div>
      <div className="mx-auto my-5 w-[60%]">
        <MainButton
          text="登録カードの管理"
          disabled={false}
          onClick={() => {
            navigate(`/flashcards/${flashcard.id}/cards`);
            dispatch(closeModal());
          }}
        />
        <MainButton
          text="単語帳設定"
          disabled={false}
          onClick={() => {
            dispatch(
              openModal({
                modalContent: "editFlashcard",
                modalProps: flashcard,
              }),
            );
          }}
        />
      </div>
    </div>
  );
};

export default FlashcardDetailModal;
