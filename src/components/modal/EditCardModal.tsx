import { AxiosError } from "axios";
import { useState } from "react";
// types
import type {
  Card,
  CardParams,
  Flashcard,
  RailsErrorResponse,
  FieldState,
  CardInputState,
} from "@/types";
// components
import SubmitButton from "@/components/common/SubmitButton";
import CardsInputForm from "@/components/common/CardsInputForm";
// functions
import { deleteCard, updateCard } from "@/api/card";
// redux
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";
import { editCard, removeCard } from "@/stores/cardsSlice";
import DeleteButton from "../common/DeleteButton";

const EditCardModal = ({
  flashcard,
  card,
}: {
  flashcard: Flashcard;
  card: Card;
}) => {
  const dispatch = useDispatch();
  // ============= State定義 開始 ==============
  const initialState: CardInputState = {
    front: { input: card.front, lengthCheck: true },
    back: { input: card.back, lengthCheck: true },
    frontSentence: { input: card.frontSentence, lengthCheck: true },
    backSentence: { input: card.backSentence, lengthCheck: true },
    explanationFront: { input: card.explanationFront, lengthCheck: true },
    explanationBack: { input: card.explanationBack, lengthCheck: true },
    cardType: { input: card.cardType, lengthCheck: true },
  };
  const [fields, setFields] = useState<CardInputState>(initialState);

  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    hasError: boolean;
  }>({
    message: "",
    hasError: false,
  });
  // ============= State定義 終了 ==============

  // ============= fields更新用関数 開始 =============
  const updateField = (name: keyof CardInputState, value: FieldState) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // ============= fields更新用関数 終了 =============

  // ============= ボタン押下時関数 開始 ==============
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: CardParams = {
      front: fields.front.input,
      back: fields.back.input,
      frontSentence: fields.frontSentence.input,
      backSentence: fields.backSentence.input,
      explanationFront: fields.explanationFront.input,
      explanationBack: fields.explanationBack.input,
      cardType: fields.cardType.input,
    };
    try {
      const res = await updateCard(flashcard.id, card.id, params);
      if (res.status === 200) {
        dispatch(closeModal());
        // 先にUIだけ更新できる(楽観的UI)
        dispatch(editCard(res.data));
      } else {
        console.log("card create error");
      }
      // エラー処理
    } catch (err) {
      const error = err as AxiosError<RailsErrorResponse>;
      const message =
        error.response?.data?.error ||
        "エラーが発生しました。もう一度やり直してください。";
      setErrorMessage({
        message: message,
        hasError: true,
      });
    }
  };
  // ============= ボタン押下時関数 終了 ==============

  // ============= 削除ボタン押下時関数 開始 ==============
  const handleDelete = async () => {
    try {
      const res = await deleteCard(flashcard.id, card.id);
      if (res.status === 200) {
        // モーダルを閉じる
        dispatch(closeModal());
        // fetchFlashcards(非同期処理)をせずに、先にUIだけ更新できる(楽観的UI)
        dispatch(removeCard(card));
      } else {
        console.log("card delete error");
      }
      // エラー処理
    } catch (err) {
      const error = err as AxiosError<RailsErrorResponse>;
      const message =
        error.response?.data?.error ||
        "エラーが発生しました。もう一度やり直してください。";
      setErrorMessage({
        message: message,
        hasError: true,
      });
    }
  };
  // ============= 削除ボタン押下時関数 終了 ==============

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl mt-4">単語カード編集</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto my-10 max-w-[600px]">
          <CardsInputForm fields={fields} updateField={updateField} />
        </div>
        {errorMessage.hasError === true && (
          <p className="text-sm text-red-600">{errorMessage.message}</p>
        )}
        {/* Submitボタン */}
        <div className="mx-auto my-6 max-w-[200px]">
          <SubmitButton
            text="更新"
            disabled={
              !fields.front.input ||
              !fields.back.input ||
              !fields.frontSentence.input ||
              !fields.backSentence.input
            }
          />
        </div>
      </form>
      <div className="mx-auto my-6 max-w-[200px]">
        <DeleteButton
          text="カードを削除"
          handleDelete={handleDelete}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default EditCardModal;
