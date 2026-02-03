// react
import { useState } from "react";
// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";
// utils
import { handleSpeak } from "@/utils/handleSpeak";
import {
  getPartOfSpeechLabels,
  type PartOfSpeech,
} from "@/utils/dictionaryLabelMapper";
// icons
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import { HiSpeakerWave } from "react-icons/hi2";

// components
import { convertNoteTypeENtoJP, type NoteTypeEN } from "@/utils/noteTypeMapper";
import ExtraNoteInfo from "@/components/uis/learning/uis/ExtraNoteInfo";

const CardInfo = () => {
  const { queue, currentIndex, thinking } = useSelector(
    (state: RootState) => state.learning,
  );

  const [isExtraInfoVisible, setIsExtraInfoVisible] = useState(false);

  if (thinking) {
    return null;
  }

  const card = queue[currentIndex].card;
  const extraNotes = queue[currentIndex].card.extraNotes;

  return (
    <>
      <div className="border-gray-400 border rounded-lg shadow-lg px-2 p-2 mb-4 max-w-[450px] mx-auto">
        {/* 見出し（英語）、単語帳登録ボタン */}
        <div className="flex justify-between items-center text-lg">
          <div className="flex items-center gap-1">
            <h2>{card.back}</h2>
            <HiSpeakerWave onClick={() => handleSpeak(card.back)} />
          </div>
        </div>
        {/* 発音、品詞 */}
        <div className="flex gap-3 text-sm text-gray-700 mb-2">
          {card.pronunciation && <p>[{card.pronunciation}]</p>}
          <div className="border-gray-400 border rounded-sm px-1">
            {getPartOfSpeechLabels(card.cardType as PartOfSpeech)}
          </div>
        </div>
        {/* 日本語での意味 */}
        <div className="text-lg mb-2">
          <h3>{card.front}</h3>
        </div>

        {/* 補足情報(togglable) */}
        <div
          className="border-t-2 border-gray-300 mt-2"
          onClick={() => setIsExtraInfoVisible(!isExtraInfoVisible)}
        >
          {isExtraInfoVisible ? (
            <>
              <GoTriangleUp className="mx-auto text-lg text-gray-500" />
              {extraNotes.map((extraNote, index) => (
                <ExtraNoteInfo
                  key={index}
                  label={convertNoteTypeENtoJP(
                    extraNote.noteType as NoteTypeEN,
                  )}
                  content={extraNote.content}
                />
              ))}
            </>
          ) : (
            <GoTriangleDown className="mx-auto text-lg text-gray-500" />
          )}
        </div>
      </div>
    </>
  );
};

export default CardInfo;
