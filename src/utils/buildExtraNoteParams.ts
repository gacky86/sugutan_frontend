import type {
  DictionarySearchResult,
  ExtraNoteInputState,
  ExtraNoteParams,
} from "@/types";
import { convertNoteTypeJPtoEN, type NoteTypeJP } from "@/utils/noteTypeMapper";
// フォームの入力値をAPI payload用に編集する
export const buildExtraNoteParams = (
  fields: ExtraNoteInputState
): ExtraNoteParams => ({
  noteType: convertNoteTypeJPtoEN(fields.noteType.input as NoteTypeJP),
  content: fields.content.input,
});

// 特定のキーとその要素を抜き出し、ExtraNoteParams[]の形式にする
// キーに対して空要素の場合は配列に入れない。
export function buildExtraNotesParamsDictionary(
  result: DictionarySearchResult
): ExtraNoteParams[] {
  const keys: (keyof DictionarySearchResult)[] = [
    "etymology",
    "synonyms",
    "antonyms",
    "collocations",
  ];
  // keysの要素だけを抜き出し、extraNote登録用のParamsを作り、リスト化する。
  // ただし、空文字や空配列は除外する。
  return keys
    .filter((key) => {
      const value = result[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      if (typeof value === "string") {
        return value.trim() !== "";
      }

      return false;
    })
    .map((key) => {
      const value = result[key] as string | string[];
      let content: string;

      if (Array.isArray(value)) {
        content = value.join(", ");
      } else {
        content = value ?? "";
      }
      return {
        noteType: key,
        content,
      };
    });
}
