import MainLayout from "@/components/layouts/MainLayout";
import FlashcardsList from "@/components/flashcards/FlashcardsList";

const Flashcards = () => {
  return (
    <div>
      <MainLayout childrenContent={<FlashcardsList />} />
    </div>
  );
};

export default Flashcards;
