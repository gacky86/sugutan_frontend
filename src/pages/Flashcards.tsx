import MainLayout from "@/components/layouts/MainLayout";
import ModalLayout from "@/components/layouts/ModalLayout";
import FlashcardsList from "@/components/flashcards/FlashcardsList";

const Flashcards = () => {
  return (
    <div>
      <MainLayout childrenContent={<FlashcardsList />} />
      <ModalLayout />
    </div>
  );
};

export default Flashcards;
