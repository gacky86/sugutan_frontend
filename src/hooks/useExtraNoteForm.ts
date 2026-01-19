import { useState } from "react";
import type { ExtraNoteInputState, FieldState, ExtraNote } from "@/types";
import { extraNoteTypes } from "@/types";
import { convertNoteTypeENtoJP, type NoteTypeEN } from "@/utils/noteTypeMapper";

export const useExtraNotesForm = (extraNotes?: ExtraNote[]) => {
  // 以下の両方のパターンに対応
  // 引数extraNoteがある場合（card編集時に既存のextraNoteがある場合）のstate初期値
  // 引数extraNoteがない場合（card新規作成時またはcard編集時に既存のextraNoteがない場合）のstate初期値
  const buildInitialState = (extraNotes?: ExtraNote[]): ExtraNoteInputState[] =>
    extraNotes && extraNotes.length > 0
      ? extraNotes.map((note) => ({
          id: note.id,
          noteType: {
            input: convertNoteTypeENtoJP(note.noteType as NoteTypeEN),
            lengthCheck: true,
          },
          content: {
            input: note.content,
            lengthCheck: true,
          },
        }))
      : [];

  // extraNotesの初期値を作成
  const [notes, setNotes] = useState<ExtraNoteInputState[]>(
    buildInitialState(extraNotes)
  );

  // extraNotes 削除対象管理用state
  const [deleteNoteIds, setDeleteNoteIds] = useState<number[]>([]);

  // 編集モーダルにて、非同期的にextraNotesが取得された場合に、useEffect内で実行する関数
  // 非同期的に取得されたextraNotesをnotes stateにsetする。
  const resetNotes = (extraNotes?: ExtraNote[]) => {
    setNotes(buildInitialState(extraNotes));
  };

  // extraNotesは1つのcardに対して複数ある可能性があるので
  // ExtraNoteInputState[]でstateで管理している
  // そのリストの中で、何番目のextraNoteか->index
  // 指定されたextraNoteで変更するのは何か->name (noteTypeまたはcontent)
  // ExtraNoteInputFormで受け取った値->value
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

  // extra noteのフォームを削除した際に実行
  // ここで受け取るindexは、notes stateをmapでレンダリングした際のindexなので
  // そのindexを使ってnotes配列から削除ボタンを押されたnoteを取得できる
  const deleteNote = (index: number) => {
    const deletedNote = notes[index];
    setNotes((prev) => prev.filter((_, i) => i !== index));
    // 既存 note の場合 ID を削除リストに入れる
    // note内にidが定義されている場合は、既存のextraNoteをinitialStateとして定義した場合となる。
    if ("id" in deletedNote && deletedNote.id) {
      setDeleteNoteIds((prev) => [...prev, deletedNote.id as number]);
    }
  };

  return {
    notes,
    deleteNoteIds,
    updateNoteField,
    addNote,
    deleteNote,
    resetNotes,
  };
};
