import type { Flashcard } from "@/types/index";
import { useDispatch } from "react-redux";
import { openModal } from "@/stores/modalSlice";
import { limitString } from "@/utils/limitString";
import { getLanguageName } from "@/utils/langNameMapper";
type Props = { flashcard: Flashcard };

const FlashcardsCard = ({ flashcard }: Props) => {
  const dispatch = useDispatch();

  return (
    // 単語帳リストのカードを押下時に、押下された単語帳に対応する単語帳詳細モーダルを表示する。
    // modalSliceのstateに対応するflashcardの情報を渡す。
    <div
      className="rounded-lg border border-gray-300 shadow-md w-[300px] h-[110px] bg-white p-1 cursor-pointer"
      onClick={() =>
        dispatch(
          openModal({ modalContent: "flashcardDetail", modalProps: flashcard })
        )
      }
    >
      {/* タイトル */}
      <h1 className="text-xl">{flashcard.title}</h1>
      {/* カード単語帳詳細 */}
      <div className="text-sm text-gray-500">
        <p>{limitString(flashcard.description, 30)}</p>
        <div className="grid grid-cols-2 grid-rows-2 gap-0 ml-1 mt-1">
          <div>
            <p>登録枚数: {flashcard.cardsCount}枚</p>
          </div>
          <div>
            <p>最終学習日: {flashcard.lastReviewedDaysAgo ?? "-"}日前</p>
          </div>
          <div>
            <p>設定言語: {getLanguageName(flashcard.language)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsCard;
