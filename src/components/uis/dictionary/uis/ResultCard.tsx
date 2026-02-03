// react
import { useState } from "react";
// components
import WordInfo from "@/components/uis/dictionary/uis/WordInfo";
import RegCardButton from "@/components/uis/dictionary/uis/RegCardButton";
// types
import type { DictionarySearchResult } from "@/types";
// icons
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";

import { getPartOfSpeechLabels } from "@/utils/dictionaryLabelMapper";
import { handleSpeak } from "@/utils/handleSpeak";
import { HiSpeakerWave } from "react-icons/hi2";

type Props = {
  result: DictionarySearchResult;
};

const ResultCard = ({ result }: Props) => {
  const [isExtraInfoVisible, setIsExtraInfoVisible] = useState(false);

  return (
    <div className="border-gray-400 border rounded-lg shadow-lg px-2 p-2 mb-4">
      {/* 見出し（英語）、単語帳登録ボタン */}
      <div className="flex justify-between items-center text-lg">
        <div className="flex items-center gap-1">
          <h2>{result.translation.en}</h2>
          <HiSpeakerWave onClick={() => handleSpeak(result.translation.en)} />
        </div>
        <RegCardButton result={result} />
      </div>
      {/* 発音、品詞 */}
      <div className="flex gap-3 text-sm text-gray-700 mb-2">
        <div>
          <p>[{result.pronunciation}]</p>
        </div>
        <div className="border-gray-400 border rounded-sm px-1">
          {getPartOfSpeechLabels(result.partOfSpeech)}
        </div>
      </div>
      {/* 日本語での意味 */}
      <div className="text-lg mb-2">
        <h3>{result.translation.jp}</h3>
      </div>
      {/* 例文(英語) */}
      <div className="text-sm flex items-center gap-1">
        <p>{result.example.en}</p>
        <HiSpeakerWave onClick={() => handleSpeak(result.example.en)} />
      </div>
      {/* 例文(日本語) */}
      <div className="text-sm">
        <p>{result.example.jp}</p>
      </div>

      {/* 補足情報(togglable) */}
      <div
        className="border-t-2 border-gray-300 mt-2"
        onClick={() => setIsExtraInfoVisible(!isExtraInfoVisible)}
      >
        {isExtraInfoVisible ? (
          <>
            <GoTriangleUp className="mx-auto text-lg text-gray-500" />
            {result.synonyms.length > 0 && (
              <WordInfo label="類義語" content={result.synonyms.join(", ")} />
            )}
            {result.antonyms.length > 0 && (
              <WordInfo label="反義語" content={result.antonyms.join(", ")} />
            )}
            {result.collocations.length > 0 && (
              <WordInfo label="コロ" content={result.collocations.join(", ")} />
            )}
          </>
        ) : (
          <GoTriangleDown className="mx-auto text-lg text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default ResultCard;
