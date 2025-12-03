import { useState } from "react";
import type { ExtraNoteInputState, FieldState, ExtraNote } from "@/types";
import { extraNoteTypes } from "@/types";

export const useExtraNotesForm = (extraNotes?: ExtraNote[]) => {
  // 以下の両方のパターンに対応
  // 引数extraNoteがある場合（編集時）のstate初期値
  // 引数extraNoteがない場合（新規作成時）のstate初期値
  const buildInitialState = (extraNotes?: ExtraNote[]): ExtraNoteInputState[] =>
    extraNotes && extraNotes.length > 0
      ? extraNotes.map((note) => ({
          id: note.id,
          noteType: { input: note.noteType, lengthCheck: true },
          content: { input: note.content, lengthCheck: true },
        }))
      : [
          {
            noteType: { input: extraNoteTypes[0], lengthCheck: true },
            content: { input: "", lengthCheck: true },
          },
        ];

  const [notes, setNotes] = useState<ExtraNoteInputState[]>(
    buildInitialState(extraNotes)
  );

  // 編集モーダルにて、非同期的にextraNotesが取得された場合に、useEffect内で実行する関数
  // 非同期的に取得されたextraNotesをnotes stateにsetする。
  const resetNotes = (extraNotes?: ExtraNote[]) => {
    setNotes(buildInitialState(extraNotes));
  };

  const updateNoteField = (
    index: number,
    name: keyof ExtraNoteInputState,
    value: FieldState
  ) => {
    setNotes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const addNote = () => {
    const newNote: ExtraNoteInputState = {
      noteType: { input: extraNoteTypes[0], lengthCheck: true },
      content: { input: "", lengthCheck: true },
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  return { notes, updateNoteField, addNote, deleteNote, resetNotes };
};
