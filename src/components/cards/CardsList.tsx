import { useParams } from "react-router-dom";
import { useEffect } from "react";

// react-icons
import { PiCardsThin } from "react-icons/pi";
import { IoMdAddCircle } from "react-icons/io";
// components
import CardsTable from "@/components/cards/CardsTable";
import PageTitle from "@/components/common/PageTitle";

// redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/stores/index";
import { fetchCards } from "@/stores/cardsSlice";
import { openModal } from "@/stores/modalSlice";

// functions
import { selectFlashcardById } from "@/utils/selectors";

const CardsList = () => {
  // pathで指定されているFlashcardのidを受け取る
  const { id } = useParams();
  const flashcardId = Number(id);

  // Cardの一覧を取得する非同期処理
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.cards.cards);
  useEffect(() => {
    dispatch(fetchCards(flashcardId));
  }, [dispatch, flashcardId]);

  // stateで保持しているflashcardsからflashcardIdを指定してflashcard取得する
  const flashcard = useSelector(selectFlashcardById(Number(id)));

  return (
    <div>
      {flashcard ? (
        <>
          <PageTitle
            text={`${flashcard.title} 登録カード一覧`}
            icon={PiCardsThin}
          />
          {cards.length > 0 ? (
            <CardsTable flashcard={flashcard} cards={cards} />
          ) : (
            <>
              <h3 className="text-center">カードがまだありません。</h3>
              <h3 className="text-center">
                右下の作成ボタンからカードを作成するか、辞書機能からカードを登録してください。
              </h3>
            </>
          )}
          {/* 単語カード作成モーダルを開く */}
          <div
            className="flex items-center absolute bottom-15 right-15 cursor-pointer"
            onClick={() =>
              dispatch(
                openModal({ modalContent: "newCard", modalProps: flashcard })
              )
            }
          >
            <IoMdAddCircle className="text-4xl text-blue-500" />
            <p className="text-lg">単語カードを追加</p>
          </div>
        </>
      ) : (
        <h3 className="text-center">
          この単語帳は既に削除された可能性があります。
        </h3>
      )}
    </div>
  );
};

export default CardsList;
