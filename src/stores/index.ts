import { configureStore } from "@reduxjs/toolkit";

import flashcardReducer from "@/stores/flashcardsSlice";
import cardReducer from "@/stores/cardsSlice";
import modalReducer from "@/stores/modalSlice";

export const store = configureStore({
  reducer: {
    flashcards: flashcardReducer,
    cards: cardReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
