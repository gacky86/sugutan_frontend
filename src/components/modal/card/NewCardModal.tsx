import { AxiosError } from "axios";
import { useState } from "react";
// types
import type { Flashcard, RailsErrorResponse } from "@/types";
// components
import SubmitButton from "@/components/uis/common/SubmitButton";
import CardsInputForm from "@/components/modal/card/uis/CardsInputForm";
import ExtraNoteInputForm from "@/components/modal/card/uis/ExtraNoteInputForm";
// functions
import { createCard } from "@/api/card";
import { createExtraNote } from "@/api/extraNote";
// redux
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";
import { addCard } from "@/stores/cardsSlice";

// utils
import { buildCardParams } from "@/utils/buildCardParams";
import { buildExtraNoteParams } from "@/utils/buildExtraNoteParams";
// custom hook
import { useCardForm } from "@/hooks/useCardForm";
import { useExtraNotesForm } from "@/hooks/useExtraNoteForm";
import clsx from "clsx";
import ModalTitle from "@/components/uis/common/ModalTitle";

const NewCardModal = ({ flashcard }: { flashcard: Flashcard }) => {
  const dispatch = useDispatch();
  const { fields, updateField } = useCardForm();
  const { notes, updateNoteField, addNote, deleteNote } = useExtraNotesForm();

  // エラーの表示・非表示を切り替えるstate
  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    hasError: boolean;
  }>({
    message: "",
    hasError: false,
  });

  // ============= ボタン押下時関数 開始 ==============
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = buildCardParams(fields);
    try {
      const res = await createCard(flashcard.id, params);
      if (res.status === 200) {
        dispatch(closeModal());
        // fetchFlashcards(非同期処理)をせずに、先にUIだけ更新できる(楽観的UI)
        dispatch(addCard(res.data));
        // cardの作成が正常終了した場合、extra_noteの作成を行う
        for (const fields of notes) {
          const params = buildExtraNoteParams(fields);
          await createExtraNote(res.data.id, params);
        }
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
        <ModalTitle title="単語カード作成" />
      </div>
      <form onSubmit={handleSubmit}>
        {/* カード入力項目 */}
        <div className="mx-auto my-10 max-w-[600px]">
          <CardsInputForm fields={fields} updateField={updateField} />
        </div>
        {errorMessage.hasError === true && (
          <p className="text-sm text-red-600">{errorMessage.message}</p>
        )}
        {/* Extra note入力項目 */}
        <div className="mx-auto max-w-[600px]">
          <div className="border-t border-gray-300 mt-8 mb-6 relative">
            <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-gray-500">
              Extra notes
            </p>
          </div>
          {notes.map((fields, index) => (
            <ExtraNoteInputForm
              key={index}
              fields={fields}
              index={index}
              updateField={updateNoteField}
              removeNote={() => deleteNote(index)}
            />
          ))}
          <button
            type="button"
            disabled={notes.length > 5}
            onClick={() => addNote()}
            className={clsx(
              notes.length > 5
                ? "border border-gray-500"
                : "border border-red-500  hover:bg-red-500 hover:text-white duration-300",
              "py-1 rounded-sm w-[140px] text-center text-gray-500",
            )}
          >
            + Add Extra note
          </button>
        </div>
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
              !fields.backSentence.lengthCheck
            }
          />
        </div>
      </form>
    </div>
  );
};

export default NewCardModal;
