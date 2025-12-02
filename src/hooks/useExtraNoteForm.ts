import { useState } from "react";
import type { ExtraNoteInputState, FieldState } from "@/types";
import { extraNoteTypes } from "@/types";

export const useExtraNotesForm = () => {
  const extraNoteInitialState: ExtraNoteInputState = {
    noteType: { input: extraNoteTypes[0], lengthCheck: true },
    content: { input: "", lengthCheck: true },
  };

  const [notes, setNotes] = useState<ExtraNoteInputState[]>([
    extraNoteInitialState,
  ]);

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
    setNotes((prev) => [...prev, extraNoteInitialState]);
  };

  const deleteNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  return { notes, updateNoteField, addNote, deleteNote };
};
