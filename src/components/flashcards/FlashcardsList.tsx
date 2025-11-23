// ユーザーの単語帳一覧をpage/Flashcardsから受け取り、情報をループでFlashcardCardに渡して、単語帳の一覧を表示する
import FlashcardsCard from "@/components/flashcards/FlashcardsCard";
import { FaBook } from "react-icons/fa";
import PageTitle from "@/components/common/PageTitle";

const FlashcardsList = () => {
  return (
    <div>
      <PageTitle text="単語帳一覧" icon={FaBook} />
      <div className="flex flex-wrap gap-4 m-4">
        <FlashcardsCard
          title="English words"
          discription="frequentry used words"
          totalCards={122}
          learnedAt={2}
          language="EN"
        />
        <FlashcardsCard
          title="English words"
          discription="frequentry used words"
          totalCards={122}
          learnedAt={2}
          language="EN"
        />
        <FlashcardsCard
          title="English words"
          discription="frequentry used words"
          totalCards={122}
          learnedAt={2}
          language="EN"
        />
        <FlashcardsCard
          title="English words"
          discription="frequentry used words"
          totalCards={122}
          learnedAt={2}
          language="EN"
        />
        <FlashcardsCard
          title="English words"
          discription="frequentry used words"
          totalCards={122}
          learnedAt={2}
          language="EN"
        />
      </div>
    </div>
  );
};

export default FlashcardsList;
