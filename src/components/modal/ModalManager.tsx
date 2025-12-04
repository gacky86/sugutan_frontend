// Redux
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";
// types
import type { Card, Flashcard } from "@/types";
// Components
import FlashcardDetailModal from "@/components/modal/flashcard/FlashcardDetailModal";
import NewFlashcardModal from "@/components/modal/flashcard/NewFlashcardModal";
import EditFlashcardModal from "@/components/modal/flashcard/EditFlashcardModal";
import EditCardModal from "@/components/modal/card/EditCardModal";
import NewCardModal from "@/components/modal/card/NewCardModal";

const ModalManager = () => {
  const { isVisible, modalContent, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  if (!isVisible) return null;

  // stateのmodalContentの値に応じて、表示するmodalの内容を切り替える
  // modalPropsには表示するflashcardの情報などの個別情報を渡す。
  switch (modalContent) {
    case "flashcardDetail":
      return <FlashcardDetailModal flashcard={modalProps as Flashcard} />;
    case "newFlashcard":
      return <NewFlashcardModal />;
    case "editFlashcard":
      return <EditFlashcardModal flashcard={modalProps as Flashcard} />;
    case "newCard":
      return <NewCardModal flashcard={modalProps as Flashcard} />;
    case "editCard":
      return (
        <EditCardModal
          flashcard={modalProps?.flashcard as Flashcard}
          card={modalProps?.card as Card}
        />
      );
    default:
      return null;
  }
};

export default ModalManager;
