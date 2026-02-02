// react
// import { useState } from "react";
// components
// import WordInfo from "@/components/uis/dictionary/uis/WordInfo";
import RegCardButton from "@/components/uis/dictionary/uis/RegCardButton";
// types
import type { DictionarySearchResult } from "@/types";
// icons
// import { HiLanguage } from "react-icons/hi2";

import {
  getPartOfSpeechLabels,
  // type PartOfSpeech,
} from "@/utils/dictionaryLabelMapper";
import { handleSpeak } from "@/utils/handleSpeak";
import { HiSpeakerWave } from "react-icons/hi2";

type Props = {
  result: DictionarySearchResult;
};

const ResultCard = ({ result }: Props) => {
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
          <p>[bíːtn]</p>
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
    </div>
    // <div className="border-gray-400 border rounded-lg flex flex-col shadow-lg px-2 py-1 mb-4">
    //   <h2 className="text-xl mb-1 pb-1 border-b border-gray-500">
    //     [{getPartOfSpeechLabels(result.partOfSpeech as PartOfSpeech)}]
    //     {result.translation.en}
    //   </h2>
    //   <div className="flex justify-between ">
    //     <div className="">
    //       <WordInfo
    //         label="例文"
    //         content={result.example.en}
    //         subContent={result.example.jp}
    //       />
    //       {originalLang ? (
    //         <WordInfo label="解説" content={result.definition.en} />
    //       ) : (
    //         <WordInfo label="解説" content={result.definition.jp} />
    //       )}
    //     </div>
    //     <div className="text-2xl ml-2 flex flex-col justify-start gap-5">
    //       <HiLanguage
    //         onClick={() => setOriginalLang(!originalLang)}
    //         className="hover:bg-amber-200 rounded-sm duration-300 cursor-pointer"
    //       />
    //       <RegCardButton result={result} />
    //     </div>
    //   </div>
    //   {/* 補足情報 */}
    //   <div>
    //     {(result.synonyms.length > 0 ||
    //       result.antonyms.length > 0 ||
    //       result.collocations.length > 0) && (
    //       <div className="border-t border-gray-500"></div>
    //     )}
    //     {result.etymology.length > 0 && (
    //       <WordInfo label="語源" content={result.etymology} />
    //     )}
    //     {result.synonyms.length > 0 && (
    //       <WordInfo label="類義語" content={result.synonyms.join(", ")} />
    //     )}
    //     {result.antonyms.length > 0 && (
    //       <WordInfo label="反義語" content={result.antonyms.join(", ")} />
    //     )}
    //     {result.collocations.length > 0 && (
    //       <WordInfo label="用法" content={result.collocations.join(", ")} />
    //     )}
    //   </div>
    // </div>
  );
};

export default ResultCard;
