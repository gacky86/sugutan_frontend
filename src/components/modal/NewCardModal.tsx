import { AxiosError } from "axios";
import { useState } from "react";
// types
import type {
  CardParams,
  Flashcard,
  RailsErrorResponse,
  FieldState,
  CardInputState,
  ExtraNoteInputState,
  ExtraNoteParams,
  Card,
} from "@/types";
import { cardTypes, extraNoteTypes } from "@/types/index";
// components
import SubmitButton from "@/components/common/SubmitButton";
import CardsInputForm from "@/components/cards/CardsInputForm";
import ExtraNoteInputForm from "@/components/extraNotes/ExtraNoteInputForm";
// functions
import { createCard } from "@/api/card";
// redux
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";
import { addCard } from "@/stores/cardsSlice";
import { createExtraNote } from "@/api/extraNote";

const NewCardModal = ({ flashcard }: { flashcard: Flashcard }) => {
  const dispatch = useDispatch();
  // ============= State定義 開始 ==============
  // cardの入力を管理するstateの初期値
  const initialState: CardInputState = {
    front: { input: "", lengthCheck: true },
    back: { input: "", lengthCheck: true },
    frontSentence: { input: "", lengthCheck: true },
    backSentence: { input: "", lengthCheck: true },
    explanationFront: { input: "", lengthCheck: true },
    explanationBack: { input: "", lengthCheck: true },
    cardType: { input: cardTypes[0], lengthCheck: true },
  };
  // cardの入力を管理するstate
  const [fields, setFields] = useState<CardInputState>(initialState);

  // エラーの表示・非表示を切り替えるstate
  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    hasError: boolean;
  }>({
    message: "",
    hasError: false,
  });

  // extra_inputの入力を管理するstateの型
  const extraNoteInitialState: ExtraNoteInputState = {
    noteType: { input: extraNoteTypes[0], lengthCheck: true },
    content: { input: "", lengthCheck: true },
  };
  // extra_inputの入力を管理するstate
  const [extraNoteFieldsList, setExtraNoteFieldsList] = useState<
    ExtraNoteInputState[]
  >([extraNoteInitialState]);
  // ============= State定義 終了 ==============

  // ============= fields更新用関数 開始 =============
  const updateField = (name: keyof CardInputState, value: FieldState) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // ============= fields更新用関数 終了 =============

  // ============= extra_note関連関数 開始 =============
  const updateExtraNoteField = (
    index: number,
    name: keyof ExtraNoteInputState,
    value: FieldState
  ) => {
    setExtraNoteFieldsList((prev) =>
      prev.map((note, i) => (i === index ? { ...note, [name]: value } : note))
    );
  };
  const addExtraNote = () => {
    setExtraNoteFieldsList((prev) => [...prev, extraNoteInitialState]);
  };
  const removeExtraNote = (index: number) => {
    setExtraNoteFieldsList((prev) => prev.filter((_, i) => i !== index));
  };
  // ============= fields更新用関数(extra_note) 終了 =============

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
        // cardの作成が正常終了した場合、extra_noteの作成を行う
        handleExtraNoteSubmitAll(res.data);
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
  // cardの作成のあと、resからcard.idを取得し、extra_noteの作成を行うための関数
  // const handleExtraNoteSubmit = async (card: Card) => {
  //   const params: ExtraNoteParams = {
  //     noteType: extraNoteFields.noteType.input,
  //     content: extraNoteFields.content.input,
  //   };
  //   try {
  //     const res = await createExtraNote(card.id, params);
  //     if (res.status === 200) {
  //       console.log(res);
  //     } else {
  //       console.log("extranote create error");
  //     }
  //     // エラー処理
  //   } catch (err) {
  //     const error = err as AxiosError<RailsErrorResponse>;
  //     const message =
  //       error.response?.data?.error ||
  //       "エラーが発生しました。もう一度やり直してください。";
  //     setErrorMessage({
  //       message: message,
  //       hasError: true,
  //     });
  //   }
  // };
  const handleExtraNoteSubmitAll = async (card: Card) => {
    for (const fields of extraNoteFieldsList) {
      const params: ExtraNoteParams = {
        noteType: fields.noteType.input,
        content: fields.content.input,
      };
      await createExtraNote(card.id, params);
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
        {/* Extra note入力項目 */}
        <div className="mx-auto my-10 max-w-[600px]">
          {extraNoteFieldsList.map((fields, index) => (
            <ExtraNoteInputForm
              key={index}
              fields={fields}
              index={index}
              updateField={updateExtraNoteField}
              removeNote={() => removeExtraNote(index)}
            />
          ))}
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
      <button onClick={() => addExtraNote()}>追加を追加</button>
    </div>
  );
};

export default NewCardModal;
