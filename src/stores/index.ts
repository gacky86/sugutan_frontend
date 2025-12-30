import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "@/stores/authSlice";
import flashcardReducer from "@/stores/flashcardsSlice";
import cardReducer from "@/stores/cardsSlice";
import modalReducer from "@/stores/modalSlice";
import dictionaryReducer from "@/stores/dictionarySlice";
import learningReducer from "@/stores/learningSlice";

// 1. Reducerを統合
export const rootReducer = combineReducers({
  auth: authReducer,
  flashcards: flashcardReducer,
  cards: cardReducer,
  modal: modalReducer,
  dictionary: dictionaryReducer,
  learning: learningReducer,
});

// 2. Storeを作成
export const store = configureStore({
  reducer: rootReducer, // オブジェクトを直接渡す代わりに rootReducer を渡す
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
