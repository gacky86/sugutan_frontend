import { FaBook } from "react-icons/fa";

// components
import PageTitle from "@/components/uis/common/PageTitle";
import Answer from "@/components/uis/learning/uis/Answer";
import Question from "@/components/uis/learning/uis/Question";
import CardInfo from "@/components/uis/learning/uis/CardInfo";
import Buttons from "@/components/uis/learning/uis/Buttons";
import type { Card, ExtraNote } from "@/types";

// import LoadingOverlay from "@/components/uis/common/LoadingOverLay";

// 学習ページを構成するメインのコンポーネント群をレンダリングする
// 学習ページcontentのレスポンシブデザイン対応もここで行う

const cardSample: Card = {
  id: 1,
  flashcardId: 1,
  front: "テスト",
  back: "test",
  frontSentence: "テストの文章",
  backSentence: "test sentence",
  explanationFront: "テストの説明",
  explanationBack: "test explanation",
  cardType: "動詞",
};

const extraNotesSample: ExtraNote[] = [
  { id: 1, cardId: 1, noteType: "類義語", content: "試験" },
  { id: 2, cardId: 1, noteType: "反義語", content: "休み" },
];

const LearningContent = () => {
  return (
    <div className="relative h-full">
      <PageTitle text="English Phrases" icon={FaBook} />
      <div className="p-5">
        <Question />
        <Answer />
        <CardInfo card={cardSample} extraNotes={extraNotesSample} />
        <Buttons />
      </div>
      {/* <LoadingOverlay isLoadingOverlay={loading} /> */}
    </div>
  );
};

export default LearningContent;
