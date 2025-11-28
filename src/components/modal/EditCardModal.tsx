import { AxiosError } from "axios";
import { useState } from "react";
// types
import type { Card, CardParams, Flashcard, RailsErrorResponse } from "@/types";
// components
import TextInput from "@/components/common/TextInput";
import SubmitButton from "@/components/common/SubmitButton";
// functions
import { deleteCard, updateCard } from "@/api/card";
// redux
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";
import { editCard, removeCard } from "@/stores/cardsSlice";
import DeleteButton from "../common/DeleteButton";
// import { addFlashcard } from "@/stores/flashcardsSlice";

const EditCardModal = ({
  flashcard,
  card,
}: {
  flashcard: Flashcard;
  card: Card;
}) => {
  // ============= State定義 開始 ==============
  const [front, setFront] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: card.front,
  });
  const [back, setBack] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: card.back,
  });
  const [frontSentence, setFrontSentence] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: card.frontSentence,
  });
  const [backSentence, setBackSentence] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: card.backSentence,
  });
  const [explanation, setExplanation] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: card.explanation,
  });
  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    hasError: boolean;
  }>({
    message: "",
    hasError: false,
  });
  // ============= State定義 終了 ==============

  const dispatch = useDispatch();

  // ============= ボタン押下時関数 開始 ==============
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: CardParams = {
      front: front.input,
      back: back.input,
      frontSentence: frontSentence.input,
      backSentence: backSentence.input,
      explanation: explanation.input,
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
          <TextInput
            label="Japanese"
            name="front"
            id="front"
            maxLength={50}
            text={front}
            setText={setFront}
          />
          <TextInput
            label="English"
            name="back"
            id="back"
            maxLength={50}
            text={back}
            setText={setBack}
          />
          <TextInput
            label="Japanese sentence"
            name="frontSentence"
            id="frontSentence"
            maxLength={50}
            text={frontSentence}
            setText={setFrontSentence}
          />
          <TextInput
            label="English sentence"
            name="backSentence"
            id="backSentence"
            maxLength={50}
            text={backSentence}
            setText={setBackSentence}
          />
          <TextInput
            label="Explanation"
            name="explanation"
            id="explanation"
            maxLength={50}
            text={explanation}
            setText={setExplanation}
          />
        </div>
        {errorMessage.hasError === true && (
          <p className="text-sm text-red-600">{errorMessage.message}</p>
        )}
        {/* Submitボタン */}
        <div className="mx-auto my-6 max-w-[200px]">
          <SubmitButton text="更新" disabled={false} />
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
