import { AxiosError } from "axios";
import { useState } from "react";

// types
import type { Flashcard, FlashcardParams, RailsErrorResponse } from "@/types";

// components
import TextInput from "@/components/uis/common/TextInput";
import SubmitButton from "@/components/uis/common/SubmitButton";
import DeleteButton from "@/components/uis/common/DeleteButton";
import { updateFlashcard, deleteFlashcard } from "@/api/flashcard";

// redux
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/stores/modalSlice";
import { editFlashcard, removeFlashcard } from "@/stores/flashcardsSlice";

const EditFlashcardModal = ({ flashcard }: { flashcard: Flashcard }) => {
  const dispatch = useDispatch();

  // ============= State定義 開始 ==============
  const [title, setTitle] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: flashcard.title,
  });
  const [description, setDescription] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: flashcard.description,
  });
  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    hasError: boolean;
  }>({
    message: "",
    hasError: false,
  });
  // ============= State定義 終了 ==============

  // ============= 更新ボタン押下時関数 開始 ==============

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: FlashcardParams = {
      title: title.input,
      description: description.input,
      language: "EN",
      iconColor: "red",
    };
    try {
      const res = await updateFlashcard(flashcard.id, params);
      console.log(res);

      if (res.status === 200) {
        dispatch(
          openModal({ modalContent: "flashcardDetail", modalProps: res.data })
        );
        // fetchFlashcards(非同期処理)をせずに、先にUIだけ更新できる(楽観的UI)
        dispatch(editFlashcard(res.data));
      } else {
        console.log("flashcard edit error");
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
  // ============= 更新ボタン押下時関数 終了 ==============

  // ============= 削除ボタン押下時関数 開始 ==============
  const handleDelete = async () => {
    try {
      const res = await deleteFlashcard(flashcard.id);
      if (res.status === 200) {
        // モーダルを閉じる
        dispatch(closeModal());
        // fetchFlashcards(非同期処理)をせずに、先にUIだけ更新できる(楽観的UI)
        dispatch(removeFlashcard(flashcard));
      } else {
        console.log("flashcard delete error");
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
        <h1 className="text-2xl mt-4">単語帳編集</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto my-10 max-w-[600px]">
          <TextInput
            label="Title"
            name="title"
            id="title"
            placeholder="単語帳のタイトルを入力"
            maxLength={25}
            text={title}
            setText={setTitle}
          />
          <TextInput
            label="Description"
            name="description"
            placeholder="単語帳の説明を入力（任意）"
            id="description"
            maxLength={120}
            text={description}
            setText={setDescription}
          />
        </div>
        {errorMessage.hasError === true && (
          <p className="text-sm text-red-600">{errorMessage.message}</p>
        )}
        {/* Submitボタン */}
        <div className="mx-auto my-6 max-w-[200px]">
          <SubmitButton text="更新" disabled={false} />
        </div>
        {/* deleteボタン */}
      </form>
      <div className="mx-auto my-6 max-w-[200px]">
        <DeleteButton
          text="単語帳を削除"
          handleDelete={handleDelete}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default EditFlashcardModal;
