import { AxiosError } from "axios";
import { useEffect, useState } from "react";
// types
import { type Card, type Flashcard, type RailsErrorResponse } from "@/types";
// components
import SubmitButton from "@/components/uis/common/SubmitButton";
import CardsInputForm from "@/components/modal/card/uis/CardsInputForm";
import ExtraNoteInputForm from "@/components/modal/card/uis/ExtraNoteInputForm";

// functions
import { deleteCard, updateCard } from "@/api/card";
import { getExtraNotesList } from "@/api/extraNote";
import {
  createExtraNote,
  deleteExtraNote,
  updateExtraNote,
} from "@/api/extraNote";
// redux
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";
import { editCard, removeCard } from "@/stores/cardsSlice";
import DeleteButton from "../../uis/common/DeleteButton";

// custom hook
import { useCardForm } from "@/hooks/useCardForm";
import { useExtraNotesForm } from "@/hooks/useExtraNoteForm";
// utils
import { buildCardParams } from "@/utils/buildCardParams";
import { buildExtraNoteParams } from "@/utils/buildExtraNoteParams";
import clsx from "clsx";

const EditCardModal = ({
  flashcard,
  card,
}: {
  flashcard: Flashcard;
  card: Card;
}) => {
  const dispatch = useDispatch();

  // cardが持っているextraNotesの一覧の取得
  const [extraNotes, setExtraNotes] = useState([]);
  const handleGetExtraNotesList = async () => {
    try {
      const res = await getExtraNotesList(card.id);
      setExtraNotes(res.data);
    } catch (err) {
      const error = err as AxiosError<RailsErrorResponse>;
      console.log(error);
    }
  };

  const { fields, updateField } = useCardForm(card);
  const {
    notes,
    deleteNoteIds,
    updateNoteField,
    addNote,
    deleteNote,
    resetNotes,
  } = useExtraNotesForm(extraNotes);

  useEffect(() => {
    handleGetExtraNotesList();
  }, [card.id]);

  useEffect(() => {
    resetNotes(extraNotes);
  }, [extraNotes]);

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
      const res = await updateCard(flashcard.id, card.id, params);
      if (res.status === 200) {
        dispatch(closeModal());
        // 先にUIだけ更新できる(楽観的UI)
        dispatch(editCard(res.data));
        console.log("cardの更新完了");

        // cardの更新が正常終了した場合、extra_noteの更新・削除・作成を行う
        await handleExtraNotesSubmit(res.data.id);
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

  // ============= ボタン押下時関数(ExtraNotesAPI処理) 開始 ==============
  const handleExtraNotesSubmit = async (cardId: number) => {
    try {
      // ----------------------------------------
      // 1. 削除処理
      // ----------------------------------------
      for (const noteId of deleteNoteIds) {
        await deleteExtraNote(cardId, noteId);
      }

      // ----------------------------------------
      // 2. notes を「既存」「新規」に振り分け
      // ----------------------------------------
      const existingNotes = notes.filter((n) => "id" in n && n.id);
      const newNotes = notes.filter((n) => !("id" in n));

      // ----------------------------------------
      // 3. 既存 Note の更新
      // ----------------------------------------
      for (const note of existingNotes) {
        const params = buildExtraNoteParams(note);
        await updateExtraNote(cardId, note.id!, params);
      }

      // ----------------------------------------
      // 4. 新規 Note の作成
      // ----------------------------------------
      for (const note of newNotes) {
        const params = buildExtraNoteParams(note);
        await createExtraNote(cardId, params);
      }

      console.log("extra note の更新が完了しました");
    } catch (err) {
      console.error("extra note update error", err);
      throw err; // 呼び出し元 handleSubmit 側でエラーハンドリング可能
    }
  };
  // ============= ボタン押下時関数(ExtraNotesAPI処理) 終了 ==============

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
              "py-1 rounded-sm w-[140px] text-center text-gray-500"
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
              !fields.backSentence.lengthCheck ||
              !fields.explanationFront.lengthCheck ||
              !fields.explanationBack.lengthCheck
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
