import { configureStore } from "@reduxjs/toolkit";

import flashcardReducer from "@/stores/flashcardsSlice";
import cardReducer from "@/stores/cardsSlice";
import modalReducer from "@/stores/modalSlice";
import dictionaryReducer from "@/stores/dictionarySlice";

export const store = configureStore({
  reducer: {
    flashcards: flashcardReducer,
    cards: cardReducer,
    modal: modalReducer,
    dictionary: dictionaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
