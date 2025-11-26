// Redux
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";

// Components
import FlashcardDetailModal from "@/components/modal/FlashcardDetailModal";
import NewFlashcardModal from "@/components/modal/NewFlashcardModal";
import type { Flashcard } from "@/types";
import EditFlashcardModal from "./EditFlashcardModal";

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
    default:
      return null;
  }
};

export default ModalManager;
