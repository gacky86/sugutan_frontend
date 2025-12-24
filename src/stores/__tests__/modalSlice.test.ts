import { describe, it, expect } from "vitest";
import reducer, { openModal, closeModal } from "@/stores/modalSlice";
import type { Card, Flashcard } from "@/types/index";

// 初期状態
type ModalPayload = {
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

// reducer 単体テスト
describe("modalSlice reducers", () => {
  it("openModal should open a modal", () => {
    //
    const testData: Flashcard = {
      id: 1,
      title: "Test Flashcard A",
      description: "test A",
      language: "EN",
      cardsCount: 50,
      lastReviewedDaysAgo: 1,
    };
    const payload = { modalContent: "flashcardDetail", modalProps: testData };
    const state = reducer(initialState, openModal(payload));

    expect(state).toEqual({
      isVisible: true,
      modalContent: "flashcardDetail",
      modalProps: testData,
    });
  });
  it("closeModal should close a modal", () => {
    // カードを二つ用意して、stateにsetしておいて、これを実行して、stateからremove
    // されていることをexpectする
    const openedState = {
      isVisible: true,
      modalContent: "flashcardDetail" as ModalPayload["modalContent"],
      modalProps: null,
    };
    const state = reducer(openedState, closeModal());
    expect(state).toEqual({
      isVisible: false,
      modalContent: null,
      modalProps: null,
    });
  });
});
