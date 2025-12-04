// types
import type { Flashcard } from "@/types/index";
// components
import MainButton from "@/components/uis/common/MainButton";
// redux
import { openModal, closeModal } from "@/stores/modalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
  flashcard: Flashcard;
};

const FlashcardDetailModal = ({ flashcard }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl mt-4">{flashcard.title}</h1>
        <div className="text-sm text-gray-500">
          <p>設定言語:{flashcard.language}</p>
          <p>{flashcard.description}</p>
        </div>
      </div>
      <div className="mx-auto mt-3 flex justify-between text-sm text-gray-500 max-w-[300px]">
        <p>登録されているカード数:120枚</p>
        <p>最終学習日:3日前</p>
      </div>
      <div className="mx-auto mt-10 w-[60%]">
        <MainButton
          text="Inputモードで学習"
          disabled={false}
          onClick={() => {
            console.log("clicked");
          }}
        />
        <MainButton
          text="Outputモードで学習"
          disabled={false}
          onClick={() => {
            console.log("clicked");
          }}
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
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default FlashcardDetailModal;
