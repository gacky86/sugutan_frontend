import type { Flashcard } from "@/types/index";

type Props = {
  flashcard: Flashcard;
};

const FlashcardDetailModal = ({ flashcard }: Props) => {
  return (
    <div>
      <h1>{flashcard.id}</h1>
    </div>
  );
};

export default FlashcardDetailModal;
