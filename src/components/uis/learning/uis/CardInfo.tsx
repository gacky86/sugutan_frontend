// react
import { useState } from "react";
// components
import WordInfo from "@/components/uis/dictionary/uis/WordInfo";
// icons
import { HiLanguage } from "react-icons/hi2";
// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";

const CardInfo = () => {
  const { queue, currentIndex, thinking } = useSelector(
    (state: RootState) => state.learning
  );
  const [originalLang, setOriginalLang] = useState<boolean>(true);
  if (thinking) {
    return null;
  }

  const card = queue[currentIndex].card;
  const extraNotes = queue[currentIndex].card.extraNotes;

  return (
    <div className="border-gray-400 border rounded-lg flex flex-col shadow-lg px-2 py-1 mb-4 max-w-[450px] mx-auto">
      <h2 className="text-xl mb-1 pb-1 border-b border-gray-500">
        [{card.cardType}]{card.front}
      </h2>
      <div className="flex justify-between ">
        <div className="">
          <WordInfo
            label="例文"
            content={card.backSentence}
            subContent={card.frontSentence}
          />
          {originalLang ? (
            <WordInfo label="解説" content={card.explanationBack} />
          ) : (
            <WordInfo label="解説" content={card.explanationFront} />
          )}
        </div>
        <div className="text-2xl ml-2 flex flex-col justify-start gap-5">
          <HiLanguage
            onClick={() => setOriginalLang(!originalLang)}
            className="hover:bg-amber-200 rounded-sm duration-300 cursor-pointer"
          />
        </div>
      </div>
      {/* 補足情報 */}
      {/* extraNotesをmapでWordInfoをレンダリングする */}
      {/* ただし、labelは日本語に変換してから */}
      <div>
        {extraNotes.length > 0 && (
          <div className="border-t border-gray-500"></div>
        )}
        {extraNotes.map((extraNote, index) => (
          <WordInfo
            key={index}
            label={extraNote.noteType}
            content={extraNote.content}
          />
        ))}
      </div>
    </div>
  );
};

export default CardInfo;
