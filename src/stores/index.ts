import { configureStore } from "@reduxjs/toolkit";

import flashcardReducer from "@/stores/flashcardsSlice";
// import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    flashcards: flashcardReducer,
    // modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
