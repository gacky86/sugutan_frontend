import type { Card, Flashcard } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export type ModalPayload = {
  modalContent:
    | "flashcardDetail"
    | "newFlashcard"
    | "editFlashcard"
    | "newCard"
    | "editCard";
  modalProps?: {
    flashcard?: Flashcard;
    card?: Card;
  };
};

type ModalState = {
  isVisible: boolean;
  modalContent: ModalPayload["modalContent"] | null;
  modalProps: {
    flashcard?: Flashcard;
    card?: Card;
  } | null;
};

const initialState: ModalState = {
  isVisible: false,
  modalContent: null,
  modalProps: null,
};

// slice: tool-kitが提供するstate + reducer + action をまとめたオブジェクト
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isVisible = true;
      state.modalContent = action.payload.modalContent;
      state.modalProps = action.payload.modalProps || null;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.modalContent = null;
      state.modalProps = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
