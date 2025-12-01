import { AxiosError } from "axios";
import { useState } from "react";
// types
import type {
  CardParams,
  Flashcard,
  RailsErrorResponse,
  FieldState,
  CardInputState,
} from "@/types";
import { cardTypes } from "@/utils/cardTypes";
// components
import SubmitButton from "@/components/common/SubmitButton";
import CardsInputForm from "@/components/common/CardsInputForm";
// functions
import { createCard } from "@/api/card";
// redux
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";
import { addCard } from "@/stores/cardsSlice";

const NewCardModal = ({ flashcard }: { flashcard: Flashcard }) => {
  const dispatch = useDispatch();
  // ============= State定義 開始 ==============
  const initialState: CardInputState = {
    front: { input: "", lengthCheck: true },
    back: { input: "", lengthCheck: true },
    frontSentence: { input: "", lengthCheck: true },
    backSentence: { input: "", lengthCheck: true },
    explanationFront: { input: "", lengthCheck: true },
    explanationBack: { input: "", lengthCheck: true },
    cardType: { input: cardTypes[0], lengthCheck: true },
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
      const res = await createCard(flashcard.id, params);
      if (res.status === 200) {
        dispatch(closeModal());
        // fetchFlashcards(非同期処理)をせずに、先にUIだけ更新できる(楽観的UI)
        dispatch(addCard(res.data));
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

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl mt-4">単語帳新規作成</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {/* カード入力項目 */}
        <div className="mx-auto my-10 max-w-[600px]">
          <CardsInputForm fields={fields} updateField={updateField} />
        </div>
        {errorMessage.hasError === true && (
          <p className="text-sm text-red-600">{errorMessage.message}</p>
        )}
        {/* Submitボタン */}
        <div className="mx-auto my-6 max-w-[200px]">
          <SubmitButton
            text="作成"
            disabled={
              !fields.front.input ||
              !fields.back.input ||
              !fields.frontSentence.input ||
              !fields.backSentence.input ||
              !fields.front.lengthCheck ||
              !fields.back.lengthCheck ||
              !fields.frontSentence.lengthCheck ||
              !fields.backSentence.lengthCheck ||
              !fields.explanationFront.lengthCheck ||
              !fields.explanationBack.lengthCheck
            }
          />
        </div>
      </form>
    </div>
  );
};

export default NewCardModal;
