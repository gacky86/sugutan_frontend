// react
import { useState } from "react";
// components
import WordInfo from "@/components/uis/dictionary/uis/WordInfo";
import RegCardButton from "@/components/uis/dictionary/uis/RegCardButton";
// types
import type { DictionarySearchResult } from "@/types";
// icons
import { HiLanguage } from "react-icons/hi2";

import {
  getPartOfSpeechLabels,
  type PartOfSpeech,
} from "@/utils/dictionaryLabelMapper";

type Props = {
  result: DictionarySearchResult;
};

const ResultCard = ({ result }: Props) => {
  const [originalLang, setOriginalLang] = useState<boolean>(true);

  return (
    <div className="border-gray-400 border rounded-lg flex flex-col shadow-lg px-2 py-1 mb-4">
      <h2 className="text-xl mb-1 pb-1 border-b border-gray-500">
        [{getPartOfSpeechLabels(result.partOfSpeech as PartOfSpeech)}]
        {result.translation}
      </h2>
      <div className="flex justify-between ">
        <div className="">
          <WordInfo
            label="例文"
            content={result.example.en}
            subContent={result.example.jp}
          />
          {originalLang ? (
            <WordInfo label="解説" content={result.definition.en} />
          ) : (
            <WordInfo label="解説" content={result.definition.jp} />
          )}
          <WordInfo label="語源" content={result.etymology} />
        </div>
        <div className="text-2xl ml-2 flex flex-col justify-start gap-5">
          <HiLanguage
            onClick={() => setOriginalLang(!originalLang)}
            className="hover:bg-amber-200 rounded-sm duration-300"
          />
          <RegCardButton result={result} />
        </div>
      </div>
      {/* 補足情報 */}
      <div className="border-t border-gray-500">
        {result.antonyms.length > 0 && (
          <WordInfo label="類義語" content={result.synonyms.join(", ")} />
        )}
        {result.antonyms.length > 0 && (
          <WordInfo label="反義語" content={result.antonyms.join(", ")} />
        )}
        {result.antonyms.length > 0 && (
          <WordInfo label="用法" content={result.collocations.join(", ")} />
        )}
      </div>
    </div>
  );
};

export default ResultCard;
