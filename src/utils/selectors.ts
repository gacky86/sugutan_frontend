import type { RootState } from "@/stores/index";

// stateで保持しているflashcardsからflashcardIdを指定してflashcard取得する関数
export const selectFlashcardById = (id: number) => (state: RootState) =>
  state.flashcards.flashcards.find((fc) => fc.id === id);

// stateで保持しているflashcardsからtitleを指定してflashcard取得する関数
export const selectFlashcardByTitle = (title: string) => (state: RootState) =>
  state.flashcards.flashcards.find((fc) => fc.title === title);
