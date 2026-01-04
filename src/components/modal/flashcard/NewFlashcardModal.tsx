import { AxiosError } from "axios";
import { useState } from "react";

// types
import type { FlashcardParams, RailsErrorResponse } from "@/types";

// components
import TextInput from "@/components/uis/common/TextInput";
import SubmitButton from "@/components/uis/common/SubmitButton";
import { createFlashcard } from "@/api/flashcard";

// redux
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";
import { addFlashcard } from "@/stores/flashcardsSlice";

const NewFlashcardModal = () => {
  // ============= State定義 開始 ==============
  const [title, setTitle] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: "",
  });
  const [description, setDescription] = useState<{
    lengthCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    input: "",
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
    const params: FlashcardParams = {
      title: title.input,
      description: description.input,
      language: "EN",
      iconColor: "red",
    };
    try {
      const res = await createFlashcard(params);

      if (res.status === 200) {
        dispatch(closeModal());
        // fetchFlashcards(非同期処理)をせずに、先にUIだけ更新できる(楽観的UI)
        dispatch(addFlashcard(res.data));
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
        <div className="mx-auto my-10 max-w-[600px]">
          <TextInput
            label="Title"
            name="title"
            placeholder="単語帳のタイトルを入力"
            id="title"
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
          <SubmitButton text="作成" disabled={false} />
        </div>
      </form>
    </div>
  );
};

export default NewFlashcardModal;
