import {
  getPartOfSpeechLabels,
  type PartOfSpeech,
} from "@/utils/dictionaryLabelMapper";
import { useState } from "react";
import WordInfo from "../../dictionary/uis/WordInfo";
import { HiLanguage } from "react-icons/hi2";
import type { Card } from "@/types";

const CardMainInfo = ({ card }: { card: Card }) => {
  const [originalLang, setOriginalLang] = useState<boolean>(true);
  return (
    <div className="border-gray-400 border rounded-lg flex flex-col shadow-lg px-2 py-1 mb-4 max-w-[450px] mx-auto">
      <h2 className="text-base mb-1 pb-1 border-b border-gray-500">
        [{getPartOfSpeechLabels(card.cardType as PartOfSpeech)}] {card.front} ={" "}
        {card.back}
      </h2>
      <div className="flex justify-between ">
        <div className="">
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
    </div>
  );
};

export default CardMainInfo;
