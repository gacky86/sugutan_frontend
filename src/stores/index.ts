import { configureStore } from "@reduxjs/toolkit";

import flashcardReducer from "@/stores/flashcardsSlice";
import cardReducer from "@/stores/cardsSlice";
import modalReducer from "@/stores/modalSlice";
import dictionaryReducer from "@/stores/dictionarySlice";
import learningReducer from "@/stores/learningSlice";

export const store = configureStore({
  reducer: {
    flashcards: flashcardReducer,
    cards: cardReducer,
    modal: modalReducer,
    dictionary: dictionaryReducer,
    learning: learningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
